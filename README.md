# Refrescante

Jugos naturales y bebidas refrescantes a domicilio en Neiva, Huila. Catálogo, pedidos en línea y panel administrativo.

## Demo
https://id-preview--9ebcf5df-f589-4e61-9803-5a37f5ab4296.lovable.app

## Problema
En Neiva, conseguir jugos naturales recién preparados a domicilio es difícil: las opciones existentes son industriales o no entregan a casa. Refrescante conecta a clientes con bebidas frescas hechas con fruta local y entrega rápida.

## Features
- Catálogo de productos con imágenes y precios
- Registro / login con email + Google
- Mi cuenta: perfil, dirección de entrega e historial de pedidos
- Pedidos con estados (pendiente → confirmado → en camino → entregado)
- Panel admin: gestión de pedidos y mensajes de contacto
- Formulario de contacto público
- SEO básico: sitemap.xml, robots.txt, meta tags por ruta

## Stack
- TanStack Start (React 19 + Vite 7) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Lovable Cloud (auth, base de datos PostgreSQL, RLS)
- Deploy en Lovable

## Cómo correr local
1. Clonar el repo
   ```bash
   git clone <repo-url>
   cd <repo>
   ```
2. Instalar dependencias
   ```bash
   bun install
   ```
3. Copiar variables de entorno (las provee Lovable Cloud automáticamente en el proyecto):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
4. Levantar dev server
   ```bash
   bun run dev
   ```

## Modelo de datos
- `profiles` — datos del cliente (nombre, teléfono, dirección)
- `user_roles` — roles (`admin` / `customer`) en tabla aparte para evitar escalación de privilegios
- `pedidos` — pedidos con estado, total, dirección y teléfono
- `pedido_items` — productos de cada pedido
- `contact_messages` — mensajes del formulario público

Toda tabla tiene RLS activa. Los admins se validan con la función `has_role(auth.uid(), 'admin')` (SECURITY DEFINER, sin recursión).

## Rutas principales
- `/` — landing
- `/productos` — catálogo
- `/servicios` — servicios de catering / eventos
- `/contacto` — formulario de contacto
- `/login` · `/registro` — autenticación
- `/mi-cuenta` — área del cliente (protegida)
- `/admin` — panel administrativo (solo rol `admin`)

## Plan de 30 días post-launch
- **Semana 1**: 5 clientes reales hacen pedido, anotar toda fricción.
- **Semana 2**: arreglar los 3 bugs más críticos, sin agregar features.
- **Semana 3**: 1 feature nueva pedida por usuarios (no la que yo quiero).
- **Semana 4**: contar en público lo aprendido.
- **Mes 2**: decidir seguir, pivotar o cerrar.

## Licencia
MIT
