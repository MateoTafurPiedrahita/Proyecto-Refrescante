import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Refrescante Neiva" },
      { name: "description", content: "Servicios de Refrescante: limonadas artesanales, jugos tropicales, cócteles sin alcohol y catering para eventos en Neiva." },
      { property: "og:title", content: "Servicios — Refrescante Neiva" },
      { property: "og:description", content: "Conoce nuestros servicios: limonadas artesanales, jugos tropicales, cócteles sin alcohol y catering para eventos." },
    ],
  }),
  component: ServiciosPage,
});

function ServiciosPage() {
  return (
    <main className="pt-8">
      <Services />
      <Contact />
    </main>
  );
}
