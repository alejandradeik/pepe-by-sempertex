// ─── Domain types mirroring the Supabase schema ───────────────────────────────

export type UserRole = "customer" | "supplier" | "admin";

export type VenueType =
  | "salon_social"
  | "casa"
  | "finca"
  | "restaurante"
  | "otro";

export type ServiceType =
  // Decoración
  | "decoracion"
  | "flores"
  | "arco_globos"
  // Entretenimiento
  | "recreacionista"
  | "dj_musica"
  | "personaje_tematico"
  | "show_infantil"
  | "pintucaritas"
  | "magia"
  // Fotografía y video
  | "fotografo"
  | "videografo"
  | "photobooth"
  // Comida y bebida
  | "pastel"
  | "mesa_dulces"
  | "pasabocas_ninos"
  | "picadas_adultos"
  | "catering_completo"
  | "bebidas"
  | "bartender"
  | "carrito_snacks"
  | "helados_postres"
  // Mobiliario y logística
  | "mobiliario"
  | "menaje"
  | "inflables"
  | "sonido"
  | "iluminacion"
  | "meseros"
  | "transporte"
  | "coordinador"
  // Recuerdos y detalles
  | "souvenirs"
  | "pinata"
  | "invitaciones"
  | "recordatorios_digitales"
  | "detalles_mesa"
  | "algodon_azucar"
  // Logística y producción
  | "seguridad"
  | "limpieza";

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
  // Decoración
  decoracion: "Decoración",
  flores: "Flores",
  arco_globos: "Arco de globos",
  // Entretenimiento
  recreacionista: "Recreacionista",
  dj_musica: "DJ / Animación musical",
  personaje_tematico: "Personaje temático",
  show_infantil: "Show infantil",
  pintucaritas: "Pintucaritas",
  magia: "Magia",
  // Fotografía y video
  fotografo: "Fotógrafo",
  videografo: "Videógrafo",
  photobooth: "Cabina de fotos",
  // Comida y bebida
  pastel: "Pastel",
  mesa_dulces: "Mesa de dulces",
  pasabocas_ninos: "Pasabocas para niños",
  picadas_adultos: "Picadas para adultos",
  catering_completo: "Catering completo",
  bebidas: "Bebidas",
  bartender: "Bartender",
  carrito_snacks: "Carrito de snacks",
  helados_postres: "Helados / Postres",
  // Mobiliario y logística
  mobiliario: "Mobiliario",
  menaje: "Menaje",
  inflables: "Inflables",
  sonido: "Sonido",
  iluminacion: "Iluminación",
  meseros: "Meseros",
  transporte: "Transporte",
  coordinador: "Coordinador de evento",
  // Recuerdos y detalles
  souvenirs: "Souvenirs",
  pinata: "Piñata",
  invitaciones: "Invitaciones",
  recordatorios_digitales: "Recordatorios digitales",
  detalles_mesa: "Detalles de mesa",
  algodon_azucar: "Algodón de azúcar",
  // Logística y producción
  seguridad: "Seguridad del evento",
  limpieza: "Limpieza posterior",
};

export const SERVICE_ICONS: Record<ServiceType, string> = {
  decoracion: "🎈",
  flores: "🌸",
  arco_globos: "🎪",
  recreacionista: "🤹",
  dj_musica: "🎧",
  personaje_tematico: "🦸",
  show_infantil: "🎭",
  pintucaritas: "🎨",
  magia: "🪄",
  fotografo: "📷",
  videografo: "🎬",
  photobooth: "🤳",
  pastel: "🎂",
  mesa_dulces: "🍭",
  pasabocas_ninos: "🍿",
  picadas_adultos: "🧀",
  catering_completo: "🍽️",
  bebidas: "🥤",
  bartender: "🍹",
  carrito_snacks: "🛒",
  helados_postres: "🍦",
  mobiliario: "🪑",
  menaje: "🍴",
  inflables: "🏰",
  sonido: "🔊",
  iluminacion: "💡",
  meseros: "🤵",
  transporte: "🚐",
  coordinador: "📋",
  souvenirs: "🎁",
  pinata: "🪅",
  invitaciones: "✉️",
  recordatorios_digitales: "📲",
  detalles_mesa: "🌿",
  algodon_azucar: "🍭",
  seguridad: "🛡️",
  limpieza: "🧹",
};

export const SERVICE_DESCRIPTIONS: Record<ServiceType, string> = {
  decoracion: "Globos, centros de mesa, backdrop y ambientación completa",
  flores: "Arreglos florales, coronas y centros con flores naturales",
  arco_globos: "Arco o columna de globos personalizados para la entrada",
  recreacionista: "Show, juegos y animación para niños (2-3 horas)",
  dj_musica: "DJ, equipo de sonido y animación musical para adultos",
  personaje_tematico: "Personaje disfrazado: Elmo, Bluey, Mickey, superhéroes...",
  show_infantil: "Show de magia, circo o títeres para los pequeños",
  pintucaritas: "Maquillaje artístico infantil y diseños faciales",
  magia: "Show de magia profesional para niños y adultos",
  fotografo: "Cobertura fotográfica profesional (3-5 horas)",
  videografo: "Video profesional del evento con edición incluida",
  photobooth: "Cabina fotográfica con props y álbum digital",
  pastel: "Torta personalizada para el evento",
  mesa_dulces: "Mesa de postres: cupcakes, macarons, chocolates y más",
  pasabocas_ninos: "Snacks y bebidas para los niños (~$8.000/niño)",
  picadas_adultos: "Picadas y bebidas para adultos (~$17.000/adulto)",
  catering_completo: "Menú completo: entrada, plato fuerte y postre",
  bebidas: "Surtido de bebidas frías y calientes para el evento",
  bartender: "Bartender con coctelería y bebidas para adultos",
  carrito_snacks: "Carrito de crispetas, algodón de azúcar o snacks",
  helados_postres: "Heladería o mesa de postres artesanales",
  mobiliario: "Sillas, mesas y manteles (~$9.000/persona)",
  menaje: "Vajilla, copas, cubiertos y mantelería completa",
  inflables: "Castillos, toboganes y juegos inflables para niños",
  sonido: "Equipo de sonido profesional con micrófonos y parlantes",
  iluminacion: "Luces LED, pistas de baile y efectos especiales",
  meseros: "Servicio de meseros para atención a los invitados",
  transporte: "Transporte de invitados o proveedores al lugar del evento",
  coordinador: "Coordinador logístico el día del evento",
  souvenirs: "Recuerdos personalizados para los invitados (~$7.000/niño)",
  pinata: "Piñata personalizada con dulces y rompimiento",
  invitaciones: "Invitaciones digitales o físicas personalizadas",
  recordatorios_digitales: "Recordatorio digital animado para enviar por WhatsApp",
  detalles_mesa: "Centros de mesa y detalles decorativos para cada puesto",
  algodon_azucar: "Máquina de algodón de azúcar, crispetas o palomitas",
  seguridad: "Personal de seguridad y control de acceso para el evento",
  limpieza: "Servicio de limpieza y desmontaje después del evento",
};

// ─── Service groups for the picker UI ─────────────────────────────────────────

export interface ServiceGroup {
  label: string;
  services: ServiceType[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    label: "Decoración",
    services: ["decoracion", "flores", "arco_globos"],
  },
  {
    label: "Entretenimiento",
    services: ["recreacionista", "dj_musica", "personaje_tematico", "show_infantil", "pintucaritas", "magia"],
  },
  {
    label: "Fotografía y video",
    services: ["fotografo", "videografo", "photobooth"],
  },
  {
    label: "Comida y bebida",
    services: ["pastel", "mesa_dulces", "pasabocas_ninos", "picadas_adultos", "catering_completo", "bebidas", "bartender", "carrito_snacks", "helados_postres"],
  },
  {
    label: "Mobiliario y logística",
    services: ["mobiliario", "menaje", "inflables", "sonido", "iluminacion", "meseros", "transporte", "coordinador"],
  },
  {
    label: "Recuerdos y detalles",
    services: ["souvenirs", "pinata", "invitaciones", "recordatorios_digitales", "detalles_mesa", "algodon_azucar"],
  },
  {
    label: "Logística y producción",
    services: ["seguridad", "limpieza"],
  },
];

export const VENUE_LABELS: Record<VenueType, string> = {
  salon_social: "Salón social",
  casa: "Casa",
  finca: "Finca",
  restaurante: "Restaurante",
  otro: "Otro",
};

// ─── Event types with groups ───────────────────────────────────────────────────

export interface EventTypeGroup {
  label: string;
  types: string[];
}

export const EVENT_TYPE_GROUPS: EventTypeGroup[] = [
  {
    label: "Infancia y familia",
    types: [
      "Cumpleaños infantil",
      "Baby shower",
      "Bautizo",
      "Primera comunión",
      "Revelación de género",
    ],
  },
  {
    label: "Jóvenes y adultos",
    types: [
      "Cumpleaños adulto",
      "Quinceañera",
      "Confirmación",
      "Grado",
      "Aniversario de pareja",
      "Despedida de soltera",
      "Despedida de soltero",
    ],
  },
  {
    label: "Reuniones y celebraciones",
    types: [
      "Reunión familiar",
      "Matrimonio íntimo",
      "Novena de aguinaldos",
      "Fiesta de fin de año",
      "Celebración por logro",
    ],
  },
  {
    label: "Corporativo",
    types: [
      "Reunión de equipo",
      "Lanzamiento de producto",
      "Cena empresarial",
      "Celebración corporativa",
    ],
  },
  {
    label: "Otro",
    types: ["Otro"],
  },
];

export const EVENT_TYPES = EVENT_TYPE_GROUPS.flatMap((g) => g.types);

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
