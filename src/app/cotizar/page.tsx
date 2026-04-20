"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  SERVICE_LABELS,
  SERVICE_ICONS,
  SERVICE_DESCRIPTIONS,
  VENUE_LABELS,
  EVENT_TYPES,
  CITIES,
  type ServiceType,
  type VenueType,
} from "@/types";
import { cn, formatCOP } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_SERVICES = Object.entries(SERVICE_LABELS) as [ServiceType, string][];
const ALL_VENUES   = Object.entries(VENUE_LABELS)   as [VenueType,  string][];

const STEPS = [
  { id: 1, label: "Evento" },
  { id: 2, label: "Lugar y presupuesto" },
  { id: 3, label: "Invitados" },
  { id: 4, label: "Servicios" },
  { id: 5, label: "Detalles" },
];

// Budget helper messages
function budgetHint(raw: string, services: ServiceType[], children: string, adults: string): string | null {
  const budget = parseInt(raw) || 0;
  if (!budget) return null;

  const n = (parseInt(children) || 0) + (parseInt(adults) || 0);
  const hasPerPerson = services.some((s) =>
    ["picadas_adultos", "pasabocas_ninos", "mobiliario", "souvenirs"].includes(s)
  );

  if (hasPerPerson && n > 0) {
    const approxMin =
      (parseInt(children) || 0) * 8000 +
      (parseInt(adults)   || 0) * 17000;
    if (approxMin > budget * 0.8) {
      return `⚠️ Con ${n} invitados y servicios por persona, el mínimo estimado es ~${formatCOP(approxMin)}. Ajusta el presupuesto o los servicios.`;
    }
  }

  if (budget < 300_000) return "💡 Para un evento básico recomendamos al menos $300.000 COP.";
  if (budget >= 2_000_000) return "✨ Presupuesto amplio — tendrás opciones premium disponibles.";
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CotizarPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [eventType,    setEventType]    = useState("");
  const [eventTheme,   setEventTheme]   = useState("");
  const [honoreeAge,   setHonoreeAge]   = useState("");
  const [eventDate,    setEventDate]    = useState("");
  const [budgetRaw,    setBudgetRaw]    = useState("");   // raw digits
  const [city,         setCity]         = useState("");
  const [venueType,    setVenueType]    = useState<VenueType | "">("");
  const [childrenCount,setChildrenCount]= useState("");
  const [adultCount,   setAdultCount]   = useState("");
  const [services,     setServices]     = useState<ServiceType[]>([]);
  const [notes,        setNotes]        = useState("");

  // Validation per step
  const stepErrors: Record<number, string | null> = {
    1: !eventType ? "Selecciona el tipo de evento." : null,
    2: !budgetRaw || parseInt(budgetRaw) < 100_000
      ? "Ingresa un presupuesto de al menos $100.000."
      : !city ? "Selecciona tu ciudad."
      : !venueType ? "Selecciona el tipo de lugar."
      : null,
    3: null, // optional
    4: services.length === 0 ? "Selecciona al menos un servicio." : null,
    5: null, // optional
  };

  function validateStep(s: number) {
    const err = stepErrors[s];
    if (err) { setError(err); return false; }
    setError(null);
    return true;
  }

  function nextStep() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length));
  }
  function prevStep() { setStep((s) => Math.max(s - 1, 1)); setError(null); }

  function toggleService(s: ServiceType) {
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  const budgetFormatted = budgetRaw
    ? new Intl.NumberFormat("es-CO").format(parseInt(budgetRaw))
    : "";

  const hint = step === 2
    ? budgetHint(budgetRaw, services, childrenCount, adultCount)
    : step === 4
    ? budgetHint(budgetRaw, services, childrenCount, adultCount)
    : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(4)) { setStep(4); return; }

    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        event_type:     eventType,
        event_theme:    eventTheme || null,
        honoree_age:    honoreeAge ? parseInt(honoreeAge) : null,
        budget_cop:     parseInt(budgetRaw),
        city,
        venue_type:     venueType,
        children_count: parseInt(childrenCount) || 0,
        adult_count:    parseInt(adultCount)    || 0,
        services,
        event_date:     eventDate || null,
        notes:          notes || null,
      };

      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al generar cotización");

      // Store options in sessionStorage for both guest and auth flows.
      // Auth results page falls back here if DB options are unavailable.
      if (data.options) {
        sessionStorage.setItem(
          data.quote_request_id,
          JSON.stringify({ request: requestBody, options: data.options })
        );
      }

      router.push(`/cotizacion/${data.quote_request_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-brand-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Cotiza tu evento</h1>
          <p className="text-gray-500 text-sm">
            Completa los detalles y recibe 3 opciones personalizadas con proveedores verificados.
          </p>
        </div>

        {/* Step progress */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => step > s.id && setStep(s.id)}
                className={cn(
                  "flex flex-col items-center gap-1 flex-shrink-0",
                  step > s.id && "cursor-pointer"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    step === s.id
                      ? "gradient-brand text-white shadow-brand-sm"
                      : step > s.id
                      ? "bg-brand-100 text-brand-600"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  {step > s.id ? <CheckCircle size={14} /> : s.id}
                </div>
                <span
                  className={cn(
                    "text-xs hidden sm:block",
                    step === s.id ? "text-brand-600 font-semibold" : "text-gray-400"
                  )}
                >
                  {s.label}
                </span>
              </button>

              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2 mt-[-10px] sm:mt-[-18px]">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      step > s.id ? "bg-brand-300" : "bg-gray-200"
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-card border border-gray-100">
          {/* ── Step 1: Sobre el evento ───────────────────────────────── */}
          {step === 1 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Sobre el evento</h2>
                <p className="text-sm text-gray-400">¿Qué tipo de celebración es?</p>
              </div>

              <Select
                label="Tipo de evento *"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="">Selecciona el tipo de evento</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>

              <Input
                label="Tema del evento"
                placeholder="Ej: Elmo, Bluey, Peppa Pig, sin tema..."
                value={eventTheme}
                onChange={(e) => setEventTheme(e.target.value)}
                hint="Opcional — si tienes un personaje o tema en mente"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Edad del homenajeado/a"
                  type="number"
                  placeholder="Ej: 2"
                  value={honoreeAge}
                  onChange={(e) => setHonoreeAge(e.target.value)}
                  min={0} max={120}
                  hint="Opcional"
                />
                <Input
                  label="Fecha del evento"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  hint="Opcional"
                />
              </div>
            </div>
          )}

          {/* ── Step 2: Presupuesto y lugar ───────────────────────────── */}
          {step === 2 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Presupuesto y lugar</h2>
                <p className="text-sm text-gray-400">¿Cuánto quieres invertir y dónde será?</p>
              </div>

              {/* Budget field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Presupuesto en COP *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1.000.000"
                    value={budgetFormatted}
                    onChange={(e) => setBudgetRaw(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-xl border border-gray-200 bg-white pl-8 pr-14 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                    COP
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Total disponible para todos los servicios del evento
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Ciudad *"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Selecciona tu ciudad</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </Select>

                <Select
                  label="Tipo de lugar *"
                  value={venueType}
                  onChange={(e) => setVenueType(e.target.value as VenueType)}
                >
                  <option value="">Selecciona el tipo de lugar</option>
                  {ALL_VENUES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </Select>
              </div>

              {hint && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 leading-relaxed">
                  {hint}
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Invitados ─────────────────────────────────────── */}
          {step === 3 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">¿Cuántos invitados?</h2>
                <p className="text-sm text-gray-400">
                  El número de invitados afecta el precio de algunos servicios como pasabocas, picadas y mobiliario.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5">
                  <div className="text-3xl mb-3">👶</div>
                  <Input
                    label="Niños"
                    type="number"
                    placeholder="Ej: 30"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(e.target.value)}
                    min={0}
                    hint="Menores de 12 años"
                  />
                </div>
                <div className="bg-rose-50 rounded-2xl border border-rose-100 p-5">
                  <div className="text-3xl mb-3">👨‍👩‍👧</div>
                  <Input
                    label="Adultos"
                    type="number"
                    placeholder="Ej: 20"
                    value={adultCount}
                    onChange={(e) => setAdultCount(e.target.value)}
                    min={0}
                    hint="Mayores de 12 años"
                  />
                </div>
              </div>

              {(parseInt(childrenCount) || 0) + (parseInt(adultCount) || 0) > 0 && (
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600">
                  Total de invitados:{" "}
                  <strong>{(parseInt(childrenCount) || 0) + (parseInt(adultCount) || 0)} personas</strong>
                </div>
              )}
            </div>
          )}

          {/* ── Step 4: Servicios ─────────────────────────────────────── */}
          {step === 4 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Servicios requeridos *</h2>
                <p className="text-sm text-gray-400">
                  Selecciona todo lo que necesitas para el evento. Puedes elegir varios.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ALL_SERVICES.map(([value, label]) => {
                  const selected = services.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleService(value)}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all duration-150",
                        selected
                          ? "border-brand-500 bg-brand-50 shadow-brand-sm"
                          : "border-gray-100 bg-gray-50 hover:border-brand-200 hover:bg-brand-50/30"
                      )}
                    >
                      <span className="text-2xl leading-none mt-0.5 flex-shrink-0">
                        {SERVICE_ICONS[value]}
                      </span>
                      <div className="min-w-0">
                        <p className={cn(
                          "text-sm font-semibold",
                          selected ? "text-brand-700" : "text-gray-800"
                        )}>
                          {label}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                          {SERVICE_DESCRIPTIONS[value]}
                        </p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex-shrink-0 ml-auto mt-0.5 flex items-center justify-center transition-all",
                        selected ? "border-brand-500 bg-brand-500" : "border-gray-300"
                      )}>
                        {selected && <CheckCircle size={12} className="text-white fill-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {hint && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 leading-relaxed">
                  {hint}
                </div>
              )}
            </div>
          )}

          {/* ── Step 5: Notas ─────────────────────────────────────────── */}
          {step === 5 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Notas adicionales</h2>
                <p className="text-sm text-gray-400">
                  Cualquier detalle extra que ayude a personalizar tu cotización.
                </p>
              </div>

              <Textarea
                label="Cuéntanos más (opcional)"
                placeholder="Ej: El salón social no tiene nevera. Prefiero proveedores que hayan trabajado con temática Elmo. El evento es en el quinto piso sin ascensor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
              />

              {/* Summary */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Resumen de tu solicitud
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Evento</p>
                    <p className="font-medium text-gray-800">
                      {eventType}{eventTheme ? ` · ${eventTheme}` : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Presupuesto</p>
                    <p className="font-medium text-brand-600">
                      {budgetRaw ? formatCOP(parseInt(budgetRaw)) : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Ciudad · Lugar</p>
                    <p className="font-medium text-gray-800">
                      {city}{venueType ? ` · ${VENUE_LABELS[venueType as VenueType] ?? venueType}` : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Invitados</p>
                    <p className="font-medium text-gray-800">
                      {parseInt(childrenCount) || 0} niños · {parseInt(adultCount) || 0} adultos
                    </p>
                  </div>
                </div>
                {services.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {services.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 bg-brand-100 text-brand-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {SERVICE_ICONS[s]} {SERVICE_LABELS[s]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="mx-7 sm:mx-9 -mt-2 mb-1 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="px-7 sm:px-9 py-5 border-t border-gray-50 flex items-center justify-between">
            {step > 1 ? (
              <Button type="button" variant="ghost" size="sm" onClick={prevStep}>
                <ArrowLeft size={15} />
                Anterior
              </Button>
            ) : (
              <div />
            )}

            {step < STEPS.length ? (
              <Button type="button" size="md" onClick={nextStep}>
                Siguiente
                <ArrowRight size={15} />
              </Button>
            ) : (
              <Button type="submit" size="md" loading={loading}>
                Ver mis 3 cotizaciones
                <ArrowRight size={15} />
              </Button>
            )}
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Cotizar es gratis · Sin compromisos · Puedes guardar el resultado
        </p>
      </div>
    </div>
  );
}
