import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Refrescante Neiva" },
      { name: "description", content: "Contácta Refrescante en Neiva. Haz tu pedido por WhatsApp, envía un mensaje o visítanos. Bebidas naturales a tu alcance." },
      { property: "og:title", content: "Contacto — Refrescante Neiva" },
      { property: "og:description", content: "Haz tu pedido de bebidas refrescantes en Neiva. Contáctanos por WhatsApp o visítanos." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <main className="pt-8">
      <Contact />
    </main>
  );
}
