import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
  email: z.string().trim().email("Correo inválido").max(255, "Máximo 255 caracteres"),
  asunto: z.string().max(100).optional(),
  mensaje: z.string().trim().min(1, "El mensaje es obligatorio").max(2000, "Máximo 2000 caracteres"),
});

const ASUNTOS = ["Pedido especial", "Información de precios", "Evento o catering", "Otro"];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert([parsed.data]);
    setLoading(false);

    if (insertError) {
      setError("No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.");
      return;
    }

    setSubmitted(true);
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contacto" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-lime/15 px-4 py-1.5 text-sm font-medium text-forest">
            <Send className="h-4 w-4" />
            Escríbenos
          </div>
          <span className="font-script mt-3 block text-2xl text-primary">Hablemos</span>
          <h2
            className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Contáctanos
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-lg text-muted-foreground">
            Respondemos en menos de 24 horas. ¡Con gusto te atendemos!
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm sm:p-8">
              <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                Envíanos un mensaje
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Cuéntanos qué necesitas y te respondemos cuanto antes.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-primary" />
                  <h4 className="mt-4 text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    ¡Mensaje enviado!
                  </h4>
                  <p className="mt-2 text-muted-foreground">
                    Te contactaremos pronto. Gracias por escribirnos.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="nombre" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      required
                      maxLength={100}
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="mt-1.5 block w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      maxLength={255}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 block w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="asunto" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Asunto
                    </label>
                    <select
                      id="asunto"
                      value={formData.asunto}
                      onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                      className="mt-1.5 block w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Selecciona un asunto</option>
                      {ASUNTOS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mensaje" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      required
                      rows={4}
                      maxLength={2000}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="mt-1.5 block w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm sm:p-8">
              <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                ¿Dónde encontrarnos?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Estamos en el corazón de Neiva, Huila. Ven a visitarnos y disfruta una bebida fresca.
              </p>

              <div className="mt-6 space-y-4">
                <InfoRow icon={<MapPin className="h-5 w-5 text-white" strokeWidth={2.5} />} label="Dirección" value="Av. Pastrana Borrero con Cra 1a, Neiva, Huila" />
                <InfoRow icon={<Phone className="h-5 w-5 text-white" strokeWidth={2.5} />} label="Teléfono" value="+57 321 255 9191" href="https://wa.me/573212559191" />
                <InfoRow icon={<Mail className="h-5 w-5 text-white" strokeWidth={2.5} />} label="Email" value="u20242228492@usco.edu.co" href="mailto:u20242228492@usco.edu.co" />
                <InfoRow icon={<Clock className="h-5 w-5 text-white" strokeWidth={2.5} />} label="Horario" value="Lunes a Sábado: 8:00 am – 8:00 pm" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm">
              <iframe
                title="Ubicación Refrescante Neiva"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24280.910274402948!2d-75.33457028810122!3d2.9419992000000073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b74f438bb0299%3A0x3d63073da14eebf7!2sUniversidad%20Surcolombiana%20-%20Sede%20Central!5e1!3m2!1ses-419!2sco!4v1777291119535!5m2!1ses-419!2sco"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest shadow-md">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground break-words">{value}</p>
      </div>
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="-mx-2 flex items-start gap-4 rounded-xl px-2 py-2 transition-colors hover:bg-accent/40"
      >
        {content}
      </a>
    );
  }
  return <div className="flex items-start gap-4 py-2">{content}</div>;
}
