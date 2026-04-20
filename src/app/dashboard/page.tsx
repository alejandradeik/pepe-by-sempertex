export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCOP, formatDate } from "@/lib/utils";
import {
  Bookmark,
  CalendarDays,
  ChevronRight,
  MapPin,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  SERVICE_ICONS,
  SERVICE_LABELS,
  type Profile,
  type QuoteRequest,
  type SavedQuote,
  type ServiceType,
} from "@/types";

// ─── Avatar initials ─────────────────────────────────────────────────────────
function Initials({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const parts = name.trim().split(" ").filter(Boolean);
  const letters =
    parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0]?.[0] ?? "?");
  const sz = { sm: "w-8 h-8 text-xs", md: "w-11 h-11 text-sm", lg: "w-16 h-16 text-xl" }[size];
  return (
    <div className={`${sz} gradient-brand rounded-2xl flex items-center justify-center text-white font-black shadow-brand-sm flex-shrink-0`}>
      {letters.toUpperCase()}
    </div>
  );
}

// ─── Tier config ──────────────────────────────────────────────────────────────
const TIER = {
  economica:  { label: "Económica", icon: "💚", badge: "success"  as const, bg: "bg-emerald-50", text: "text-emerald-700" },
  balanceada: { label: "Balanceada",icon: "⭐", badge: "brand"    as const, bg: "bg-brand-50",   text: "text-brand-700"   },
  premium:    { label: "Premium",   icon: "👑", badge: "warning"  as const, bg: "bg-amber-50",   text: "text-amber-700"   },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: rawRequests }, { data: rawSaved }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("quote_requests")
      .select("*, services:quote_request_services(*)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("saved_quotes")
      .select(`
        *,
        quote_option:quote_options(*, items:quote_option_items(service_type, item_name, estimated_price_cop)),
        quote_request:quote_requests(*)
      `)
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const p = profile as Profile | null;
  const quoteRequests = (rawRequests ?? []) as QuoteRequest[];
  const savedQuotes   = (rawSaved   ?? []) as SavedQuote[];

  const displayName = p?.full_name || user.email?.split("@")[0] || "Cliente";
  const firstName   = displayName.split(" ")[0];

  // Next upcoming event (future date, from requests)
  const upcoming = quoteRequests.find(
    (q) => q.event_date && new Date(q.event_date + "T12:00:00") >= new Date()
  );

  // Most-used services
  const allServices = quoteRequests.flatMap(
    (q) => (q.services ?? []).map((s) => s.service_type as ServiceType)
  );
  const serviceCounts: Record<string, number> = {};
  for (const s of allServices) serviceCounts[s] = (serviceCounts[s] ?? 0) + 1;
  const topServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([s]) => s as ServiceType);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />

      <div className="max-w-5xl mx-auto w-full px-4 py-10">

        {/* ── Profile header ─────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Initials name={displayName} size="lg" />
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Bienvenido de vuelta</p>
                <h1 className="text-2xl font-black text-gray-900">Hola, {firstName} 👋</h1>
                <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
              </div>
            </div>
            <Link href="/cotizar" className="flex-shrink-0">
              <Button size="md">
                <Plus size={15} />
                Nueva cotización
              </Button>
            </Link>
          </div>

          {/* Stats row inside header card */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-gray-50">
            <div className="text-center">
              <p className="text-2xl font-black text-gray-900">{quoteRequests.length}</p>
              <p className="text-xs text-gray-400 mt-0.5">Cotizaciones</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-brand-600">{savedQuotes.length}</p>
              <p className="text-xs text-gray-400 mt-0.5">Guardadas</p>
            </div>
            <div className="text-center">
              <p className="text-base font-black text-gray-700 leading-tight mt-0.5">
                {p?.city ?? "—"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Ciudad</p>
            </div>
          </div>
        </div>

        {/* ── Upcoming event banner ──────────────────────────────────── */}
        {upcoming && (
          <Link
            href={`/cotizacion/${upcoming.id}`}
            className="block mb-6 rounded-3xl overflow-hidden group"
          >
            <div className="gradient-brand p-6 text-white relative">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-10 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={13} className="text-white/60" />
                    <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">
                      Próximo evento
                    </p>
                  </div>
                  <p className="text-xl font-black">
                    {upcoming.event_type}
                    {upcoming.event_theme ? ` · ${upcoming.event_theme}` : ""}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/70">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={13} />
                      {formatDate(upcoming.event_date!)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />{upcoming.city}
                    </span>
                    {(upcoming.children_count > 0 || upcoming.adult_count > 0) && (
                      <span className="flex items-center gap-1.5">
                        <Users size={13} />
                        {upcoming.children_count + upcoming.adult_count} invitados
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight
                  size={22}
                  className="text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0 mt-1"
                />
              </div>
            </div>
          </Link>
        )}

        {/* ── Saved quotes — full width ──────────────────────────────── */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Bookmark size={16} className="text-brand-500" />
              Cotizaciones guardadas
            </h2>
          </div>

          {savedQuotes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-card">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bookmark size={24} className="text-brand-400" />
              </div>
              <p className="font-semibold text-gray-700 mb-1">Sin cotizaciones guardadas</p>
              <p className="text-sm text-gray-400 mb-5 max-w-xs mx-auto">
                Genera una cotización y guarda tu opción favorita para consultarla cuando quieras.
              </p>
              <Link href="/cotizar">
                <Button size="sm">Cotizar ahora</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedQuotes.map((sq) => {
                const opt = sq.quote_option;
                const req = sq.quote_request;
                if (!opt || !req) return null;
                const tier = TIER[opt.option_type as keyof typeof TIER];
                const items = (opt as { items?: Array<{ service_type: string }> }).items ?? [];

                return (
                  <Link
                    key={sq.id}
                    href={`/cotizacion/${req.id}`}
                    className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-md transition-all group flex flex-col overflow-hidden"
                  >
                    {/* Tier header strip */}
                    {tier && (
                      <div className={`px-4 py-2.5 flex items-center justify-between ${tier.bg}`}>
                        <Badge variant={tier.badge} size="sm">
                          {tier.icon} {tier.label}
                        </Badge>
                        <p className={`text-sm font-black ${tier.text}`}>
                          {formatCOP(opt.total_price_cop)}
                        </p>
                      </div>
                    )}

                    <div className="p-4 flex flex-col gap-2 flex-1">
                      {/* Event name */}
                      <p className="font-bold text-gray-900 text-sm group-hover:text-brand-600 transition-colors leading-tight">
                        {req.event_type}
                        {(req as QuoteRequest).event_theme
                          ? ` · ${(req as QuoteRequest).event_theme}`
                          : ""}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />{req.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays size={10} />{formatDate(sq.created_at)}
                        </span>
                      </div>

                      {/* Service icons */}
                      {items.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {items.slice(0, 5).map((item, i) => (
                            <span
                              key={i}
                              title={SERVICE_LABELS[item.service_type as ServiceType] ?? item.service_type}
                              className="text-base leading-none"
                            >
                              {SERVICE_ICONS[item.service_type as ServiceType] ?? "📦"}
                            </span>
                          ))}
                          {items.length > 5 && (
                            <span className="text-xs text-gray-400 self-center">
                              +{items.length - 5}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer link */}
                    <div className="px-4 pb-3 pt-1">
                      <span className="text-xs text-brand-500 font-semibold group-hover:text-brand-700 flex items-center gap-1 transition-colors">
                        Ver cotización <ChevronRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Quote requests ─────────────────────────────────────────── */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              🗂️ Historial de cotizaciones
            </h2>
            {quoteRequests.length > 0 && (
              <Link href="/cotizar">
                <Button variant="ghost" size="sm">
                  <Plus size={13} /> Nueva
                </Button>
              </Link>
            )}
          </div>

          {quoteRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-card">
              <div className="text-5xl mb-4">🎈</div>
              <p className="font-semibold text-gray-700 mb-1">Aún no tienes cotizaciones</p>
              <p className="text-sm text-gray-400 mb-5">
                ¡Empieza ahora! Es gratis y toma menos de 3 minutos.
              </p>
              <Link href="/cotizar">
                <Button size="sm">Cotizar mi primer evento</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {quoteRequests.map((qr) => {
                const serviceList = (qr.services ?? []).map((s) => s.service_type as ServiceType);
                const isSaved = savedQuotes.some((sq) => sq.quote_request_id === qr.id);
                return (
                  <Link
                    key={qr.id}
                    href={`/cotizacion/${qr.id}`}
                    className="bg-white rounded-2xl border border-gray-100 px-5 py-4 shadow-card hover:shadow-card-md transition-all group flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-600 transition-colors">
                          {qr.event_type}
                          {qr.event_theme ? ` · ${qr.event_theme}` : ""}
                        </p>
                        {isSaved && (
                          <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-2 py-0.5 font-medium">
                            ✓ Guardada
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-400">
                        <span className="font-semibold text-brand-500">{formatCOP(qr.budget_cop)}</span>
                        <span className="flex items-center gap-1"><MapPin size={10} />{qr.city}</span>
                        {qr.event_date && (
                          <span className="flex items-center gap-1">
                            <CalendarDays size={10} />{formatDate(qr.event_date)}
                          </span>
                        )}
                        <span>{formatDate(qr.created_at)}</span>
                      </div>
                      {serviceList.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {serviceList.slice(0, 5).map((s) => (
                            <span key={s} className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-2 py-0.5">
                              {SERVICE_ICONS[s]} {SERVICE_LABELS[s]}
                            </span>
                          ))}
                          {serviceList.length > 5 && (
                            <span className="text-xs text-gray-400 self-center">
                              +{serviceList.length - 5} más
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-200 group-hover:text-brand-400 transition-colors flex-shrink-0 mt-1"
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Insights row ───────────────────────────────────────────── */}
        {topServices.length > 0 && (
          <section className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-card px-6 py-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp size={13} /> Servicios que más cotizas
            </p>
            <div className="flex flex-wrap gap-2">
              {topServices.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-3 py-1.5 rounded-full border border-brand-100"
                >
                  <span className="text-base">{SERVICE_ICONS[s]}</span>
                  {SERVICE_LABELS[s]}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── Supplier CTA ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-800 text-sm">¿Ofreces servicios para eventos?</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Únete como proveedor y llega a cientos de familias en Colombia.
            </p>
          </div>
          <Link href="/proveedores/aplicar" className="flex-shrink-0">
            <Button variant="outline" size="sm">Aplicar como proveedor</Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
