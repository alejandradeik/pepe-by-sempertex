import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { GeneratedOption } from "@/lib/quote-generator";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json(
      { error: "Debes iniciar sesión para guardar cotizaciones." },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Cuerpo de solicitud inválido." }, { status: 400 });
  }

  const { quote_request_id, quote_option_id, option_data, quote_request_data } = body as {
    quote_request_id:   string;
    quote_option_id?:   string;
    option_data?:       GeneratedOption;
    /** Present for guest saves — real event data from sessionStorage */
    quote_request_data?: Record<string, unknown>;
  };

  if (!quote_request_id) {
    return NextResponse.json({ error: "Falta el ID de la solicitud." }, { status: 400 });
  }

  const isGuestRequest = quote_request_id.startsWith("guest_");

  // Validate ownership for persisted quote_requests
  if (!isGuestRequest) {
    const { data: qr, error: qrErr } = await supabase
      .from("quote_requests")
      .select("id, customer_id")
      .eq("id", quote_request_id)
      .single();

    if (qrErr || !qr) {
      console.error("[guardar] quote_request lookup failed:", JSON.stringify(qrErr));
      return NextResponse.json({ error: "Solicitud no encontrada." }, { status: 404 });
    }
    if (qr.customer_id !== user.id) {
      return NextResponse.json({ error: "Sin permiso para guardar esta cotización." }, { status: 403 });
    }
  }

  // ── Path A: the client already knows the DB id of the option ─────────────
  if (quote_option_id) {
    const { error } = await supabase.from("saved_quotes").upsert(
      { customer_id: user.id, quote_request_id, quote_option_id },
      { onConflict: "customer_id,quote_option_id" }
    );
    if (error) {
      console.error("[guardar] Path A — saved_quotes upsert error:", JSON.stringify(error));
      return NextResponse.json({ error: `Error al guardar: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ success: true, quote_option_id, quote_request_id });
  }

  // ── Path B: option lives in sessionStorage — persist it ──────────────────
  if (!option_data) {
    return NextResponse.json({ error: "Faltan los datos de la cotización." }, { status: 400 });
  }

  let resolvedRequestId = quote_request_id;

  // Guest requests: create a real quote_request row using the actual event
  // data passed by the client (from sessionStorage), falling back to defaults.
  if (isGuestRequest) {
    const rd = quote_request_data ?? {};
    const { data: newQr, error: newQrErr } = await supabase
      .from("quote_requests")
      .insert({
        customer_id:    user.id,
        event_type:     (rd.event_type  as string)  || "Evento",
        event_theme:    (rd.event_theme as string)  || null,
        honoree_age:    (rd.honoree_age as number)  || null,
        budget_cop:     (rd.budget_cop  as number)  || option_data.total_price_cop,
        city:           (rd.city        as string)  || "Colombia",
        venue_type:     (rd.venue_type  as string)  || "otro",
        children_count: (rd.children_count as number) || 0,
        adult_count:    (rd.adult_count   as number) || 0,
        event_date:     (rd.event_date  as string)  || null,
        notes:          (rd.notes       as string)  || null,
      })
      .select("id")
      .single();

    if (newQrErr || !newQr) {
      console.error("[guardar] guest insert quote_request error:", JSON.stringify(newQrErr));
      return NextResponse.json(
        { error: `Error al crear la solicitud: ${newQrErr?.message ?? "desconocido"}` },
        { status: 500 }
      );
    }
    resolvedRequestId = newQr.id;
  }

  // For non-guest requests: the option may already be in DB (written by /api/cotizaciones
  // but not surfaced to the client because of a silent insert+select RLS edge case).
  // Check first to avoid duplicates.
  let resolvedOptionId: string | null = null;

  if (!isGuestRequest) {
    const { data: existing } = await supabase
      .from("quote_options")
      .select("id")
      .eq("quote_request_id", resolvedRequestId)
      .eq("option_type", option_data.option_type)
      .limit(1)
      .maybeSingle();

    if (existing) {
      resolvedOptionId = existing.id;
    }
  }

  // Only insert if we don't already have an id
  if (!resolvedOptionId) {
    // Step 1: insert with customer_id (simple RLS: customer_id = auth.uid())
    const { error: optInsertErr } = await supabase
      .from("quote_options")
      .insert({
        customer_id:      user.id,
        quote_request_id: resolvedRequestId,
        option_type:      option_data.option_type,
        total_price_cop:  option_data.total_price_cop,
        summary:          option_data.summary,
        fit_explanation:  option_data.fit_explanation,
      });

    if (optInsertErr) {
      console.error("[guardar] quote_options insert error:", JSON.stringify(optInsertErr));
      return NextResponse.json(
        { error: `Error al guardar la cotización: ${optInsertErr.message}` },
        { status: 500 }
      );
    }

    // Step 2: fetch back the id via a clean SELECT (separate request — no RLS race)
    const { data: fetched, error: fetchErr } = await supabase
      .from("quote_options")
      .select("id")
      .eq("quote_request_id", resolvedRequestId)
      .eq("option_type", option_data.option_type)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchErr || !fetched) {
      console.error("[guardar] quote_options re-fetch error:", JSON.stringify(fetchErr));
      return NextResponse.json(
        { error: `Error al recuperar cotización guardada: ${fetchErr?.message ?? "sin datos"}` },
        { status: 500 }
      );
    }

    resolvedOptionId = fetched.id;

    // Insert items (non-fatal if partial failure)
    if (option_data.items?.length) {
      const itemRows = option_data.items.map((item) => ({
        quote_option_id:     resolvedOptionId!,
        supplier_profile_id: item.supplier_profile_id,
        service_type:        item.service_type,
        item_name:           item.item_name,
        estimated_price_cop: item.estimated_price_cop,
        notes:               item.notes ?? null,
      }));
      const { error: itemsErr } = await supabase.from("quote_option_items").insert(itemRows);
      if (itemsErr) {
        console.error("[guardar] quote_option_items insert error:", JSON.stringify(itemsErr));
      }
    }
  }

  // Upsert saved_quotes
  const { error: saveErr } = await supabase.from("saved_quotes").upsert(
    {
      customer_id:      user.id,
      quote_request_id: resolvedRequestId,
      quote_option_id:  resolvedOptionId!,
    },
    { onConflict: "customer_id,quote_option_id" }
  );

  if (saveErr) {
    console.error("[guardar] saved_quotes upsert error:", JSON.stringify(saveErr));
    return NextResponse.json(
      { error: `Error al guardar: ${saveErr.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success:          true,
    quote_option_id:  resolvedOptionId,
    quote_request_id: resolvedRequestId,
  });
}
