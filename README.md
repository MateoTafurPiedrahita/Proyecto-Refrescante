# 🍋 Refrescante

> Jugos naturales y bebidas artesanales a domicilio en Neiva, Huila.

**Demo en vivo:** https://refrescante-neoba.lovable.app

---

## El problema

En Neiva no existe una forma fácil de pedir jugos naturales a domicilio. Las opciones son industriales, sin variedad, o simplemente no entregan a casa. **Refrescante** conecta a los clientes con bebidas frescas hechas con fruta local del Huila y entrega rápida.

---

## Para quién es

- Familias en Neiva que quieren bebidas saludables sin salir de casa.
- Personas que buscan opciones sin azúcar añadida ni conservantes.
- Empresas y eventos que necesitan bebidas para grupos.

---

## Features principales

| Feature | Estado |
|---|---|
| Catálogo con imágenes y precios | ✅ |
| Pedido por WhatsApp | ✅ |
| Registro / login (email + Google) | ✅ |
| Mi cuenta: perfil, dirección, historial | ✅ |
| Estados de pedido (pendiente → entregado) | ✅ |
| Panel admin: gestión de pedidos y mensajes | ✅ |
| Formulario de contacto público | ✅ |
| SEO básico (sitemap, meta tags por ruta) | ✅ |

---

## Stack

- **Frontend:** React 19 + Vite 7 + TypeScript + TanStack Router
- **Estilos:** Tailwind CSS v4 + shadcn/ui + Framer Motion
- **Backend / Auth / DB:** Lovable Cloud (PostgreSQL + RLS)
- **Deploy:** Lovable

---

## Modelo de datos

```
profiles         → nombre, teléfono, dirección del cliente
user_roles       → roles (admin / customer), separados para evitar escalación
pedidos          → estado, total, dirección, teléfono
pedido_items     → productos de cada pedido
contact_messages → mensajes del formulario público
```

Toda tabla tiene **Row Level Security (RLS)** activa. Los admins se validan con `has_role(auth.uid(), 'admin')` (SECURITY DEFINER, sin recursión).

---

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Landing page |
| `/productos` | Catálogo de bebidas |
| `/servicios` | Catering y eventos |
| `/contacto` | Formulario de contacto |
| `/login` · `/registro` | Autenticación |
| `/mi-cuenta` | Área del cliente (protegida) |
| `/admin` | Panel administrativo (solo rol `admin`) |

---

## Cómo correr local

```bash
# 1. Clonar
git clone <repo-url>
cd <repo>

# 2. Instalar dependencias
bun install

# 3. Variables de entorno (Lovable Cloud las provee automáticamente en el proyecto)
# Crear .env con:
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_PUBLISHABLE_KEY=...
# VITE_SUPABASE_PROJECT_ID=...

# 4. Levantar servidor de desarrollo
bun run dev
```

---

## Lo que aprendí

- Lovable Cloud acelera mucho el setup de auth + DB, pero tiene sus propias abstracciones que aprender.
- RLS con roles separados evita bugs de escalación de privilegios que son difíciles de debuggear.
- Integrar WhatsApp como canal de pedidos fue la decisión más pragmática para el contexto local.

---

## Qué viene después

- [ ] Sistema de pagos (PSE / Nequi)
- [ ] Notificaciones por WhatsApp al cambiar estado del pedido
- [ ] Geolocalización del repartidor en tiempo real
- [ ] Programa de referidos

