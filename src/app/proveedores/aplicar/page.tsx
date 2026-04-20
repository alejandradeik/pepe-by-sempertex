"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICE_LABELS, CITIES, type ServiceType } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle, Store } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const ALL_SERVICES = Object.entries(SERVICE_LABELS) as [ServiceType, string][];

export default function AplicarProveedorPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [description, setDescription] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [experience, setExperience] = useState("");

  function toggleService(s: ServiceType) {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setError("Selecciona al menos un tipo de servicio.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase.from("supplier_profiles").insert({
      business_name: businessName,
      contact_name: contactName,
      phone,
      email,
      city,
      service_categories: selectedServices,
      price_range_min: parseInt(priceMin.replace(/\D/g, "")) || 0,
      price_range_max: parseInt(priceMax.replace(/\D/g, "")) || 0,
      description,
      instagram_url: instagram || null,
      website_url: website || null,
      years_experience: parseInt(experience) || 0,
      status: "pending",
    });

    setLoading(false);

    if (dbError) {
      setError("Hubo un error al enviar tu solicitud. Intenta de nuevo.");
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20 bg-gray-50">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 gradient-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">¡Solicitud enviada!</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Recibimos tu información. Nuestro equipo revisará tu perfil y te contactará
              en los próximos 2-3 días hábiles para activar tu cuenta en la plataforma.
            </p>
            <p className="text-sm text-brand-600 font-medium">
              Revisaremos: <strong>{businessName}</strong>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Únete a pepe by Sempertex como proveedor</h1>
          <p className="text-brand-100 text-lg">
            Llega a cientos de familias colombianas buscando proveedores como tú.
            Sin comisiones en esta etapa de lanzamiento.
          </p>
        </div>
      </section>

      <div className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col gap-7">

            {/* Section 1 */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-brand text-white text-xs flex items-center justify-center font-bold">1</span>
                Información del negocio
              </h2>
              <div className="flex flex-col gap-4">
                <Input
                  label="Nombre del negocio *"
                  placeholder="Ej: Magia en Globos"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
                <Input
                  label="Nombre del contacto *"
                  placeholder="Tu nombre completo"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Teléfono / WhatsApp *"
                    type="tel"
                    placeholder="300 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Input
                    label="Correo electrónico *"
                    type="email"
                    placeholder="tu@negocio.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Select
                  label="Ciudad *"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option value="">Selecciona tu ciudad</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-brand text-white text-xs flex items-center justify-center font-bold">2</span>
                Tipo de servicio *
              </h2>
              <p className="text-xs text-gray-500 mb-4 ml-8">Selecciona todos los servicios que ofreces</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_SERVICES.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleService(value)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left",
                      selectedServices.includes(value)
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-brand-300"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-brand text-white text-xs flex items-center justify-center font-bold">3</span>
                Precios y experiencia
              </h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Precio mínimo (COP) *"
                    type="text"
                    inputMode="numeric"
                    placeholder="Ej: 150.000"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    required
                    hint="Tu servicio más básico"
                  />
                  <Input
                    label="Precio máximo (COP) *"
                    type="text"
                    inputMode="numeric"
                    placeholder="Ej: 600.000"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    required
                    hint="Tu paquete premium"
                  />
                </div>
                <Input
                  label="Años de experiencia *"
                  type="number"
                  placeholder="Ej: 3"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  min={0}
                  required
                />
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-brand text-white text-xs flex items-center justify-center font-bold">4</span>
                Descripción y presencia digital
              </h2>
              <div className="flex flex-col gap-4">
                <Textarea
                  label="Descripción del servicio *"
                  placeholder="Cuéntanos qué ofreces, para qué tipos de evento, qué te diferencia…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Input
                  label="Instagram"
                  placeholder="@tunegocio"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  hint="Opcional"
                />
                <Input
                  label="Página web"
                  placeholder="https://tunegocio.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  hint="Opcional"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" loading={loading} className="w-full">
              Enviar solicitud
            </Button>

            <p className="text-center text-xs text-gray-400">
              Tu solicitud será revisada por nuestro equipo. Te contactaremos en 2-3 días hábiles.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
