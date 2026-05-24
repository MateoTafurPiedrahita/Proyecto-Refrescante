import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProductCatalog } from "@/components/ProductCatalog";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Refrescante — Bebidas Naturales en Neiva" },
      { name: "description", content: "Refrescante: limonadas artesanales, jugos tropicales y cócteles sin alcohol en Neiva. Bebidas naturales hechas con ingredientes frescos del Huila desde $3.500 COP." },
      { property: "og:title", content: "Refrescante — Bebidas Naturales en Neiva" },
      { property: "og:description", content: "Limonadas artesanales, jugos tropicales y cócteles sin alcohol en Neiva. Frescura natural en cada sorbo." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <ProductCatalog />
      <Contact />
    </main>
  );
}

