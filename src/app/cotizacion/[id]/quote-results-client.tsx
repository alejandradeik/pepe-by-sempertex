"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCOP } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  SERVICE_LABELS,
  SERVICE_ICONS,
  VENUE_LABELS,
  type QuoteOption,
  type QuoteRequest,
  type ServiceType,
} from "@/types";
import type { GeneratedOption } from "@/lib/quote-generator";
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  CheckCircle,
  Info,
  MapPin,
  Phone,
  Star,
  Users,
  XCircle,
} from "lucide-react";

type DisplayOption = QuoteOption | GeneratedOption;

interface Props {
  quoteRequest: QuoteRequest | Record<string, unknown>;
  options: DisplayOption[];
  quoteRequestId: string | null;
  isGuest: boolean;
}

const TIER = {
  economica: {
    label: "Económica",
    icon: "💚",
    ring:    "ring-emerald-400",
    header:  "bg-emerald-50 border-emerald-100",
    badge:   "success" as const,
    item:    "bg-emerald-50 border-emerald-100",
    cta:     "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  balanceada: {
    label: "Balanceada",
    icon: "⭐",
    ring:    "ring-brand-400",
    header:  "bg-brand-50 border-brand-100",
    badge:   "brand" as const,
    item:    "bg-brand-50 border-brand-100",
    cta:     "",
    recommended: true,
  },
  premium: {
    label: "Premium",
    icon: "👑",
    ring:    "ring-amber-400",
    header:  "bg-amber-50 border-amber-100",
    badge:   "warning" as const,
    item:    "bg-amber-50 border-amber-100",
    cta:     "bg-amber-500 hover:bg-amber-600 text-white",
  },
} as const;

type TierKey = keyof typeof TIER;

function getItems(opt: DisplayOption) {
  if ("items" in opt && Array.isArray(opt.items)) return opt.items;
  return [];
}

function getUnavailable(opt: DisplayOption): ServiceType[] {
  if ("unavailable_services" in opt && Array.isArray(opt.unavailable_services))
    return opt.unavailable_services as ServiceType[];
  return [];
}

function getBudgetPct(opt: DisplayOption, budget: number): number {
  if ("budget_pct" in opt && typeof opt.budget_pct === "number") return opt.budget_pct;
  return Math.round((opt.total_price_cop / budget) * 100);
}

function getOptId(opt: DisplayOption): string | null {
  return ("id" in opt && typeof opt.id === "string") ? opt.id : null;
}

export function QuoteResultsClient({ quoteRequest, options, quoteRequestId, isGuest }: Props) {
  const router = useRouter();
  // Track saved by option_type (stable key) so both DB-id and in-memory options work
  const [savedTypes, setSavedTypes] = useState<Set<string>>(new Set());
  const [savingType, setSavingType] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [guestNudgeType, setGuestNudgeType] = useState<string | null>(null);
  const [displayOptions, setDisplayOptions] = useState<DisplayOption[]>(options);

  // Fall back to sessionStorage when DB returned no options (silent write failure)
  useEffect(() => {
    if (options.length === 0 && quoteRequestId) {
      const stored = sessionStorage.getItem(quoteRequestId);
      if (stored) {
        try {
          const { options: cached } = JSON.parse(stored) as { options: DisplayOption[] };
          if (Array.isArray(cached) && cached.length > 0) setDisplayOptions(cached);
        } catch { /* ignore malformed cache */ }
      }
    }
  }, [options.length, quoteRequestId]);

  const req = quoteRequest as QuoteRequest;
  const budget        = req.budget_cop ?? 0;
  const city          = req.city ?? "";
  const eventType     = req.event_type ?? "";
  const eventTheme    = req.event_theme;
  const childrenCount = req.children_count ?? 0;
  const adultCount    = req.adult_count ?? 0;
  const eventDate     = req.event_date;
  const venueType     = req.venue_type;

  // Collect services that couldn't be matched across all options (show once at bottom)
  const globalUnavailable: ServiceType[] = (() => {
    const first = displayOptions[0];
    if (!first) return [];
    return getUnavailable(first);
  })();

  async function handleSave(opt: DisplayOption) {
    const optType = opt.option_type;

    if (isGuest) {
      setGuestNudgeType((prev) => (prev === optType ? null : optType));
      return;
    }

    if (!quoteRequestId) {
      setSaveError("No se pudo identificar la solicitud. Vuelve a generar la cotización.");
      return;
    }

    setSavingType(optType);
    setSaveError(null);

    const optId = getOptId(opt);
    const body = optId
      ? { quote_request_id: quoteRequestId, quote_option_id: optId }
      : { quote_request_id: quoteRequestId, option_data: opt };

    const res = await fetch("/api/cotizaciones/guardar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSavingType(null);

    if (res.ok) {
      // Always mark by option_type so the button reflects the saved state
      setSavedTypes((prev) => new Set([...prev, optType]));
    } else if (res.status === 401) {
      router.push("/login");
    } else {
      const d = await res.json().catch(() => ({}));
      setSaveError(d.error ?? "Error al guardar. Intenta de nuevo.");
    }
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-10">
      {/* Back link */}
      <Link
        href="/cotizar"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft size={15} />
        Modificar mi solicitud
      </Link>

      {/* Request summary card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              {eventType}
              {eventTheme && (
                <span className="ml-2 text-lg font-semibold text-brand-500">· {eventTheme}</span>
              )}
            </h1>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-gray-400" />{city}
              </span>
              {venueType && (
                <span className="flex items-center gap-1.5">
                  🏠 {VENUE_LABELS[venueType as keyof typeof VENUE_LABELS]}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-gray-400" />
                {childrenCount} niños · {adultCount} adultos
              </span>
              {eventDate && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} className="text-gray-400" />
                  {new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric" })
                    .format(new Date(eventDate + "T12:00:00"))}
                </span>
              )}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Presupuesto</p>
            <p className="text-2xl font-black text-brand-600">{formatCOP(budget)}</p>
          </div>
        </div>
      </div>

      {/* Guest banner */}
      {isGuest && (
        <div className="bg-gradient-to-r from-brand-50 to-violet-50 border border-brand-100 rounded-2xl px-5 py-4 mb-6 flex items-center gap-3">
          <Star size={15} className="text-brand-500 flex-shrink-0" />
          <p className="text-sm text-brand-700">
            <Link href="/registro" className="font-bold underline underline-offset-2">Crea una cuenta gratis</Link>
            {" "}para guardar estas opciones y acceder a ellas desde cualquier dispositivo.
          </p>
        </div>
      )}

      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <AlertTriangle size={14} className="flex-shrink-0" /> {saveError}
        </div>
      )}

      {/* Options grid */}
      {displayOptions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500 text-lg mb-2 font-semibold">Sin resultados disponibles</p>
          <p className="text-gray-400 text-sm mb-6">
            No encontramos proveedores para tus criterios en este momento.
          </p>
          <Link href="/cotizar">
            <Button variant="outline">Ajustar mi solicitud</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {displayOptions.map((opt) => {
            const tier   = TIER[opt.option_type as TierKey] ?? TIER.balanceada;
            const items  = getItems(opt);
            const unavailable = getUnavailable(opt);
            const pct    = Math.min(getBudgetPct(opt, budget), 150);
            const over   = opt.total_price_cop > budget;
            const isSaved   = savedTypes.has(opt.option_type);
            const isSaving  = savingType === opt.option_type;
            const isRecommended = (tier as { recommended?: boolean }).recommended ?? false;
            const showGuestNudge = isGuest && guestNudgeType === opt.option_type;

            return (
              <div
                key={opt.option_type}
                className={cn(
                  "bg-white rounded-3xl border-2 flex flex-col relative overflow-hidden shadow-card transition-all duration-200 hover:shadow-card-md",
                  isRecommended ? "ring-2 " + tier.ring : "border-gray-100"
                )}
              >
                {/* Recommended ribbon */}
                {isRecommended && (
                  <div className="gradient-brand text-white text-xs font-bold text-center py-1.5 tracking-wider">
                    ✦ MÁS POPULAR
                  </div>
                )}

                {/* Card header */}
                <div className={cn("px-6 pt-6 pb-4 border-b", tier.header)}>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={tier.badge}>
                      {tier.icon} {tier.label}
                    </Badge>
                    {over && (
                      <span className="flex items-center gap-1 text-xs text-orange-500 font-medium">
                        <AlertTriangle size={11} /> Supera presupuesto
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-black text-gray-900 leading-none">
                    {formatCOP(opt.total_price_cop)}
                  </p>
                  <div className="mt-2">
                    {over ? (
                      <p className="text-xs text-orange-500 font-medium">
                        +{formatCOP(opt.total_price_cop - budget)} sobre el presupuesto
                      </p>
                    ) : (
                      <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                        <CheckCircle size={11} />
                        Te sobran {formatCOP(budget - opt.total_price_cop)}
                      </p>
                    )}
                  </div>

                  {/* Budget bar */}
                  <div className="mt-3">
                    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          over ? "bg-orange-400" : "bg-emerald-400"
                        )}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <p className="text-right text-xs text-gray-400 mt-0.5">{pct}% del presupuesto</p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="px-6 py-4 border-b border-gray-50">
                  <p className="text-xs text-gray-500 leading-relaxed">{opt.fit_explanation}</p>
                </div>

                {/* Items */}
                <div className="px-6 py-4 flex flex-col gap-2.5 flex-1">
                  {items.map((item, idx) => {
                    const sup = "supplier" in item ? item.supplier : null;
                    const pricingNote = "pricing_note" in item ? (item.pricing_note as string | null) : null;
                    return (
                      <div key={idx} className={cn("rounded-xl border p-3", tier.item)}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-base leading-none">
                                {SERVICE_ICONS[item.service_type as ServiceType] ?? "📦"}
                              </span>
                              <p className="text-xs font-bold text-gray-700">
                                {SERVICE_LABELS[item.service_type as ServiceType] ?? item.service_type}
                              </p>
                            </div>
                            {sup && (
                              <p className="text-xs text-gray-500 truncate">{sup.business_name}</p>
                            )}
                            {pricingNote && (
                              <p className="text-xs text-gray-400 mt-0.5">{pricingNote}</p>
                            )}
                            {item.notes && (
                              <p className="text-xs text-orange-500 mt-0.5">⚠️ {item.notes}</p>
                            )}
                          </div>
                          <p className="text-xs font-black text-gray-900 whitespace-nowrap flex-shrink-0">
                            {formatCOP(item.estimated_price_cop)}
                          </p>
                        </div>
                        {sup && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/60">
                            <div className="flex items-center gap-0.5">
                              <Star size={10} className="fill-amber-400 text-amber-400" />
                              <span className="text-xs text-gray-500 font-medium">
                                {sup.rating?.toFixed(1) ?? "—"}
                              </span>
                            </div>
                            <span className="text-gray-200">·</span>
                            <span className="text-xs text-gray-400">{sup.city}</span>
                            {sup.instagram_url && (
                              <>
                                <span className="text-gray-200">·</span>
                                <a
                                  href={`https://instagram.com/${sup.instagram_url.replace("@", "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-brand-400 hover:text-brand-600 transition-colors"
                                >
                                  {sup.instagram_url}
                                </a>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Unavailable services for this option */}
                  {unavailable.length > 0 && (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3">
                      <div className="flex items-start gap-2">
                        <XCircle size={13} className="text-gray-300 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-gray-400 mb-1">
                            Sin proveedor disponible
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {unavailable.map((s) => (
                              <span key={s} className="text-xs text-gray-400 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                                {SERVICE_ICONS[s]} {SERVICE_LABELS[s]}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Guest save nudge — per card */}
                {showGuestNudge && (
                  <div className="mx-6 mb-3 bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 flex items-start gap-2">
                    <Info size={13} className="text-brand-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-brand-700 leading-relaxed">
                      Para guardar esta cotización{" "}
                      <Link href="/registro" className="font-bold underline underline-offset-2">crea una cuenta gratis</Link>
                      {" "}o{" "}
                      <Link href="/login" className="font-bold underline underline-offset-2">inicia sesión</Link>.
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="px-6 pb-6 pt-2 flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const subject = encodeURIComponent(
                        `Cotización ${eventType}${eventTheme ? " · " + eventTheme : ""} — pepe by Sempertex`
                      );
                      window.open(`mailto:hola@pepe.co?subject=${subject}`, "_blank");
                    }}
                  >
                    <Phone size={13} />
                    Contactar proveedores
                  </Button>

                  <Button
                    variant={isSaved ? "secondary" : "outline"}
                    size="sm"
                    className={cn(
                      "w-full transition-all",
                      isSaved && "border-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    )}
                    loading={isSaving}
                    disabled={isSaved}
                    onClick={() => handleSave(opt)}
                  >
                    {isSaved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                    {isSaved ? "Guardada ✓" : "Guardar cotización"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Global unavailable services notice */}
      {globalUnavailable.length > 0 && (
        <div className="mt-6 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-card">
          <div className="flex items-start gap-3">
            <Info size={16} className="text-gray-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Servicios sin proveedor disponible actualmente
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {globalUnavailable.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1">
                    {SERVICE_ICONS[s]} {SERVICE_LABELS[s]}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Estamos creciendo nuestra red de proveedores. Estos servicios no están disponibles aún en tu ciudad.{" "}
                <Link href="/cotizar" className="text-brand-500 hover:text-brand-700 font-medium">
                  Vuelve a cotizar
                </Link>{" "}
                sin incluirlos para obtener precios más precisos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Over-budget tip */}
      {displayOptions.some((o) => o.total_price_cop > budget) && (
        <div className="mt-6 bg-orange-50 border border-orange-100 rounded-2xl px-6 py-5">
          <p className="text-sm font-semibold text-orange-700 mb-1">
            💡 Sobre el presupuesto
          </p>
          <p className="text-sm text-orange-600 leading-relaxed">
            Algunos servicios se cotizan por persona (pasabocas, picadas, mobiliario, souvenirs),
            lo que puede elevar el total según el número de invitados.
          </p>
          <Link href="/cotizar" className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-orange-700 hover:text-orange-900 transition-colors">
            <ArrowLeft size={14} /> Ajustar mi solicitud
          </Link>
        </div>
      )}
    </div>
  );
}
