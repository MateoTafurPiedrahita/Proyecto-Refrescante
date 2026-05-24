import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, User, Package, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/mi-cuenta")({
  head: () => ({
    meta: [
      { title: "Mi cuenta — Refrescante" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MiCuenta,
});

interface Profile {
  nombre_completo: string | null;
  telefono: string | null;
  direccion: string | null;
}

interface Pedido {
  id: string;
  estado: string;
  total: number;
  direccion_entrega: string;
  created_at: string;
}

function MiCuenta() {
  const { user, isAdmin, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>({ nombre_completo: "", telefono: "", direccion: "" });
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("profiles").select("nombre_completo, telefono, direccion").eq("id", user.id).maybeSingle(),
      supabase.from("pedidos").select("id, estado, total, direccion_entrega, created_at").order("created_at", { ascending: false }),
    ]).then(([p, pd]) => {
      if (p.data) setProfile(p.data);
      if (pd.data) setPedidos(pd.data);
      setLoading(false);
    });
  }, [user]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...profile }, { onConflict: "id" });
    setSaving(false);
    if (error) {
      toast.error("No se pudo guardar: " + error.message);
      return;
    }
    toast.success("Perfil actualizado");
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Mi cuenta</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button asChild variant="outline">
              <Link to="/admin">Panel admin</Link>
            </Button>
          )}
          <Button variant="ghost" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Salir
          </Button>
        </div>
      </div>

      <section className="mb-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><User className="h-5 w-5 text-primary" /> Datos personales</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input id="nombre" value={profile.nombre_completo ?? ""} onChange={(e) => setProfile({ ...profile, nombre_completo: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tel">Teléfono</Label>
            <Input id="tel" type="tel" value={profile.telefono ?? ""} onChange={(e) => setProfile({ ...profile, telefono: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dir">Dirección de entrega</Label>
            <Textarea id="dir" value={profile.direccion ?? ""} onChange={(e) => setProfile({ ...profile, direccion: e.target.value })} />
          </div>
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Guardar cambios
          </Button>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><Package className="h-5 w-5 text-primary" /> Mis pedidos</h2>
        {pedidos.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            <p>Aún no tienes pedidos.</p>
            <Button asChild variant="link"><Link to="/productos">Ver productos</Link></Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {pedidos.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">#{p.id.slice(0, 8)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString("es-CO")} · {p.direccion_entrega}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${Number(p.total).toLocaleString("es-CO")}</p>
                  <span className="text-xs uppercase text-muted-foreground">{p.estado}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}