"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const isActive = (href: string) => pathname === href;

  const navLink =
    "text-sm font-medium transition-colors hover:text-brand-600";

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center shadow-brand-sm group-hover:shadow-brand transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black gradient-brand-text">pepe</span>
            <span className="text-xs font-semibold text-gray-400 leading-none">by Sempertex</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            <Link
              href="/#como-funciona"
              className={cn(navLink, "text-gray-500 hover:text-brand-600")}
            >
              Cómo funciona
            </Link>
            <Link
              href="/#eventos"
              className={cn(navLink, "text-gray-500 hover:text-brand-600")}
            >
              Eventos
            </Link>
            <Link
              href="/proveedores/aplicar"
              className={cn(navLink, "text-gray-500 hover:text-brand-600")}
            >
              Ser proveedor
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isActive("/dashboard") ? "text-brand-600" : ""}
                  >
                    Mi cuenta
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Salir
                </Button>
                <Link href="/cotizar">
                  <Button size="sm">Cotizar evento</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Iniciar sesión</Button>
                </Link>
                <Link href="/cotizar">
                  <Button size="sm">Cotizar evento</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-5 pt-3 flex flex-col gap-1 animate-fade-in">
          {[
            { href: "/#como-funciona", label: "Cómo funciona" },
            { href: "/#eventos", label: "Tipos de evento" },
            { href: "/proveedores/aplicar", label: "Ser proveedor" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-gray-700 px-3 py-2.5 rounded-xl hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Mi cuenta</Button>
                </Link>
                <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">Iniciar sesión</Button>
              </Link>
            )}
            <Link href="/cotizar" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full">Cotizar evento</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
