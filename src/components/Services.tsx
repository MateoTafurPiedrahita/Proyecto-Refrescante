import { motion } from "framer-motion";
import { Citrus, Apple, Wine, PartyPopper } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: <Citrus className="h-8 w-8 text-forest" strokeWidth={2.5} />,
    title: "Limonadas Artesanales",
    description:
      "Preparadas al momento con limón recién exprimido y el toque secreto de nuestra receta. ¡La más pedida!",
    tag: "⭐ Favorito",
    features: ["Sin conservantes", "Endulzadas con miel o panela", "Variedad de sabores"],
  },
  {
    icon: <Apple className="h-8 w-8 text-forest" strokeWidth={2.5} />,
    title: "Jugos Tropicales",
    description:
      "Maracuyá, mango, guanábana y más frutas del Huila, procesadas sin conservantes ni colorantes artificiales.",
    tag: "🌿 Natural",
    features: ["100% fruta natural", "Sin azúcar añadida", "Vasos grandes"],
  },
  {
    icon: <Wine className="h-8 w-8 text-forest" strokeWidth={2.5} />,
    title: "Cócteles Sin Alcohol",
    description:
      "Mezclas creativas con frutas frescas, hierbas aromáticas y mucho sabor para compartir en cualquier ocasión.",
    tag: "✨ Especial",
    features: ["Ideales para eventos", "Presentación premium", "Sabores únicos"],
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex items-start justify-between">
        <div className="inline-flex rounded-xl bg-white p-3 shadow-md ring-2 ring-forest/20">{service.icon}</div>
        <span className="rounded-full bg-amber px-3 py-1 text-xs font-bold text-amber-foreground">
          {service.tag}
        </span>
      </div>
      <h3
        className="mt-4 text-xl font-bold text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <ul className="mt-4 space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-lime/15 px-4 py-1.5 text-sm font-medium text-forest">
            <PartyPopper className="h-4 w-4" />
            Lo que ofrecemos
          </div>
          <span className="font-script mt-3 block text-2xl text-forest">Nuestros servicios</span>
          <h2
            className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Servicios hechos con{" "}
            <span className="text-forest">pasión</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-lg text-muted-foreground">
            Más que bebidas, ofrecemos experiencias refrescantes para cada ocasión.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
