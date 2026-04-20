import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { GeneratedOption } from "@/lib/quote-generator";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Debes iniciar sesión para guardar cotizaciones." },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { quote_request_id, quote_option_id, option_data } = body as {
    quote_request_id: string;
    quote_option_id?: string;
    option_data?: GeneratedOption;
  };

  if (!quote_request_id) {
    return NextResponse.json({ error: "Falta el ID de la solicitud." }, { status: 400 });
  }

  // Validate that this quote_request belongs to the authenticated user.
  // For guest IDs (prefix "guest_"), we skip DB ownership check since the
  // request was never persisted — option_data path will create it implicitly.
  const isGuestRequest = quote_request_id.startsWith("guest_");

  if (!isGuestRequest) {
    const { data: qr, error: qrErr } = await supabase
      .from("quote_requests")
      .select("id, customer_id")
      .eq("id", quote_request_id)
      .single();

    if (qrErr || !qr) {
      return NextResponse.json({ error: "Solicitud no encontrada." }, { status: 404 });
    }

    if (qr.customer_id !== user.id) {
      return NextResponse.json({ error: "No tienes permiso para guardar esta cotización." }, { status: 403 });
    }
  }

  // ── Path A: option already in DB ─────────────────────────────────────────
  if (quote_option_id) {
    const { error } = await supabase.from("saved_quotes").upsert(
      { customer_id: user.id, quote_request_id, quote_option_id },
      { onConflict: "customer_id,quote_option_id" }
    );
    if (error) {
      console.error("[guardar] upsert saved_quotes error:", error);
      return NextResponse.json({ error: "Error al guardar." }, { status: 500 });
    }
    return NextResponse.json({ success: true, quote_option_id });
  }

  // ── Path B: option lives only in sessionStorage — persist the whole thing ──
  if (!option_data) {
    return NextResponse.json({ error: "Faltan los datos de la cotización." }, { status: 400 });
  }

  // For guest requests we must first create the quote_request row
  let resolvedRequestId = quote_request_id;

  if (isGuestRequest) {
    const { data: newQr, error: newQrErr } = await supabase
      .from("quote_requests")
      .insert({
        customer_id:    user.id,
        event_type:     "Evento guardado",
        budget_cop:     option_data.total_price_cop,
        city:           "—",
        venue_type:     "otro",
        children_count: 0,
        adult_count:    0,
      })
      .select("id")
      .single();

    if (newQrErr || !newQr) {
      console.error("[guardar] insert guest quote_request error:", newQrErr);
      return NextResponse.json({ error: "Error al crear la solicitud." }, { status: 500 });
    }
    resolvedRequestId = newQr.id;
  }

  // Insert the option row
  const { data: insertedOption, error: optErr } = await supabase
    .from("quote_options")
    .insert({
      quote_request_id: resolvedRequestId,
      option_type:      option_data.option_type,
      total_price_cop:  option_data.total_price_cop,
      summary:          option_data.summary,
      fit_explanation:  option_data.fit_explanation,
    })
    .select("id")
    .single();

  if (optErr || !insertedOption) {
    console.error("[guardar] insert quote_option error:", optErr);
    return NextResponse.json({ error: "Error al guardar la cotización." }, { status: 500 });
  }

  // Insert items
  if (option_data.items?.length) {
    const itemRows = option_data.items.map((item) => ({
      quote_option_id:     insertedOption.id,
      supplier_profile_id: item.supplier_profile_id,
      service_type:        item.service_type,
      item_name:           item.item_name,
      estimated_price_cop: item.estimated_price_cop,
      notes:               item.notes ?? null,
    }));
    const { error: itemsErr } = await supabase.from("quote_option_items").insert(itemRows);
    if (itemsErr) console.error("[guardar] insert items error:", itemsErr);
  }

  // Upsert saved_quotes
  const { error: saveErr } = await supabase.from("saved_quotes").upsert(
    {
      customer_id:      user.id,
      quote_request_id: resolvedRequestId,
      quote_option_id:  insertedOption.id,
    },
    { onConflict: "customer_id,quote_option_id" }
  );

  if (saveErr) {
    console.error("[guardar] upsert saved_quotes error:", saveErr);
    return NextResponse.json({ error: "Error al guardar." }, { status: 500 });
  }

  return NextResponse.json({ success: true, quote_option_id: insertedOption.id });
}
