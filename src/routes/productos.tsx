import { createFileRoute } from "@tanstack/react-router";
import { ProductCatalog } from "@/components/ProductCatalog";

export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Productos — Refrescante Neiva" },
      { name: "description", content: "Catálogo de bebidas refrescantes: limonadas, jugos tropicales y cócteles sin alcohol. Hechos en Neiva con ingredientes naturales." },
      { property: "og:title", content: "Productos — Refrescante Neiva" },
      { property: "og:description", content: "Descubre nuestras limonadas, jugos tropicales y cócteles sin alcohol. Frescura artesanal en Neiva." },
    ],
  }),
  component: ProductosPage,
});

function ProductosPage() {
  return (
    <main className="pt-8">
      <ProductCatalog />
    </main>
  );
}
