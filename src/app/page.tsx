import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "+500", label: "Eventos organizados" },
  { value: "40+",  label: "Proveedores verificados" },
  { value: "10",   label: "Ciudades en Colombia" },
  { value: "4.8★", label: "Calificación promedio" },
];

const steps = [
  {
    number: "01",
    icon: "🎯",
    title: "Cuéntanos tu evento",
    desc: "Completa el formulario: tipo de evento, presupuesto, ciudad y servicios que necesitas. Toma menos de 3 minutos.",
  },
  {
    number: "02",
    icon: "⚡",
    title: "Recibe 3 cotizaciones",
    desc: "Nuestra plataforma analiza proveedores verificados y te entrega opciones económica, balanceada y premium.",
  },
  {
    number: "03",
    icon: "🎉",
    title: "Elige y disfruta",
    desc: "Compara las opciones, guarda tu favorita y contacta a los proveedores. Nosotros conectamos, tú celebras.",
  },
];

const eventTypes = [
  { emoji: "🎂", label: "Cumpleaños infantiles", desc: "La fiesta perfecta para los más pequeños", color: "from-violet-50 to-purple-50 border-violet-100" },
  { emoji: "🍼", label: "Baby showers",          desc: "Celebra la llegada del nuevo integrante",  color: "from-rose-50 to-pink-50 border-rose-100" },
  { emoji: "✝️", label: "Bautizos",              desc: "Un momento sagrado e inolvidable",          color: "from-blue-50 to-indigo-50 border-blue-100" },
  { emoji: "🌟", label: "Primeras comuniones",    desc: "Un hito especial en la vida de tu hijo/a", color: "from-amber-50 to-yellow-50 border-amber-100" },
  { emoji: "🏡", label: "Reuniones familiares",   desc: "El espacio ideal para compartir juntos",    color: "from-green-50 to-emerald-50 border-green-100" },
];

const benefits = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Cotiza en 3 minutos",
    desc: "Sin llamadas, sin esperas. Completa el formulario y recibe opciones reales al instante.",
    color: "bg-violet-100 text-brand-600",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Proveedores verificados",
    desc: "Cada proveedor pasa por revisión manual antes de aparecer. Sin sorpresas el día del evento.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "100% colombiano",
    desc: "Precios en COP, proveedores locales y eventos adaptados a la cultura familiar colombiana.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Tres opciones siempre",
    desc: "Económica, balanceada y premium. Tú eliges según tu presupuesto y tus expectativas.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Calificaciones reales",
    desc: "Cada proveedor tiene reseñas de clientes reales para que tomes la mejor decisión.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Cotizaciones guardadas",
    desc: "Crea una cuenta gratuita y accede a tus cotizaciones cuando quieras, desde cualquier dispositivo.",
    color: "bg-purple-100 text-purple-600",
  },
];

const testimonials = [
  {
    name: "María Fernanda Ospina",
    initials: "MF",
    city: "Bogotá",
    event: "Cumpleaños de 2 años · temática Elmo",
    text: "¡Increíble! En menos de 5 minutos tenía 3 opciones para la fiesta de mi hija. El recreacionista que contraté fue el hit de la tarde. 100% recomendado.",
    rating: 5,
    color: "from-violet-400 to-purple-500",
  },
  {
    name: "Carolina Restrepo",
    initials: "CR",
    city: "Medellín",
    event: "Baby shower",
    text: "Organicé el baby shower de mi hermana con pepe by Sempertex y quedó perfecto. Los precios son súper justos y los proveedores muy profesionales y puntuales.",
    rating: 5,
    color: "from-rose-400 to-pink-500",
  },
  {
    name: "Jimena Torres",
    initials: "JT",
    city: "Cali",
    event: "Primera comunión",
    text: "Me ahorró muchísimo tiempo. Antes llamaba a 10 personas distintas. Con pepe by Sempertex elegí la opción balanceada y el evento fue una experiencia hermosa.",
    rating: 5,
    color: "from-amber-400 to-orange-500",
  },
];

const faqs = [
  {
    q: "¿Es gratis usar pepe by Sempertex?",
    a: "Sí, cotizar y comparar opciones es completamente gratuito para los clientes. Solo pagas directamente a los proveedores que elijas contratar.",
  },
  {
    q: "¿Cómo se calculan los precios?",
    a: "Los precios se calculan según los servicios que solicitas, el número de invitados y tu ciudad. Servicios como pasabocas y picadas se cotizan por persona, mientras que decoración y fotografía tienen tarifa fija.",
  },
  {
    q: "¿Puedo guardar mis cotizaciones?",
    a: "Sí. Al crear una cuenta gratuita puedes guardar todas tus cotizaciones y acceder a ellas cuando quieras desde tu dashboard personal.",
  },
  {
    q: "¿En qué ciudades está disponible?",
    a: "Cubrimos Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga, Pereira, Manizales y más. Estamos expandiendo constantemente.",
  },
  {
    q: "¿Puedo modificar o regenerar mi cotización?",
    a: "Sí. Desde la página de resultados puedes volver al formulario, ajustar los servicios o el presupuesto y generar nuevas opciones.",
  },
  {
    q: "¿Los proveedores son confiables?",
    a: "Todos los proveedores pasan por revisión manual de nuestro equipo antes de ser activados. También mostramos calificaciones reales de clientes anteriores.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden gradient-hero text-white">
        {/* Mesh background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-rose-500/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-28 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium mb-8 text-white/90">
            <Sparkles size={13} className="text-amber-300" />
            La plataforma de eventos más querida de Colombia
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Planea el evento
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300">
              perfecto, sin estrés
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Dinos qué necesitas y en minutos tienes{" "}
            <span className="text-white font-semibold">3 cotizaciones personalizadas</span>{" "}
            con proveedores verificados en Colombia.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link href="/cotizar">
              <Button
                size="lg"
                variant="white"
                className="font-bold w-full sm:w-auto group"
              >
                Cotiza tu evento gratis
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/proveedores/aplicar">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Quiero ser proveedor
              </Button>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/60">
            {[
              "Sin costo para cotizar",
              "Proveedores verificados",
              "Resultados en minutos",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-emerald-400" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-white/50 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <ChevronDown size={22} />
        </div>
      </section>

      {/* ─── Cómo funciona ─────────────────────────────────────────────── */}
      <section id="como-funciona" className="section bg-white">
        <div className="container-content">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-3">Proceso</p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              En 3 pasos,{" "}
              <span className="gradient-brand-text">listo</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Sin llamadas, sin esperas. Tu cotización personalizada en minutos.
            </p>
          </div>

          {/* Steps with connectors */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connector lines — desktop only */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px">
              <div className="h-px w-full bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300" />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl border border-gray-100 shadow-card p-8 hover:shadow-card-md hover:-translate-y-1 transition-all duration-200 text-center"
              >
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 gradient-brand rounded-full flex items-center justify-center text-white text-xs font-black shadow-brand-sm">
                  {i + 1}
                </div>

                <div className="text-5xl mb-5 mt-2">{step.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/cotizar">
              <Button size="lg">
                Empezar ahora — es gratis
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Tipos de evento ───────────────────────────────────────────── */}
      <section id="eventos" className="section bg-gradient-subtle">
        <div className="container-content">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-3">Eventos</p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Para cada{" "}
              <span className="gradient-brand-text">momento especial</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Organizamos todo tipo de celebraciones familiares en Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventTypes.map((evt) => (
              <Link
                key={evt.label}
                href="/cotizar"
                className={`group bg-gradient-to-br ${evt.color} rounded-3xl border p-7 hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200`}
              >
                <div className="text-4xl mb-4">{evt.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-700 transition-colors">
                  {evt.label}
                </h3>
                <p className="text-sm text-gray-500">{evt.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-brand-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Cotizar ahora <ArrowRight size={14} />
                </div>
              </Link>
            ))}

            <Link
              href="/cotizar"
              className="group gradient-brand rounded-3xl p-7 text-white hover:shadow-brand hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-4xl mb-4">🎊</div>
              <h3 className="font-bold mb-1">¿Otro evento?</h3>
              <p className="text-sm text-white/70">
                Cuéntanos qué necesitas y lo hacemos posible en Colombia.
              </p>
              <div className="mt-4 flex items-center gap-1 text-white/80 text-sm font-semibold group-hover:text-white transition-colors">
                Cotizar ahora <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Beneficios ────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-content">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-3">Por qué pepe by Sempertex</p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Todo lo que necesitas,{" "}
              <br className="hidden sm:block" />
              <span className="gradient-brand-text">en un solo lugar</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-card-md transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${b.color}`}>
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{b.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonios ───────────────────────────────────────────────── */}
      <section className="section gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="relative container-content">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Testimonios</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-3">
              Lo que dicen nuestras{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300">
                familias
              </span>
            </h2>
            <p className="text-white/50 text-lg">Más de 500 eventos organizados en Colombia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-3xl p-7 flex flex-col gap-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-white/80 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-white/40">{t.event} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Preguntas{" "}
              <span className="gradient-brand-text">frecuentes</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-100 rounded-2xl bg-gray-50 overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-gray-900 text-sm hover:bg-brand-50 transition-colors">
                  {faq.q}
                  <ChevronDown
                    size={16}
                    className="text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200"
                  />
                </summary>
                <div className="px-6 pb-5 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA final ─────────────────────────────────────────────────── */}
      <section className="section bg-gradient-subtle">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <Sparkles size={13} />
            Totalmente gratis para empezar
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            ¿Listo para organizar tu{" "}
            <span className="gradient-brand-text">evento soñado?</span>
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Más de 500 familias colombianas ya confiaron en pepe by Sempertex.
            Únete en menos de 5 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/cotizar">
              <Button size="lg">
                Cotizar mi evento gratis
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/registro">
              <Button size="lg" variant="outline">
                Crear cuenta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
