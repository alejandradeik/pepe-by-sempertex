"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuoteResultsClient } from "./quote-results-client";
import type { GeneratedOption } from "@/lib/quote-generator";

interface StoredGuest {
  request: Record<string, unknown>;
  options: GeneratedOption[];
}

export function GuestQuoteLoader({ id }: { id: string }) {
  const [data, setData]   = useState<StoredGuest | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(id);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredGuest;
        setData(parsed);
      }
    } catch {
      // ignore malformed cache
    }
    setReady(true);
  }, [id]);

  if (!ready) {
    return (
      <div className="max-w-6xl mx-auto w-full px-4 py-10 animate-pulse">
        <div className="h-32 bg-white rounded-3xl border border-gray-100 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-white rounded-3xl border border-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-20 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-xl font-black text-gray-800 mb-2">Cotización no encontrada</p>
        <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto">
          La sesión expiró o el enlace ya no es válido.
          Genera una nueva cotización para ver tus resultados.
        </p>
        <Link href="/cotizar">
          <Button size="md">Nueva cotización</Button>
        </Link>
      </div>
    );
  }

  return (
    <QuoteResultsClient
      quoteRequest={data.request}
      options={data.options}
      quoteRequestId={id}
      isGuest={true}
    />
  );
}
