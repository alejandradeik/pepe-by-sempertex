import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateQuoteOptions } from "@/lib/quote-generator";
import type { ServiceType } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const {
      event_type,
      event_theme,
      honoree_age,
      budget_cop,
      city,
      venue_type,
      children_count,
      adult_count,
      services,
      event_date,
      notes,
    } = body as {
      event_type: string;
      event_theme: string | null;
      honoree_age: number | null;
      budget_cop: number;
      city: string;
      venue_type: string;
      children_count: number;
      adult_count: number;
      services: ServiceType[];
      event_date: string | null;
      notes: string | null;
    };

    // Validate required fields
    if (!event_type || !budget_cop || !city || !venue_type || !services?.length) {
      return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
    }

    // Get the current user (may be null for guests — we still allow quote generation)
    const { data: { user } } = await supabase.auth.getUser();

    // Use a guest placeholder UUID if not logged in so we can still save to DB
    // In a real product, you may require auth or store as anonymous session
    const customerId = user?.id;

    if (!customerId) {
      // For unauthenticated users: require login to persist, but still generate
      // We'll create the quote in memory and redirect to results without DB storage
      const options = await generateQuoteOptions({
        services,
        city,
        budget_cop,
        children_count,
        adult_count,
        event_type,
        event_theme,
      });

      const guestId = `guest_${crypto.randomUUID()}`;
      return NextResponse.json({
        quote_request_id: guestId,
        options,
      });
    }

    // ── Authenticated user flow ──────────────────────────────────────

    // 1. Save the quote request
    const { data: quoteRequest, error: qrError } = await supabase
      .from("quote_requests")
      .insert({
        customer_id: customerId,
        event_type,
        event_theme,
        honoree_age,
        budget_cop,
        city,
        venue_type,
        children_count,
        adult_count,
        event_date,
        notes,
      })
      .select()
      .single();

    if (qrError || !quoteRequest) {
      console.error(qrError);
      return NextResponse.json({ error: "Error al guardar la solicitud." }, { status: 500 });
    }

    // 2. Save requested services
    const serviceRows = services.map((s) => ({
      quote_request_id: quoteRequest.id,
      service_type: s,
    }));
    await supabase.from("quote_request_services").insert(serviceRows);

    // 3. Generate options
    const generatedOptions = await generateQuoteOptions({
      services,
      city,
      budget_cop,
      children_count,
      adult_count,
      event_type,
      event_theme,
    });

    // 4. Persist options and their items; collect DB ids to return to client
    const optionsWithIds: typeof generatedOptions = [];

    for (const opt of generatedOptions) {
      // Step 4a: insert without RETURNING to avoid combined insert+select RLS timing issues.
      const { error: optError } = await supabase
        .from("quote_options")
        .insert({
          customer_id:      customerId,
          quote_request_id: quoteRequest.id,
          option_type:      opt.option_type,
          total_price_cop:  opt.total_price_cop,
          summary:          opt.summary,
          fit_explanation:  opt.fit_explanation,
        });

      if (optError) {
        console.error("[cotizaciones] quote_options insert error:", JSON.stringify(optError));
        optionsWithIds.push(opt);
        continue;
      }

      // Step 4b: fetch the id back in a clean separate SELECT.
      const { data: savedOption } = await supabase
        .from("quote_options")
        .select("id")
        .eq("quote_request_id", quoteRequest.id)
        .eq("option_type", opt.option_type)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const optionId = savedOption?.id ?? null;
      optionsWithIds.push({ ...opt, id: optionId ?? undefined });

      if (optionId && opt.items.length > 0) {
        const itemRows = opt.items.map((item) => {
          const noteParts = [item.pricing_note, item.notes].filter(Boolean);
          return {
            quote_option_id:     optionId,
            supplier_profile_id: item.supplier_profile_id,
            service_type:        item.service_type,
            item_name:           item.item_name,
            estimated_price_cop: item.estimated_price_cop,
            notes: noteParts.length > 0 ? noteParts.join(" · ") : null,
          };
        });
        const { error: itemsError } = await supabase
          .from("quote_option_items")
          .insert(itemRows);
        if (itemsError) {
          console.error("[cotizaciones] quote_option_items insert error:", JSON.stringify(itemsError));
        }
      }
    }

    // Return options with DB ids so the client can use Path A (direct saved_quotes upsert)
    // when saving — no need to re-insert into quote_options from the guardar route.
    return NextResponse.json({
      quote_request_id: quoteRequest.id,
      options: optionsWithIds,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
