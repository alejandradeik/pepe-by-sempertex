"use client";

import { useEffect, useState } from "react";
import { QuoteResultsClient } from "./quote-results-client";
import type { QuoteOption, QuoteRequest } from "@/types";

interface GuestData {
  request: QuoteRequest;
  options: QuoteOption[];
}

export function GuestQuoteLoader({ id }: { id: string }) {
  const [data, setData] = useState<GuestData | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(id);
    if (!stored) {
      setMissing(true);
      return;
    }
    setData(JSON.parse(stored));
  }, [id]);

  if (missing) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div>
          <p className="text-gray-600 mb-4">
            No se encontró la cotización. Es posible que la sesión haya expirado.
          </p>
          <a href="/cotizar" className="text-brand-600 underline font-medium">
            Generar nueva cotización
          </a>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <QuoteResultsClient
      quoteRequest={data.request}
      options={data.options}
      quoteRequestId={null}
      isGuest
    />
  );
}
