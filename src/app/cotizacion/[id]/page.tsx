export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/navbar";
import { notFound } from "next/navigation";
import { QuoteResultsClient } from "./quote-results-client";
import { GuestQuoteLoader } from "./guest-quote-loader";
import type { QuoteOption, QuoteRequest } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CotizacionPage({ params }: PageProps) {
  const { id } = await params;

  // Guest quotes: data lives in sessionStorage, not the URL
  if (id.startsWith("guest_")) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <GuestQuoteLoader id={id} />
      </div>
    );
  }

  // Authenticated: load from DB
  const supabase = await createClient();

  const { data: quoteRequest } = await supabase
    .from("quote_requests")
    .select("*, quote_request_services(*)")
    .eq("id", id)
    .single();

  if (!quoteRequest) notFound();

  const { data: options } = await supabase
    .from("quote_options")
    .select(`
      *,
      quote_option_items(
        *,
        supplier_profile:supplier_profiles(*)
      )
    `)
    .eq("quote_request_id", id)
    .order("total_price_cop", { ascending: true });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <QuoteResultsClient
        quoteRequest={quoteRequest as QuoteRequest}
        options={(options ?? []) as QuoteOption[]}
        quoteRequestId={id}
        isGuest={false}
      />
    </div>
  );
}
