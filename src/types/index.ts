// ─── Domain types mirroring the Supabase schema ───────────────────────────────

export type UserRole = "customer" | "supplier" | "admin";

export type VenueType =
  | "salon_social"
  | "casa"
  | "finca"
  | "restaurante"
  | "otro";

export type ServiceType =
  | "decoracion"
  | "recreacionista"
  | "pastel"
  | "pasabocas_ninos"
  | "picadas_adultos"
  | "mobiliario"
  | "fotografo"
  | "souvenirs";

/** How a supplier prices their service */
export type PricingModel = "flat" | "per_child" | "per_adult" | "per_person";

export type QuoteOptionType = "economica" | "balanceada" | "premium";

export type SupplierStatus = "pending" | "approved" | "rejected";

// ─── Database row types ────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  created_at: string;
}

export interface SupplierProfile {
  id: string;
  profile_id: string | null;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  city: string;
  service_categories: ServiceType[];
  price_range_min: number;
  price_range_max: number;
  /** How pricing scales: flat fee, per child, per adult, or per person */
  pricing_model: PricingModel;
  /** Unit price (COP) when pricing_model is not 'flat' */
  price_per_unit: number;
  /** Max guests this supplier can serve */
  max_capacity: number | null;
  description: string;
  instagram_url: string | null;
  website_url: string | null;
  years_experience: number;
  status: SupplierStatus;
  rating: number | null;
  tags: string[];
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  customer_id: string;
  event_type: string;
  event_theme: string | null;
  honoree_age: number | null;
  budget_cop: number;
  city: string;
  venue_type: VenueType;
  children_count: number;
  adult_count: number;
  event_date: string | null;
  notes: string | null;
  created_at: string;
  // joined
  services?: QuoteRequestService[];
}

export interface QuoteRequestService {
  id: string;
  quote_request_id: string;
  service_type: ServiceType;
}

export interface QuoteOption {
  id: string;
  quote_request_id: string;
  option_type: QuoteOptionType;
  total_price_cop: number;
  summary: string;
  fit_explanation: string;
  created_at: string;
  // joined
  items?: QuoteOptionItem[];
}

export interface QuoteOptionItem {
  id: string;
  quote_option_id: string;
  supplier_profile_id: string;
  service_type: ServiceType;
  item_name: string;
  estimated_price_cop: number;
  notes: string | null;
  // joined
  supplier?: SupplierProfile;
}

export interface SavedQuote {
  id: string;
  customer_id: string;
  quote_request_id: string;
  quote_option_id: string;
  created_at: string;
  // joined
  quote_request?: QuoteRequest;
  quote_option?: QuoteOption;
}

// ─── Form input types ──────────────────────────────────────────────────────────

export interface SupplierApplicationFormData {
  business_name: string;
  contact_name: string;
  phone: string;
  email: string;
  city: string;
  service_categories: ServiceType[];
  price_range_min: string;
  price_range_max: string;
  description: string;
  instagram_url: string;
  website_url: string;
  years_experience: string;
}

// ─── Labels / display helpers ──────────────────────────────────────────────────

export const SERVICE_LABELS: Record<ServiceType, string> = {
  decoracion: "Decoración",
  recreacionista: "Recreacionista",
  pastel: "Pastel",
  pasabocas_ninos: "Pasabocas para niños",
  picadas_adultos: "Picadas para adultos",
  mobiliario: "Mobiliario",
  fotografo: "Fotógrafo",
  souvenirs: "Souvenirs",
};

export const SERVICE_ICONS: Record<ServiceType, string> = {
  decoracion: "🎈",
  recreacionista: "🎪",
  pastel: "🎂",
  pasabocas_ninos: "🍿",
  picadas_adultos: "🧀",
  mobiliario: "🪑",
  fotografo: "📷",
  souvenirs: "🎁",
};

export const SERVICE_DESCRIPTIONS: Record<ServiceType, string> = {
  decoracion: "Globos, centros de mesa, backdrop y ambientación",
  recreacionista: "Show, juegos y animación para los niños",
  pastel: "Torta personalizada para el evento",
  pasabocas_ninos: "Snacks y bebidas para los niños (~$8.000/niño)",
  picadas_adultos: "Picadas y bebidas para adultos (~$17.000/adulto)",
  mobiliario: "Sillas, mesas y manteles (~$9.000/persona)",
  fotografo: "Cobertura fotográfica profesional del evento",
  souvenirs: "Recuerdos personalizados para los invitados (~$7.000/niño)",
};

export const VENUE_LABELS: Record<VenueType, string> = {
  salon_social: "Salón social",
  casa: "Casa",
  finca: "Finca",
  restaurante: "Restaurante",
  otro: "Otro",
};

export const EVENT_TYPES = [
  "Cumpleaños infantil",
  "Baby shower",
  "Bautizo",
  "Primera comunión",
  "Reunión familiar",
  "Grado",
  "Quinceañera",
  "Matrimonio íntimo",
  "Otro",
];

export const CITIES = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Pereira",
  "Manizales",
  "Ibagué",
  "Santa Marta",
];
