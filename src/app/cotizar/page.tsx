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
  SERVICE_GROUPS,
  VENUE_LABELS,
  EVENT_TYPE_GROUPS,
  CITIES,
  type ServiceType,
  type VenueType,
} from "@/types";
import { cn, formatCOP } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, X } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_VENUES = Object.entries(VENUE_LABELS) as [VenueType, string][];

const STEPS = [
  { id: 1, label: "Evento",    optional: false },
  { id: 2, label: "Lugar",     optional: false },
  { id: 3, label: "Invitados", optional: true  },
  { id: 4, label: "Servicios", optional: false },
  { id: 5, label: "Detalles",  optional: true  },
];

const BUDGET_PRESETS = [
  { label: "$400K",  value: "400000"   },
  { label: "$800K",  value: "800000"   },
  { label: "$1.5M",  value: "1500000"  },
  { label: "$3M",    value: "3000000"  },
  { label: "$6M",    value: "6000000"  },
];

// Services that scale with guest count (for budget hint)
const PER_PERSON_SERVICES: ServiceType[] = [
  "pasabocas_ninos", "picadas_adultos", "mobiliario", "souvenirs",
  "catering_completo", "bebidas", "meseros", "menaje",
];

function budgetHint(
  raw: string,
  services: ServiceType[],
  children: string,
  adults: string
): { text: string; level: "warn" | "info" | "ok" } | null {
  const budget = parseInt(raw) || 0;
  if (!budget) return null;

  const n    = (parseInt(children) || 0) + (parseInt(adults) || 0);
  const nKid = parseInt(children) || 0;
  const nAdu = parseInt(adults)   || 0;

  const perPersonSelected = services.filter((s) => PER_PERSON_SERVICES.includes(s));

  if (perPersonSelected.length > 0 && n > 0) {
    // Rough minimum: pasabocas kids + picadas adults + mobiliario
    const approxMin =
      (services.includes("pasabocas_ninos")   ? nKid * 8_000  : 0) +
      (services.includes("picadas_adultos")    ? nAdu * 17_000 : 0) +
      (services.includes("mobiliario")         ? n   * 9_000   : 0) +
      (services.includes("catering_completo")  ? n   * 25_000  : 0) +
      (services.includes("meseros")            ? n   * 15_000  : 0) +
      (services.includes("bebidas")            ? n   * 8_000   : 0) +
      (services.includes("menaje")             ? n   * 5_000   : 0) +
      (services.includes("souvenirs")          ? nKid* 7_000   : 0);

    if (approxMin > budget * 0.85) {
      return {
        text: `⚠️ Con ${n} invitados y servicios por persona, el mínimo estimado es ~${formatCOP(approxMin)}. Considera aumentar el presupuesto.`,
        level: "warn",
      };
    }
  }

  if (budget < 300_000)
    return { text: "💡 Para un evento básico recomendamos al menos $300.000 COP.", level: "info" };
  if (budget >= 5_000_000)
    return { text: "✨ Presupuesto amplio — tendrás acceso a los mejores proveedores.", level: "ok" };
  if (budget >= 2_000_000)
    return { text: "✨ Presupuesto generoso — opciones premium disponibles.", level: "ok" };

  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CotizarPage() {
  const router = useRouter();
  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Form fields
  const [eventType,     setEventType]     = useState("");
  const [eventTheme,    setEventTheme]    = useState("");
  const [honoreeAge,    setHonoreeAge]    = useState("");
  const [eventDate,     setEventDate]     = useState("");
  const [budgetRaw,     setBudgetRaw]     = useState("");
  const [city,          setCity]          = useState("");
  const [venueType,     setVenueType]     = useState<VenueType | "">("");
  const [childrenCount, setChildrenCount] = useState("");
  const [adultCount,    setAdultCount]    = useState("");
  const [services,      setServices]      = useState<ServiceType[]>([]);
  const [notes,         setNotes]         = useState("");

  const stepErrors: Record<number, string | null> = {
    1: !eventType  ? "Selecciona el tipo de evento." : null,
    2: !budgetRaw || parseInt(budgetRaw) < 100_000
         ? "Ingresa un presupuesto de al menos $100.000."
         : !city       ? "Selecciona tu ciudad."
         : !venueType  ? "Selecciona el tipo de lugar."
         : null,
    3: null,
    4: services.length === 0 ? "Selecciona al menos un servicio." : null,
    5: null,
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

  function setBudget(raw: string) {
    setBudgetRaw(raw.replace(/\D/g, ""));
  }

  const budgetFormatted = budgetRaw
    ? new Intl.NumberFormat("es-CO").format(parseInt(budgetRaw))
    : "";

  const hint = (step === 2 || step === 4)
    ? budgetHint(budgetRaw, services, childrenCount, adultCount)
    : null;

  const totalGuests = (parseInt(childrenCount) || 0) + (parseInt(adultCount) || 0);

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
                className={cn("flex flex-col items-center gap-1 flex-shrink-0", step > s.id && "cursor-pointer")}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step === s.id  ? "gradient-brand text-white shadow-brand-sm"
                  : step > s.id  ? "bg-brand-100 text-brand-600"
                  : "bg-gray-100 text-gray-400"
                )}>
                  {step > s.id ? <CheckCircle size={14} /> : s.id}
                </div>
                <span className={cn(
                  "text-xs hidden sm:block leading-tight text-center",
                  step === s.id ? "text-brand-600 font-semibold" : "text-gray-400"
                )}>
                  {s.label}
                  {s.optional && (
                    <span className="block text-[10px] text-gray-300">opcional</span>
                  )}
                </span>
              </button>

              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2 mt-[-10px] sm:mt-[-18px]">
                  <div className={cn(
                    "h-full transition-all duration-300",
                    step > s.id ? "bg-brand-300" : "bg-gray-200"
                  )} />
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-card border border-gray-100">

          {/* ── Step 1: Evento ──────────────────────────────────────── */}
          {step === 1 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">¿Qué vamos a celebrar?</h2>
                <p className="text-sm text-gray-400">Cuéntanos sobre el evento para personalizar tu cotización.</p>
              </div>

              <Select
                label="Tipo de evento *"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="">Selecciona el tipo de evento</option>
                {EVENT_TYPE_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.types.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </optgroup>
                ))}
              </Select>

              <Input
                label="Tema o temática"
                placeholder="Ej: Elmo, Bluey, Peppa Pig, cactus, sin tema…"
                value={eventTheme}
                onChange={(e) => setEventTheme(e.target.value)}
                hint="Opcional — ayuda a encontrar proveedores especializados"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Edad del homenajeado/a"
                  type="number"
                  placeholder="Ej: 5"
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

          {/* ── Step 2: Lugar y presupuesto ─────────────────────────── */}
          {step === 2 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">Lugar y presupuesto</h2>
                <p className="text-sm text-gray-400">¿Cuánto quieres invertir y dónde será el evento?</p>
              </div>

              {/* Budget field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Presupuesto total en COP *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1.000.000"
                    value={budgetFormatted}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white pl-8 pr-14 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">COP</span>
                </div>

                {/* Budget presets */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {BUDGET_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setBudgetRaw(p.value)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold border transition-all",
                        budgetRaw === p.value
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-gray-200 text-gray-500 hover:border-brand-300 hover:text-brand-600"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-gray-400">
                  Total disponible para todos los servicios seleccionados
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select label="Ciudad *" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Selecciona tu ciudad</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </Select>

                <Select label="Tipo de lugar *" value={venueType} onChange={(e) => setVenueType(e.target.value as VenueType)}>
                  <option value="">Selecciona el tipo de lugar</option>
                  {ALL_VENUES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </Select>
              </div>

              {hint && (
                <div className={cn(
                  "rounded-xl px-4 py-3 text-xs leading-relaxed",
                  hint.level === "warn" ? "bg-amber-50 border border-amber-200 text-amber-700"
                  : hint.level === "ok" ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  : "bg-blue-50 border border-blue-200 text-blue-700"
                )}>
                  {hint.text}
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Invitados ──────────────────────────────────── */}
          {step === 3 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">¿Cuántos invitados?</h2>
                <p className="text-sm text-gray-400">
                  El número afecta el precio de servicios por persona (pasabocas, picadas, mobiliario…).
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

              {totalGuests > 0 && (
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
                  <span>Total de invitados</span>
                  <span className="font-black text-gray-900">{totalGuests} personas</span>
                </div>
              )}
            </div>
          )}

          {/* ── Step 4: Servicios ─────────────────────────────────── */}
          {step === 4 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-0.5">Servicios requeridos *</h2>
                  <p className="text-sm text-gray-400">
                    Selecciona todo lo que necesitas. Puedes elegir varios.
                  </p>
                </div>
                {services.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setServices([])}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 mt-1"
                  >
                    <X size={12} /> Limpiar
                  </button>
                )}
              </div>

              {/* Selected chips row */}
              {services.length > 0 && (
                <div className="flex flex-wrap gap-1.5 -mt-1">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className="inline-flex items-center gap-1 bg-brand-100 text-brand-700 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors group"
                    >
                      {SERVICE_ICONS[s]} {SERVICE_LABELS[s]}
                      <X size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-6">
                {SERVICE_GROUPS.map((group) => {
                  const selectedInGroup = group.services.filter((s) => services.includes(s)).length;
                  return (
                    <div key={group.label}>
                      <div className="flex items-center justify-between mb-2.5">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {group.label}
                        </p>
                        {selectedInGroup > 0 && (
                          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                            {selectedInGroup} seleccionado{selectedInGroup > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.services.map((value) => {
                          const selected = services.includes(value);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => toggleService(value)}
                              className={cn(
                                "flex items-start gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all duration-150",
                                selected
                                  ? "border-brand-500 bg-brand-50 shadow-brand-sm"
                                  : "border-gray-100 bg-gray-50 hover:border-brand-200 hover:bg-brand-50/40"
                              )}
                            >
                              <span className="text-xl leading-none mt-0.5 flex-shrink-0">
                                {SERVICE_ICONS[value]}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className={cn(
                                  "text-sm font-semibold leading-tight",
                                  selected ? "text-brand-700" : "text-gray-800"
                                )}>
                                  {SERVICE_LABELS[value]}
                                </p>
                                <p className="text-xs text-gray-400 leading-snug mt-0.5">
                                  {SERVICE_DESCRIPTIONS[value]}
                                </p>
                              </div>
                              <div className={cn(
                                "w-5 h-5 rounded-full border-2 flex-shrink-0 ml-1 mt-0.5 flex items-center justify-center transition-all",
                                selected ? "border-brand-500 bg-brand-500" : "border-gray-300"
                              )}>
                                {selected && <CheckCircle size={12} className="text-white fill-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {hint && (
                <div className={cn(
                  "rounded-xl px-4 py-3 text-xs leading-relaxed",
                  hint.level === "warn" ? "bg-amber-50 border border-amber-200 text-amber-700"
                  : "bg-blue-50 border border-blue-200 text-blue-700"
                )}>
                  {hint.text}
                </div>
              )}
            </div>
          )}

          {/* ── Step 5: Notas y resumen ───────────────────────────── */}
          {step === 5 && (
            <div className="p-7 sm:p-9 flex flex-col gap-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">Últimos detalles</h2>
                <p className="text-sm text-gray-400">
                  Información adicional que ayude a personalizar tu cotización.
                </p>
              </div>

              <Textarea
                label="Notas adicionales (opcional)"
                placeholder="Ej: El salón no tiene nevera. Prefiero proveedores con experiencia en temática Elmo. El evento es en quinto piso sin ascensor…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />

              {/* Summary card */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 bg-white">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    Resumen de tu solicitud
                  </p>
                </div>
                <div className="p-5 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Evento</p>
                    <p className="font-semibold text-gray-800 leading-tight">
                      {eventType}{eventTheme ? ` · ${eventTheme}` : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Presupuesto</p>
                    <p className="font-bold text-brand-600">
                      {budgetRaw ? formatCOP(parseInt(budgetRaw)) : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Ciudad · Lugar</p>
                    <p className="font-semibold text-gray-800">
                      {city}{venueType ? ` · ${VENUE_LABELS[venueType as VenueType] ?? venueType}` : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Invitados</p>
                    <p className="font-semibold text-gray-800">
                      {parseInt(childrenCount) || 0} niños · {parseInt(adultCount) || 0} adultos
                    </p>
                  </div>
                </div>
                {services.length > 0 && (
                  <div className="px-5 pb-5">
                    <p className="text-xs text-gray-400 mb-2">
                      {services.length} servicio{services.length > 1 ? "s" : ""} seleccionado{services.length > 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {services.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 bg-brand-100 text-brand-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {SERVICE_ICONS[s]} {SERVICE_LABELS[s]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="mx-7 sm:mx-9 -mt-2 mb-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
              <span className="mt-0.5">⚠️</span> {error}
            </div>
          )}

          {/* Navigation */}
          <div className="px-7 sm:px-9 py-5 border-t border-gray-50 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button type="button" variant="ghost" size="sm" onClick={prevStep}>
                <ArrowLeft size={15} /> Anterior
              </Button>
            ) : <div />}

            {step < STEPS.length ? (
              <div className="flex items-center gap-3">
                {STEPS[step - 1].optional && step < STEPS.length && (
                  <button
                    type="button"
                    onClick={() => { setError(null); setStep((s) => s + 1); }}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Omitir este paso →
                  </button>
                )}
                <Button type="button" size="md" onClick={nextStep}>
                  Siguiente <ArrowRight size={15} />
                </Button>
              </div>
            ) : (
              <Button type="submit" size="md" loading={loading}>
                <Sparkles size={15} />
                Ver mis 3 cotizaciones
              </Button>
            )}
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Cotizar es gratis · Sin compromisos · Guarda tu opción favorita
        </p>
      </div>
    </div>
  );
}
