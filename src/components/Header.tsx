import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Droplets, User, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session, isAdmin, signOut } = useAuth();

  const navLinks = [
    { to: "/" as const, label: "Inicio" },
    { to: "/productos" as const, label: "Productos" },
    { to: "/servicios" as const, label: "Servicios" },
    { to: "/contacto" as const, label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <Droplets className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Refrescante
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-primary font-semibold" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                  <Shield className="h-4 w-4" /> Admin
                </Link>
              )}
              <Link to="/mi-cuenta" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                <User className="h-4 w-4" /> Mi cuenta
              </Link>
              <button onClick={signOut} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground" aria-label="Cerrar sesión">
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link to="/login" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                activeProps={{ className: "text-primary font-semibold" }}
                className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                    Panel admin
                  </Link>
                )}
                <Link to="/mi-cuenta" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                  Mi cuenta
                </Link>
                <button onClick={() => { signOut(); setMobileOpen(false); }} className="rounded-md px-3 py-2 text-left text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Iniciar sesión
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
