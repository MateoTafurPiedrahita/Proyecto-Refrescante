import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const stats = [
  { num: "+50", lbl: "Bebidas" },
  { num: "+5K", lbl: "Clientes felices" },
  { num: "5 ★", lbl: "Calificación" },
  { num: "5+", lbl: "Años de sabor" },
];

export function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-background py-16 sm:py-24">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-amber/10 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-script text-2xl text-forest">Quiénes somos</span>
          <h2
            className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pasión por cada{" "}
            <span className="inline-flex items-center gap-2 text-primary">
              bebida <Heart className="h-7 w-7 fill-primary text-primary" />
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-8 text-lg leading-8 text-muted-foreground">
            En Neiva hay pocos lugares donde encuentras bebidas de verdad. Nosotros somos ese lugar: preparamos cada bebida
            con ingredientes frescos, amor por el sabor y la atención que mereces.
          </p>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Desde limonadas artesanales hasta jugos tropicales, nuestro menú es el resultado de años de experiencia y
            ganas de que cada visita sea especial para ti y tu familia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
        >
          {stats.map((s) => (
            <div
              key={s.lbl}
              className="rounded-2xl border-2 border-forest/10 bg-white p-5 text-center shadow-sm transition-all hover:border-forest/30 hover:shadow-md"
            >
              <div
                className="text-4xl font-extrabold text-forest sm:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {s.num}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-foreground/70">
                {s.lbl}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
