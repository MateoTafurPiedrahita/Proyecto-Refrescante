import { Link } from "@tanstack/react-router";
import { Droplets, Instagram, Phone, MapPin, Mail, Facebook, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-forest text-forest-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-7 w-7 text-lime" />
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Refrescante 🍋
              </span>
            </div>
            <p className="text-sm text-forest-foreground/80">
              La tienda de bebidas más querida de Neiva. Frescura, calidad y sabor en cada visita. ¡Te esperamos!
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime" style={{ fontFamily: "var(--font-heading)" }}>
              Menú
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-forest-foreground/80 transition-colors hover:text-lime">Inicio</Link></li>
              <li><a href="/#nosotros" className="text-sm text-forest-foreground/80 transition-colors hover:text-lime">Nosotros</a></li>
              <li><Link to="/servicios" className="text-sm text-forest-foreground/80 transition-colors hover:text-lime">Servicios</Link></li>
              <li><Link to="/productos" className="text-sm text-forest-foreground/80 transition-colors hover:text-lime">Productos</Link></li>
              <li><Link to="/contacto" className="text-sm text-forest-foreground/80 transition-colors hover:text-lime">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime" style={{ fontFamily: "var(--font-heading)" }}>
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-forest-foreground/80">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span className="break-all">u20242228492@usco.edu.co</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-lime" />
                <span>+57 321 255 9191</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span>Av. Pastrana Borrero con Cra 1a, Neiva, Huila</span>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime" style={{ fontFamily: "var(--font-heading)" }}>
              Redes sociales
            </h4>
            <ul className="space-y-2 text-sm text-forest-foreground/80">
              <li><a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-lime"><Facebook className="h-4 w-4" /> Facebook</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-lime"><Instagram className="h-4 w-4" /> Instagram</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-lime"><Music2 className="h-4 w-4" /> TikTok</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-forest-foreground/10 pt-6 text-center text-xs text-forest-foreground/80">
          &copy; <span className="text-lime">Refrescante</span> 2026 — Todos los derechos reservados. Hecho con amor en Neiva, Huila.
        </div>
      </div>
    </footer>
  );
}
