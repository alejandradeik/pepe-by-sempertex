/**
 * Quote Generation Logic
 *
 * Realistic pricing for Colombian events:
 *   - flat:       fixed price regardless of guest count (decorator, photographer, cake)
 *   - per_child:  price × children_count (pasabocas, souvenirs)
 *   - per_adult:  price × adult_count (picadas)
 *   - per_person: price × (children + adults) (mobiliario, catering general)
 *
 * Three tiers are assembled by choosing the cheapest / best-value / most-premium
 * supplier for each requested service, preferring same-city matches.
 */

import { createClient } from "@/lib/supabase/server";
import type { ServiceType, SupplierProfile, QuoteOptionType, PricingModel } from "@/types";

// ─── City proximity (nearest first) ──────────────────────────────────────────
// Used to rank out-of-city providers so the closest alternative is shown first.
const NEARBY_CITIES: Record<string, string[]> = {
  "Bogotá":       ["Manizales", "Pereira", "Ibagué", "Bucaramanga", "Medellín", "Cali", "Barranquilla", "Cartagena", "Santa Marta"],
  "Medellín":     ["Manizales", "Pereira", "Bogotá", "Cali", "Bucaramanga", "Barranquilla", "Cartagena", "Ibagué", "Santa Marta"],
  "Cali":         ["Pereira", "Manizales", "Medellín", "Ibagué", "Bogotá", "Bucaramanga", "Barranquilla", "Cartagena", "Santa Marta"],
  "Barranquilla": ["Cartagena", "Santa Marta", "Bucaramanga", "Bogotá", "Medellín", "Cali", "Pereira", "Manizales", "Ibagué"],
  "Cartagena":    ["Barranquilla", "Santa Marta", "Bucaramanga", "Bogotá", "Medellín", "Cali", "Pereira", "Manizales", "Ibagué"],
  "Bucaramanga":  ["Bogotá", "Barranquilla", "Cartagena", "Medellín", "Santa Marta", "Cali", "Pereira", "Manizales", "Ibagué"],
  "Pereira":      ["Manizales", "Medellín", "Cali", "Ibagué", "Bogotá", "Bucaramanga", "Barranquilla", "Cartagena", "Santa Marta"],
  "Manizales":    ["Pereira", "Medellín", "Cali", "Ibagué", "Bogotá", "Bucaramanga", "Barranquilla", "Cartagena", "Santa Marta"],
  "Ibagué":       ["Bogotá", "Pereira", "Manizales", "Cali", "Medellín", "Bucaramanga", "Barranquilla", "Cartagena", "Santa Marta"],
  "Santa Marta":  ["Barranquilla", "Cartagena", "Bucaramanga", "Bogotá", "Medellín", "Cali", "Pereira", "Manizales", "Ibagué"],
};

// ─── Public types ─────────────────────────────────────────────────────────────

export interface GeneratedItem {
  supplier_profile_id: string;
  service_type: ServiceType;
  item_name: string;
  estimated_price_cop: number;
  /** Human-readable note explaining how price was calculated */
  pricing_note: string | null;
  notes: string | null;
  supplier: SupplierProfile;
}

export interface GeneratedOption {
  option_type: QuoteOptionType;
  total_price_cop: number;
  summary: string;
  fit_explanation: string;
  budget_pct: number;         // total as % of budget (may exceed 100)
  items: GeneratedItem[];
  over_budget: boolean;
  budget_gap: number;         // positive = surplus, negative = deficit
  unavailable_services: ServiceType[];  // requested but no approved supplier found
}

export interface QuoteInput {
  services: ServiceType[];
  city: string;
  budget_cop: number;
  children_count: number;
  adult_count: number;
  event_type: string;
  event_theme?: string | null;
  honoree_age?: number | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function totalGuests(input: QuoteInput) {
  return input.children_count + input.adult_count;
}

/**
 * Compute the realistic price for one supplier+service, scaled by guest count.
 * For per_child/per_adult/per_person we use price_per_unit; if that's 0 we fall
 * back to the range proportionally.
 */
function computePrice(
  supplier: SupplierProfile,
  tier: "low" | "mid" | "high",
  input: QuoteInput
): { price: number; pricingNote: string | null } {
  const model: PricingModel = supplier.pricing_model ?? "flat";

  const unitPrice =
    supplier.price_per_unit > 0
      ? supplier.price_per_unit
      : Math.round((supplier.price_range_min + supplier.price_range_max) / 2 / Math.max(totalGuests(input), 1));

  // Tier multiplier: low = 0.85×unit, mid = 1.0×unit, high = 1.2×unit
  const mult = tier === "low" ? 0.85 : tier === "high" ? 1.2 : 1.0;
  const scaledUnit = Math.round(unitPrice * mult);

  if (model === "flat") {
    const base =
      tier === "low"
        ? supplier.price_range_min
        : tier === "high"
        ? supplier.price_range_max
        : Math.round((supplier.price_range_min + supplier.price_range_max) / 2);
    return { price: base, pricingNote: null };
  }

  if (model === "per_child") {
    const n = input.children_count || 1;
    const price = Math.min(scaledUnit * n, supplier.price_range_max * 1.5);
    return {
      price: Math.round(price),
      pricingNote: `${n} niños × ${fmt(scaledUnit)}/niño`,
    };
  }

  if (model === "per_adult") {
    const n = input.adult_count || 1;
    const price = Math.min(scaledUnit * n, supplier.price_range_max * 1.5);
    return {
      price: Math.round(price),
      pricingNote: `${n} adultos × ${fmt(scaledUnit)}/adulto`,
    };
  }

  // per_person
  const n = totalGuests(input) || 1;
  const price = Math.min(scaledUnit * n, supplier.price_range_max * 1.5);
  return {
    price: Math.round(price),
    pricingNote: `${n} personas × ${fmt(scaledUnit)}/persona`,
  };
}

function fmt(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);
}

function midPrice(s: SupplierProfile): number {
  return Math.round((s.price_range_min + s.price_range_max) / 2);
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function generateQuoteOptions(input: QuoteInput): Promise<GeneratedOption[]> {
  const supabase = await createClient();

  const { data: suppliers, error } = await supabase
    .from("supplier_profiles")
    .select("*")
    .eq("status", "approved")
    .overlaps("service_categories", input.services);

  if (error || !suppliers) {
    throw new Error("No se pudo obtener la lista de proveedores.");
  }

  // Group by service; prefer same-city, then nearest cities, then anywhere
  const byRating = (a: SupplierProfile, b: SupplierProfile) =>
    (b.rating ?? 4) - (a.rating ?? 4);
  const nearbyOrder = NEARBY_CITIES[input.city] ?? [];
  const nearbySet = new Set([input.city, ...nearbyOrder]);

  const byService: Record<string, SupplierProfile[]> = {};
  for (const service of input.services) {
    const matches = (suppliers as SupplierProfile[]).filter((s) =>
      s.service_categories.includes(service)
    );
    const sameCity = matches.filter((s) => s.city === input.city).sort(byRating);

    // Build proximity-ordered list for other cities
    const proximate: SupplierProfile[] = [];
    for (const city of nearbyOrder) {
      proximate.push(...matches.filter((s) => s.city === city).sort(byRating));
    }
    // Any city not in the proximity list goes last
    const distant = matches.filter((s) => !nearbySet.has(s.city)).sort(byRating);

    byService[service] = [...sameCity, ...proximate, ...distant];
  }

  const tiers: Array<{ type: QuoteOptionType; priceLevel: "low" | "mid" | "high" }> = [
    { type: "economica",  priceLevel: "low"  },
    { type: "balanceada", priceLevel: "mid"  },
    { type: "premium",    priceLevel: "high" },
  ];

  const options: GeneratedOption[] = [];

  for (const tier of tiers) {
    const items: GeneratedItem[] = [];
    let total = 0;

    for (const service of input.services) {
      const candidates = byService[service] ?? [];

      if (candidates.length === 0) {
        // ── Multi-service bundle fallback ─────────────────────────────────────
        // No dedicated provider exists globally. Reuse an already-picked
        // supplier from this tier whose service_categories includes this service.
        const bundleSupplier = items
          .map((i) => i.supplier)
          .find((s) => (s.service_categories as string[]).includes(service));

        if (bundleSupplier) {
          const { price, pricingNote } = computePrice(bundleSupplier, tier.priceLevel, input);
          total += price;
          items.push({
            supplier_profile_id: bundleSupplier.id,
            service_type: service,
            item_name: bundleSupplier.business_name,
            estimated_price_cop: price,
            pricing_note: pricingNote,
            notes: "Servicio adicional cubierto por el mismo proveedor.",
            supplier: bundleSupplier,
          });
        }
        // If no bundle possible, service stays unresolved → appears in unavailable_services
        continue;
      }

      // Pick supplier for this tier
      let picked: SupplierProfile;
      if (tier.priceLevel === "low") {
        picked = [...candidates].sort((a, b) => midPrice(a) - midPrice(b))[0];
      } else if (tier.priceLevel === "high") {
        picked = candidates[0]; // sorted by rating desc, proximity second
      } else {
        const budgetShare = Math.round(input.budget_cop / input.services.length);
        picked = candidates
          .slice()
          .sort((a, b) => {
            const aDiff = Math.abs(midPrice(a) - budgetShare);
            const bDiff = Math.abs(midPrice(b) - budgetShare);
            if (Math.abs(aDiff - bDiff) < 50000) return (b.rating ?? 4) - (a.rating ?? 4);
            return aDiff - bDiff;
          })[0];
      }

      const { price, pricingNote } = computePrice(picked, tier.priceLevel, input);
      total += price;

      // Build city note; distinguish nearby vs distant
      let cityNote: string | null = null;
      if (picked.city !== input.city) {
        const proximityIndex = nearbyOrder.indexOf(picked.city);
        cityNote =
          proximityIndex !== -1 && proximityIndex < 3
            ? `Proveedor en ${picked.city} (ciudad cercana).`
            : `Proveedor en ${picked.city}. Confirmar disponibilidad de desplazamiento.`;
      }

      items.push({
        supplier_profile_id: picked.id,
        service_type: service,
        item_name: picked.business_name,
        estimated_price_cop: price,
        pricing_note: pricingNote,
        notes: cityNote,
        supplier: picked,
      });
    }

    // Unavailable = requested services with no item resolved (no candidate + no bundle)
    const unavailable_services = input.services.filter(
      (s) => !items.some((i) => i.service_type === s)
    ) as ServiceType[];

    const over_budget = total > input.budget_cop;
    const budget_gap = input.budget_cop - total;
    const budget_pct = Math.round((total / input.budget_cop) * 100);

    options.push({
      option_type: tier.type,
      total_price_cop: total,
      summary: buildSummary(tier.type, input),
      fit_explanation: buildExplanation(tier.type, total, input.budget_cop, over_budget, budget_gap, input),
      budget_pct,
      items,
      over_budget,
      budget_gap,
      unavailable_services,
    });
  }

  return options;
}

// ─── Text builders ────────────────────────────────────────────────────────────

function buildSummary(type: QuoteOptionType, input: QuoteInput): string {
  const theme = input.event_theme ? ` temática ${input.event_theme}` : "";
  const guests = totalGuests(input);
  switch (type) {
    case "economica":
      return `Opción económica para ${input.event_type}${theme} · ${guests} invitados`;
    case "balanceada":
      return `Opción balanceada para ${input.event_type}${theme} · ${guests} invitados`;
    case "premium":
      return `Opción premium para ${input.event_type}${theme} · ${guests} invitados`;
  }
}

function buildExplanation(
  type: QuoteOptionType,
  total: number,
  budget: number,
  over_budget: boolean,
  gap: number,
  input: QuoteInput
): string {
  const totalGuest = totalGuests(input);
  const perHead = totalGuest > 0 ? Math.round(total / totalGuest) : 0;

  if (over_budget) {
    const deficit = fmt(Math.abs(gap));
    const tip = buildBudgetTip(input);
    return `Esta opción supera tu presupuesto por ${deficit} (${fmt(perHead)}/invitado). ${tip}`;
  }

  const surplus = fmt(gap);
  switch (type) {
    case "economica":
      return `Cabe en tu presupuesto y te sobran ${surplus}. Proveedores confiables al mejor precio, ideal para aprovechar lo que resta en detalles extra.`;
    case "balanceada":
      return `Excelente equilibrio calidad-precio (${fmt(perHead)}/invitado). Proveedores bien calificados que respetan tu presupuesto con ${surplus} de margen.`;
    case "premium":
      return `Los proveedores mejor valorados para tu ${input.event_type}. Con ${surplus} dentro del presupuesto, obtienes la experiencia más completa.`;
  }
}

function buildBudgetTip(input: QuoteInput): string {
  const perAdult = input.adult_count * 17000;
  const perChild = input.children_count * 8000;

  // Check if per-person services are the main driver
  if (input.services.includes("picadas_adultos") && input.adult_count > 20) {
    return `Con ${input.adult_count} adultos, las picadas tienen un peso grande. Considera reducir el menú o el número de adultos.`;
  }
  if (input.services.includes("pasabocas_ninos") && input.children_count > 30) {
    return `Con ${input.children_count} niños, los pasabocas escalan. Cotizar un paquete de bolsitas puede ser más económico.`;
  }
  if (input.services.includes("mobiliario") && input.children_count + input.adult_count > 50) {
    return `El mobiliario para ${input.children_count + input.adult_count} personas tiene un costo proporcional. Verifica si el salón ya incluye sillas.`;
  }
  void perAdult; void perChild;
  return `Ajusta el presupuesto o reduce servicios para acercarte a tu meta.`;
}
