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
} from "lucide-react";
import { SERVICE_ICONS, SERVICE_LABELS, type Profile, type QuoteRequest, type SavedQuote, type ServiceType } from "@/types";

// ─── Avatar helper ────────────────────────────────────────────────────────────
function Initials({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const parts = name.trim().split(" ").filter(Boolean);
  const letters = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : (parts[0]?.[0] ?? "?");

  const sz = { sm: "w-8 h-8 text-xs", md: "w-12 h-12 text-sm", lg: "w-16 h-16 text-lg" }[size];

  return (
    <div
      className={`${sz} gradient-brand rounded-2xl flex items-center justify-center text-white font-black shadow-brand-sm flex-shrink-0`}
    >
      {letters.toUpperCase()}
    </div>
  );
}

// ─── Tier config ──────────────────────────────────────────────────────────────
const TIER_LABELS = {
  economica:  { label: "Económica", icon: "💚", badge: "success"  as const },
  balanceada: { label: "Balanceada",icon: "⭐", badge: "brand"    as const },
  premium:    { label: "Premium",   icon: "👑", badge: "warning"  as const },
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
      .select("*, quote_request_services(*)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("saved_quotes")
      .select("*, quote_option:quote_options(*), quote_request:quote_requests(*)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const p = profile as Profile | null;
  const quoteRequests = (rawRequests ?? []) as QuoteRequest[];
  const savedQuotes   = (rawSaved   ?? []) as SavedQuote[];

  const displayName = p?.full_name || user.email?.split("@")[0] || "Cliente";
  const firstName   = displayName.split(" ")[0];

  // Next upcoming event
  const upcoming = quoteRequests.find((q) => q.event_date && new Date(q.event_date) >= new Date());

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />

      <div className="max-w-5xl mx-auto w-full px-4 py-10">

        {/* ── Profile header ─────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 mb-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Initials name={displayName} size="lg" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Bienvenido de vuelta</p>
              <h1 className="text-2xl font-black text-gray-900">
                Hola, {firstName} 👋
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
            </div>
          </div>
          <Link href="/cotizar">
            <Button size="md">
              <Plus size={15} />
              Nueva cotización
            </Button>
          </Link>
        </div>

        {/* ── Stats row ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-7">
          {[
            { label: "Cotizaciones", value: quoteRequests.length, icon: "🗂️" },
            { label: "Guardadas",    value: savedQuotes.length,   icon: "🔖" },
            { label: "Ciudad",       value: p?.city ?? "—",        icon: "📍", small: true },
          ].map(({ label, value, icon, small }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <p className="text-xl mb-2">{icon}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
              <p className={`font-black text-gray-900 ${small ? "text-base mt-1" : "text-3xl"}`}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Upcoming event highlight ───────────────────────────────── */}
        {upcoming && (
          <Link
            href={`/cotizacion/${upcoming.id}`}
            className="block bg-gradient-to-r from-brand-600 to-violet-600 rounded-3xl p-6 mb-7 text-white hover:shadow-brand transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-white/70" />
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wide">
                    Próximo evento
                  </p>
                </div>
                <p className="text-xl font-black">
                  {upcoming.event_type}
                  {upcoming.event_theme ? ` · ${upcoming.event_theme}` : ""}
                </p>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    {formatDate(upcoming.event_date!)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />{upcoming.city}
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="text-white/40 mt-1 flex-shrink-0" />
            </div>
          </Link>
        )}

        {/* ── Main content grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

          {/* Quote requests */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                🗂️ Mis cotizaciones
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
              <div className="flex flex-col gap-3">
                {quoteRequests.map((qr) => {
                  const serviceList = (qr.services ?? []).map((s) => s.service_type as ServiceType);
                  return (
                    <Link
                      key={qr.id}
                      href={`/cotizacion/${qr.id}`}
                      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card card-hover flex items-start justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-600 transition-colors truncate">
                          {qr.event_type}
                          {qr.event_theme ? ` · ${qr.event_theme}` : ""}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                          <span className="font-semibold text-brand-500">{formatCOP(qr.budget_cop)}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><MapPin size={10} />{qr.city}</span>
                          <span>·</span>
                          <span>{formatDate(qr.created_at)}</span>
                        </p>
                        {serviceList.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {serviceList.slice(0, 4).map((s) => (
                              <span key={s} className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                                {SERVICE_ICONS[s]} {SERVICE_LABELS[s]}
                              </span>
                            ))}
                            {serviceList.length > 4 && (
                              <span className="text-xs text-gray-400">+{serviceList.length - 4}</span>
                            )}
                          </div>
                        )}
                      </div>
                      <ChevronRight size={16} className="text-gray-200 group-hover:text-brand-400 transition-colors flex-shrink-0 mt-1" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Saved quotes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Bookmark size={16} className="text-brand-500" /> Guardadas
              </h2>
            </div>

            {savedQuotes.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-card">
                <div className="text-5xl mb-4">🔖</div>
                <p className="font-semibold text-gray-700 mb-1">Sin cotizaciones guardadas</p>
                <p className="text-sm text-gray-400 mb-5">
                  Desde los resultados de tu cotización puedes guardar la opción favorita aquí.
                </p>
                <Link href="/cotizar">
                  <Button variant="outline" size="sm">Crear cotización</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {savedQuotes.map((sq) => {
                  const opt = sq.quote_option;
                  const req = sq.quote_request;
                  if (!opt || !req) return null;
                  const tier = TIER_LABELS[opt.option_type as keyof typeof TIER_LABELS];

                  return (
                    <Link
                      key={sq.id}
                      href={`/cotizacion/${req.id}`}
                      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card card-hover group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-600 transition-colors truncate">
                          {req.event_type}
                          {req.event_theme ? ` · ${req.event_theme}` : ""}
                        </p>
                        {tier && (
                          <Badge variant={tier.badge} size="sm" className="flex-shrink-0">
                            {tier.icon} {tier.label}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <span className="font-bold text-brand-600 text-sm">{formatCOP(opt.total_price_cop)}</span>
                        <span className="flex items-center gap-1"><MapPin size={10} />{req.city}</span>
                        <span>{formatDate(sq.created_at)}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Help banner */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-card px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-800 text-sm">¿Quieres ofrecer tus servicios?</p>
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
