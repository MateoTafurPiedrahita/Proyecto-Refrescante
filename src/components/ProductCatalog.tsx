import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import lemonadeImg from "@/assets/lemonade.jpg";
import tropicalImg from "@/assets/tropical-juice.jpg";
import mocktailImg from "@/assets/mocktail.jpg";
import coconutImg from "@/assets/coconut.jpg";
import passionImg from "@/assets/passion-fruit.jpg";
import watermelonImg from "@/assets/watermelon.jpg";

const WHATSAPP = "573212559191";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Limonada Clásica",
    description:
      "La receta de siempre. Limón fresco, agua con gas y la cantidad exacta de azúcar para un equilibrio perfecto entre dulce y ácido.",
    price: "Desde $4.000",
    image: lemonadeImg,
    tag: "🍋 Clásico",
  },
  {
    id: 2,
    name: "Limonada de Coco",
    description:
      "Una combinación tropical irresistible. Jugo de limón mezclado con leche de coco cremosa. Refrescante y diferente.",
    price: "Desde $5.500",
    image: coconutImg,
    tag: "🥥 Especial",
  },
  {
    id: 3,
    name: "Jugo de Maracuyá",
    description:
      "Fruta tropical del Huila en su máxima expresión. Dulce, ácido y lleno de vitaminas. Cosechado fresco cada día.",
    price: "Desde $4.500",
    image: passionImg,
    tag: "🌟 Popular",
  },
  {
    id: 4,
    name: "Jugo de Mango",
    description:
      "Mango maduro del Huila licuado al instante. Espeso, dulce y sin una gota de agua añadida. Sabor puro y natural.",
    price: "Desde $4.500",
    image: tropicalImg,
    tag: "🥭 Tropical",
  },
  {
    id: 5,
    name: "Cóctel de Frutas",
    description:
      "Nuestra mezcla estrella. Combinamos tres frutas de temporada con hielo y una pizca de jengibre. Único en la ciudad.",
    price: "Desde $6.000",
    image: mocktailImg,
    tag: "🍹 Signature",
  },
  {
    id: 6,
    name: "Agua Saborizada",
    description:
      "Agua infusionada con frutas y hierbas frescas. Pepino con menta, fresa con albahaca o naranja con romero. Sin azúcar.",
    price: "Desde $3.500",
    image: watermelonImg,
    tag: "💧 Saludable",
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const whatsappMessage = encodeURIComponent(
    `Hola Refrescante! Quiero pedir: ${product.name}`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-amber px-3 py-1 text-xs font-bold text-amber-foreground shadow-sm">
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          className="text-lg font-bold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
            {product.price}
          </span>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-forest"
          >
            <MessageCircle className="h-4 w-4" />
            Pedir
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductCatalog() {
  return (
    <section id="productos" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-lime/15 px-4 py-1.5 text-sm font-medium text-forest">
            <ShoppingBag className="h-4 w-4" />
            Nuestro catálogo
          </div>
          <span className="font-script mt-3 block text-2xl text-primary">Lo que nos hace únicos</span>
          <h2
            className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nuestros <span className="text-primary">Productos</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-lg text-muted-foreground">
            Bebidas naturales hechas con frutas frescas del Huila. Precios desde $3.500 COP.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
