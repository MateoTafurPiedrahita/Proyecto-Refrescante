import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, MessageSquare, Package, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Refrescante" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

interface Pedido {
  id: string;
  user_id: string;
  estado: string;
  total: number;
  direccion_entrega: string;
  telefono_contacto: string;
  created_at: string;
}

interface Mensaje {
  id: string;
  nombre: string;
  email: string;
  asunto: string | null;
  mensaje: string;
  created_at: string;
}

const ESTADOS = ["pendiente", "confirmado", "en_camino", "entregado", "cancelado"] as const;

function AdminPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast.error("No tienes permisos de administrador");
      navigate({ to: "/mi-cuenta" });
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    Promise.all([
      supabase.from("pedidos").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]).then(([p, m]) => {
      if (p.data) setPedidos(p.data as Pedido[]);
      if (m.data) setMensajes(m.data as Mensaje[]);
      setLoading(false);
    });
  }, [isAdmin]);

  async function updateEstado(id: string, estado: string) {
    const { error } = await supabase
      .from("pedidos")
      .update({ estado: estado as typeof ESTADOS[number] })
      .eq("id", id);
    if (error) {
      toast.error("Error: " + error.message);
      return;
    }
    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)));
    toast.success("Estado actualizado");
  }

  async function deleteMensaje(id: string) {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast.error("Error: " + error.message);
      return;
    }
    setMensajes((prev) => prev.filter((m) => m.id !== id));
    toast.success("Mensaje eliminado");
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Panel de administración</h1>
      </div>

      <section className="mb-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><Package className="h-5 w-5 text-primary" /> Pedidos ({pedidos.length})</h2>
        {pedidos.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Aún no hay pedidos.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2">ID</th><th>Fecha</th><th>Total</th><th>Dirección</th><th>Tel</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p) => (
                  <tr key={p.id} className="border-b border-border/50">
                    <td className="py-3 font-mono text-xs">#{p.id.slice(0, 8)}</td>
                    <td>{new Date(p.created_at).toLocaleDateString("es-CO")}</td>
                    <td className="font-semibold">${Number(p.total).toLocaleString("es-CO")}</td>
                    <td className="max-w-[200px] truncate">{p.direccion_entrega}</td>
                    <td>{p.telefono_contacto}</td>
                    <td>
                      <select
                        value={p.estado}
                        onChange={(e) => updateEstado(p.id, e.target.value)}
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                      >
                        {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><MessageSquare className="h-5 w-5 text-primary" /> Mensajes de contacto ({mensajes.length})</h2>
        {mensajes.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No hay mensajes.</p>
        ) : (
          <ul className="divide-y divide-border">
            {mensajes.map((m) => (
              <li key={m.id} className="py-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{m.nombre} <span className="font-normal text-muted-foreground">· {m.email}</span></p>
                    {m.asunto && <p className="text-sm font-medium">{m.asunto}</p>}
                    <p className="mt-1 text-sm text-muted-foreground">{m.mensaje}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("es-CO")}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => deleteMensaje(m.id)}>Eliminar</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}