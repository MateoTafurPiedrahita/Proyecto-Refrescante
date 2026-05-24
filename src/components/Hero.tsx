import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-24 lg:py-32">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-lime/20 blur-3xl" />
        <div className="absolute top-40 -left-20 h-60 w-60 rounded-full bg-amber/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-lime/15 px-4 py-1.5 text-sm font-medium text-forest"
            >
              <Sparkles className="h-4 w-4" />
              Bebidas 100% naturales en Neiva
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-script mt-5 block text-3xl text-primary"
            >
              Bienvenidos a
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="mt-1 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              La Mejor Tienda de{" "}
              <span className="text-primary">Bebidas</span> de{" "}
              <span className="text-amber">Neiva</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              Frescura, sabor y calidad en cada sorbo. Limonadas artesanales, jugos tropicales del Huila y cócteles sin alcohol hechos con ingredientes frescos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/productos"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                Ver productos
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/10 bg-transparent px-7 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-foreground/5"
              >
                Hacer pedido
              </Link>
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative h-72 w-72 rounded-3xl bg-gradient-to-br from-lime/30 to-amber/30 p-2 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-lime to-amber text-6xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  🍋
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 rounded-2xl bg-white px-4 py-2 shadow-lg">
                <p className="text-sm font-semibold text-forest">Natural</p>
              </div>
              <div className="absolute -right-4 bottom-8 rounded-2xl bg-white px-4 py-2 shadow-lg">
                <p className="text-sm font-semibold text-amber">Sin azúcar añadida</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
