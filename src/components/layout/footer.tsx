import Link from "next/link";
import { Sparkles } from "lucide-react";

const links = {
  plataforma: [
    { href: "/cotizar",           label: "Cotizar evento" },
    { href: "/#como-funciona",    label: "Cómo funciona" },
    { href: "/#eventos",          label: "Tipos de evento" },
    { href: "/proveedores/aplicar", label: "Ser proveedor" },
  ],
  cuenta: [
    { href: "/registro", label: "Crear cuenta" },
    { href: "/login",    label: "Iniciar sesión" },
    { href: "/dashboard", label: "Mi dashboard" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-footer text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-black text-white">pepe</span>
              <span className="text-xs font-semibold text-gray-400 leading-none">by Sempertex</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              La plataforma colombiana para planear fiestas y eventos familiares
              con proveedores verificados y cotizaciones personalizadas en minutos.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="flex -space-x-2">
                {["S", "M", "C"].map((l) => (
                  <div
                    key={l}
                    className="w-7 h-7 rounded-full gradient-brand border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                +500 familias ya planearon su evento
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Plataforma</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {links.plataforma.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Cuenta</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {links.cuenta.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} pepe by Sempertex — Bogotá, Colombia 🇨🇴</p>
          <p className="text-gray-700">Hecho con amor para las familias colombianas</p>
        </div>
      </div>
    </footer>
  );
}
