# Plan de Refactor — Alqantar

> Documento de trabajo. Define **qué** se cambia, **por qué**, y **en qué orden**.
> Autor: revisión de ingeniería + diseño de interfaces.
> Fecha: 2026-08-20 · Base: commit `388fa0a`

---

## 1. Contexto y objetivo

Alqantar es un sitio brochure para un condominio en Villa Warcalde, Córdoba. Su
trabajo es uno solo: **que un comprador potencial entienda el producto, lo desee, y
sepa cómo seguir**.

La base técnica es buena. El pipeline de imágenes (`ProgressiveImage` + LQIP +
`srcset`) está por encima del promedio de este tipo de sitios, el code-splitting por
ruta está bien hecho y no hay deuda de infraestructura.

El problema no es la infraestructura: es que **la capa de producto está a medio
construir**. Hay páginas sin salida, navegación que no llega a un tercio del sitio,
un sistema visual que nunca se definió (y por eso cada componente inventó el suyo), y
varias piezas de código muerto o duplicado que hacen que cada cambio cueste más de lo
que debería.

Este refactor tiene tres objetivos, en este orden de prioridad:

1. **Coherencia visual** — que el sitio se lea como un producto premium diseñado por
   una sola persona, no como seis pantallas hechas en seis momentos distintos.
2. **Mantenibilidad** — que agregar una torre, una tipología o una página sea
   editar datos, no copiar componentes.
3. **Accesibilidad y alcance** — que el sitio sea usable con teclado y lector de
   pantalla, y que exista para Google y para WhatsApp.

**No** es objetivo de este refactor agregar funcionalidad nueva de negocio
(formularios de lead, chat, quiz, unidades interactivas). Eso queda documentado en
§9 como trabajo posterior, sobre una base ya sana.

---

## 2. Diagnóstico

Todo lo de esta sección fue verificado sobre el código, no inferido.

### 2.1 Bugs y defectos funcionales

| # | Hallazgo | Ubicación | Severidad |
|---|---|---|---|
| B1 | **Doble `<Header>`**: la página monta un Header propio además del de `Layout`. Se renderizan dos headers superpuestos. | `src/pages/AmenitiesPage.jsx:19,125` | Alta |
| B2 | **Un tercio del sitio es inalcanzable desde la navegación**: `/avances`, `/masterplan` y `/360` no están en el header. Solo se llega por las cards de la home o el footer. `/masterplan` no está ni en el footer. | `src/components/Header.jsx:66-76` | Alta |
| B3 | **`TowerNavigation` pinta campos que no existen**: renderiza `option.icon` y `option.description`, pero `TOWERS` solo tiene `id` y `name`. Resultado: dos `<span>` vacíos por botón ocupando espacio vertical. | `src/components/TowerNavigation.jsx:3-6,57-59` | Media |
| B4 | **Imagen repetida 6 veces** en el carrusel de Tipología 2 (`25.webp` en las vistas 25 a 30). El usuario ve la misma foto seis veces seguidas. | `src/utils/apartmentData.js:87-92` | Media |
| B5 | **Datos contradictorios de superficie**: la descripción dice "superficie propia de 175 m²" y la ficha dice 275 m². Tipología 2: 210 m² vs 320 m². Es propia vs. total, pero el sitio nunca lo aclara. Para un comprador esto lee como error. | `src/utils/apartmentData.js:35,45` y `:94,104` | Alta |
| B6 | **Mapa muerto**: `mapLocations` es un estado que se inicializa vacío y nunca se actualiza (el `setter` no se desestructura). El bloque `NearAttractions` que lo alimentaba está comentado. La página de Ubicación es un pin estático. | `src/pages/LocationPage.jsx:9,72` | Media |
| B7 | **`useEffect` con dependencias incompletas** en el listener de teclado del lightbox: captura `mediaItems.length` de un closure viejo. | `src/components/MediaDisplay.jsx:16-29` | Baja |
| B8 | **`ErrorBoundary` existe pero nunca se monta.** Un error en cualquier página produce pantalla en blanco. | `src/errors/ErrorBoundary.jsx` | Media |
| B9 | **El 360 expulsa al usuario del sitio**: `window.open` a `kuula.co` en pestaña nueva, justo en el momento de mayor interés. | `src/pages/ThreeSixtyPage.jsx:34,42` | Media |
| B10 | **`alert()` nativo** como feedback de "próximamente" en amenities 360. | `src/pages/ThreeSixtyPage.jsx:46` | Baja |

### 2.2 Código muerto y duplicado

- **4 componentes sin ningún import**: `Button.jsx`, `AmenityDisplay.jsx` (116 líneas),
  `VideoPlayer.jsx`, `NearAttractions.jsx` (93 líneas, íntegramente comentadas).
- **`MediaCard` y `LazyMediaCard` son el mismo componente.** Difieren en un tamaño
  fijo y en un `hover:scale`. ~60 líneas duplicadas.
- **2 librerías de íconos**: `lucide-react` en todo el sitio, y `react-icons/fa`
  usado en **un solo archivo** (`Perks.jsx`).
- **2 SDKs de Google Maps instalados y sin usar**: `@react-google-maps/api` y
  `@vis.gl/react-google-maps`. Sobras de la migración a Mapbox.
- **`@emailjs/browser` instalado, comentado en `main.jsx:5-6`**, nunca usado.
- **Fuente Pacifico** importada vía `@import` de Google Fonts (render-blocking) para
  una clase `.cursive` que **no se usa en ninguna parte**.
- **`TYPOLOGIES_BY_TOWER` duplicado literalmente** en `ApartmentsPage.jsx:7-10` y
  `ThreeSixtyPage.jsx:8-11`, en vez de derivarse de `apartmentData`.
- **`AvancesDisplay`** dibuja el SVG completo dos veces (uno `md:hidden`, otro
  `hidden md:block`) para lograr dos tamaños. 98 líneas para un círculo de progreso.
- **`useEffect` vacío** con un comentario que dice que no hace nada
  (`TowerNavigation.jsx:26-28`).

### 2.3 Sistema visual: no existe

Este es el hallazgo de diseño más importante. No hay decisiones compartidas, así que
cada componente resolvió lo mismo de forma distinta:

- **Botones — 5 estilos distintos y ningún componente común**: pill verde
  (`ApartmentDetailPage`), gradiente gris (`AmenitieLayout`), borde blanco
  (`OptionCardWithHover`), pill gris oscuro (`ApartmentDetailPage` fallback), y un
  `Button.jsx` azul que nadie usa.
- **Color de acento sin definir**: conviven `blue-500`, `blue-400`, `blue-300`,
  `blue-600`, `cyan-500`, `green-500`, `purple-500` y un gradiente
  `purple→pink→orange`. Ninguno significa nada; son el default de Tailwind.
- **Radios**: `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl` y
  `rounded-full` mezclados sin criterio en la misma pantalla.
- **Duraciones de transición**: 200, 300, 500, 700 y 1000 ms conviviendo, a veces en
  el mismo componente.
- **Tipografía**: stack del sistema, sin escala. Los tamaños van de `text-xs` a
  `text-7xl` elegidos caso por caso. Cero personalidad para un producto que vende
  exclusividad.
- **`tailwind.config.js` está vacío** (`theme.extend: {}`). Todo el sistema es el
  default de Tailwind, que es un sistema de prototipado, no una identidad de marca.

### 2.4 Layout: el problema del header de 128px

`Header` mide `h-32` (128px, casi el doble de lo habitual) y es `fixed`. Como no hay
ningún token que exprese esa altura, **cada página compensa a mano** — y ninguna
compensa igual:

```
pt-32  → AmenitiesPage, ApartmentsPage, AvancesPage, GalleryPage, MasterplanPage, ThreeSixtyPage
pt-40  → ApartmentDetailPage, ApartmentsPage (segundo nivel), LocationPage, ThreeSixtyPage
pt-20  → AmenitiesPage (acumulado sobre pt-32)
top-36 → ApartmentDetailPage (aside sticky)
```

13 números mágicos que hay que recordar sincronizar. `ApartmentDetailPage` además
**reimplementa la lógica de scroll del header** (`useEffect` + `lastScrollYRef`
copiados) para ajustar el `top` de su aside. `CLAUDE.md` documenta esa duplicación
como intencional; con un token compartido deja de ser necesaria.

### 2.5 Accesibilidad

- **La home no tiene `<h1>`.** El título principal del hero (`incomparable.webp`) es
  **una imagen de texto** — invisible para Google y para lectores de pantalla, y no
  reflowea en pantallas chicas. Solo `AmenitiesPage` y `ApartmentDetailPage` tienen `h1`.
- **El lightbox no es un diálogo accesible**: sin `role="dialog"`, sin `aria-modal`,
  sin focus trap, sin devolver el foco al cerrar, y sin bloquear el scroll del body.
- **Las zonas de navegación del lightbox son `<div>` con `onClick`**, invisibles para
  el teclado. Peor: ocupan el 100% del alto de la imagen en dos mitades, así que
  **no hay forma de hacer clic en la imagen sin cambiar de foto**.
- **Textos alternativos inútiles**: `alt="Imagen 1"` … `alt="Imagen 12"` en la
  galería; `alt="Tipología 1 - Vista 17"` en las fichas. No describen nada.
- **Contraste insuficiente**: `text-gray-500` sobre `bg-white/10` en
  `TowerNavigation` (botones inactivos) no llega a AA.
- **Header transparente sobre imágenes claras** en la home: texto blanco sobre cielo
  claro, sin gradiente de protección.
- **Sin `prefers-reduced-motion`** en ningún lado, con un carrusel 3D con `rotateY`,
  un slider automático cada 5s, y animaciones de scroll en Masterplan.
- **Header con jitter**: se oculta con 1px de scroll (`currentScrollY >
  lastScrollYRef.current`), sin umbral. Cualquier micro-movimiento del trackpad lo
  hace parpadear.

### 2.6 Calidad de código

`npm run lint` → **115 problemas** (81 errores, 34 warnings):

```
81  react/prop-types              ← ninguna prop está tipada ni documentada
23  migration-from-tailwind-2     ← bg-opacity-* obsoleto, debería ser bg-black/40
 8  no-custom-classname           ← perspective-1000, translate-z-10, z-60 no existen
 3  react-hooks/exhaustive-deps
```

Los 8 `no-custom-classname` son **clases que no producen ningún CSS**: `perspective-1000`
y `group-hover:translate-z-10` aparecen en 3 componentes y no hacen absolutamente nada
(el efecto 3D que prometen nunca se renderizó). `z-60` tampoco existe en Tailwind v3.

### 2.7 Performance

Lo importante ya está resuelto. Quedan tres cosas:

- **`mapbox-gl` pesa 996 KB** y se descarga completo al entrar a `/ubicacion`, aunque
  el usuario nunca interactúe con el mapa. Es el 60% de todo el JS del sitio.
- **`@import` de Google Fonts en `index.css`** es render-blocking, y es para una
  fuente sin uso.
- **`logo.webp` se importa desde `../../public/images/`** en `Header` y `Footer`.
  Importar desde `public/` hace que Vite lo procese *además* de copiarlo: el asset
  queda duplicado en el build (`dist/assets/logo-ClN35Lvu.webp` + `dist/images/logo.webp`).

### 2.8 SEO: inexistente

- `<html lang="en">` en un sitio íntegramente en español.
- `<title>` único y genérico para las 10 rutas.
- Sin `<meta name="description">`, sin Open Graph, sin Twitter Card. **Compartir el
  link por WhatsApp muestra una URL pelada** — el canal principal de venta inmobiliaria
  en Argentina.
- Sin `robots.txt`, sin `sitemap.xml`, sin JSON-LD.

---

## 3. Decisiones tomadas

Estas son decisiones cerradas, no opciones. El fundamento está en cada una.

### D1 · No migrar a TypeScript

Tentador con 81 errores de `prop-types`, pero es un sitio de ~20 componentes
mantenido por una persona. TS agregaría fricción diaria sin resolver ninguno de los
problemas reales del §2. **Decisión**: desactivar `react/prop-types` en ESLint y
documentar props con JSDoc (que ya da autocompletado en VS Code sin build step).
`ProgressiveImage` ya lo hace bien y sirve de modelo.

### D2 · Identidad visual: neutrales cálidos + verde sierra

El azul de Tailwind es el color de "no elegí ningún color". El producto vende
12.300 m² de espacios verdes en las sierras de Córdoba. **Decisión**: base de
neutrales cálidos (piedra), acento verde profundo, y un dorado tenue reservado para
detalles finos (nunca para botones). Se elimina todo `blue-*`, `cyan-*`, `purple-*` y
el gradiente `purple→pink→orange`.

### D3 · Tipografía con serif de display

El stack del sistema no comunica nada. **Decisión**: **Fraunces** (serif variable,
contemporánea) para títulos y números grandes; **Inter** para texto. Self-hosted vía
`@fontsource-variable` — elimina el `@import` render-blocking, el pedido a un tercero,
y Pacifico de paso.

### D4 · Header de 80px con altura tokenizada

`h-32` es desproporcionado y genera los 13 números mágicos del §2.4.
**Decisión**: 64px en mobile, 80px en desktop, expuesto como `--header-h`. Las
páginas dejan de compensar a mano: lo hace un componente `<Page>`. Esto también
elimina la duplicación de lógica de scroll en `ApartmentDetailPage`.

### D5 · Reagrupar la navegación en 4 secciones

Hoy: 6 links planos, 3 páginas huérfanas. **Decisión**:

```
El Proyecto  →  Masterplan · Avances de obra
Unidades     →  Tipologías · Recorridos 360°
Experiencia  →  Amenities · Galería
Ubicación    →  (directo)
[Contactar]  →  CTA persistente, visualmente distinto de los links
```

En desktop, menú con dropdown en las tres primeras. En mobile, el drawer actual
(que está bien resuelto) con las secciones agrupadas.

### D6 · El hero deja de ser una imagen de texto

`incomparable.webp` se reemplaza por **texto real** en Fraunces sobre el slider.
Esto da el `<h1>` que falta, lo hace indexable, legible por lector de pantalla,
responsive de verdad, y elimina una descarga.

### D7 · El 360 se embebe, no se abre en pestaña nueva

Kuula se muestra en un modal a pantalla completa dentro del sitio, con botón de
"abrir en pestaña nueva" como opción secundaria. El usuario recorre el
departamento y vuelve con la sesión viva.

### D8 · Mapbox se carga bajo demanda

Se muestra un mapa estático (imagen) con un botón "Ver mapa interactivo". El chunk de
996 KB se descarga solo si el usuario lo pide. Se aprovecha para revivir los puntos
de interés (§2.6/B6) con datos reales de Villa Warcalde.

### D9 · Los datos son la fuente de verdad

`src/data/` centraliza todo. Las tipologías por torre, las URLs de Kuula, los
amenities y las métricas de avance **se derivan** de ahí; ninguna página vuelve a
declarar una lista de tipologías. Agregar la Torre 2 debe ser editar un objeto.

### D10 · Metadatos con React 19 nativo, sin librería

React 19 sube automáticamente al `<head>` los `<title>` y `<meta>` renderizados en
cualquier componente. No hace falta `react-helmet` ni equivalente: un componente
`<Seo>` de 20 líneas resuelve título, description y Open Graph por ruta.

---

## 4. Sistema de diseño

Se implementa como tokens CSS en `src/styles/tokens.css` **y** como `theme.extend`
en `tailwind.config.js`, para poder usarlos como utilidades (`bg-surface`,
`text-ink-500`, `rounded-card`).

### 4.1 Color

```css
/* Neutrales cálidos — la base del sitio */
--ink-900:    #1C1A17;   /* texto principal, header opaco */
--ink-700:    #3D3935;   /* texto secundario */
--ink-500:    #6B655D;   /* texto terciario, captions */
--ink-300:    #A8A199;   /* deshabilitado, placeholders */
--surface:    #FFFFFF;   /* cards */
--surface-alt:#F7F5F2;   /* fondo de página (reemplaza bg-gray-100) */
--line:       #E5E0D8;   /* bordes, divisores */

/* Acento — verde sierra */
--accent-700: #2F4A3C;   /* hover */
--accent-600: #3A5A48;   /* base: CTAs, estados activos */
--accent-100: #E6EDE8;   /* fondos sutiles, chips */

/* Detalle — dorado. Solo filetes, subrayados, overlines. Nunca fondo de botón. */
--gold-600:   #96754A;
--gold-500:   #B08D57;

/* Funcionales */
--whatsapp:   #25D366;   /* único color de marca externa permitido */
--focus:      #3A5A48;   /* anillo de foco, 2px + 2px de offset */
```

**Reglas**: un solo acento por pantalla. El dorado nunca compite con el verde. Los
colores de marca externa (WhatsApp, Instagram, Facebook) se permiten **solo** en los
íconos del footer, en escala de grises hasta el hover.

### 4.2 Tipografía

```css
--font-display: 'Fraunces Variable', Georgia, serif;
--font-sans:    'Inter Variable', system-ui, sans-serif;
```

Escala fluida (sin breakpoints manuales):

| Rol | Tamaño | Familia | Peso | Interlineado |
|---|---|---|---|---|
| `display-xl` | `clamp(2.75rem, 6vw, 5rem)` | Fraunces | 400 | 1.05 |
| `display-l` | `clamp(2rem, 4.5vw, 3.25rem)` | Fraunces | 400 | 1.1 |
| `h2` | `clamp(1.5rem, 2.5vw, 2.25rem)` | Fraunces | 500 | 1.2 |
| `h3` | `1.25rem` | Inter | 600 | 1.3 |
| `body-l` | `1.125rem` | Inter | 400 | 1.7 |
| `body` | `1rem` | Inter | 400 | 1.65 |
| `caption` | `0.875rem` | Inter | 400 | 1.5 |
| `overline` | `0.75rem` | Inter | 600 | 1.4 · `letter-spacing: .12em` · mayúsculas |

Los párrafos largos se limitan a `--prose-max: 68ch`. Hoy la descripción de las
fichas corre a ~110 caracteres por línea, que es incómodo de leer.

### 4.3 Espaciado y layout

```css
--header-h:    4rem;              /* 5rem en ≥768px */
--section-y:   clamp(3rem, 8vw, 7rem);
--gutter:      clamp(1rem, 4vw, 2rem);
--content-max: 1280px;
--prose-max:   68ch;
```

### 4.4 Radios, sombras y motion

```css
--radius-sm:   4px;    /* chips, badges */
--radius-md:   12px;   /* cards, inputs, modales */
--radius-full: 9999px; /* solo botones pill y avatares */
/* Las imágenes full-bleed van sin radio. */

--shadow-sm: 0 1px 2px rgb(28 26 23 / .05), 0 1px 3px rgb(28 26 23 / .06);
--shadow-md: 0 4px 12px rgb(28 26 23 / .08), 0 2px 4px rgb(28 26 23 / .04);
/* Solo dos niveles. Se elimina shadow-lg / shadow-2xl generalizado. */

--dur-fast: 150ms;   /* hovers, cambios de color */
--dur-base: 250ms;   /* la mayoría de las transiciones */
--dur-slow: 400ms;   /* entradas de modal, crossfade del hero */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

Global, sin excepciones:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 4.5 Componentes base

| Componente | Variantes | Reemplaza |
|---|---|---|
| `<Button>` | `primary` · `secondary` · `ghost` · `whatsapp` × `sm/md/lg` | los 5 estilos ad-hoc del §2.3 |
| `<Container>` | ancho `--content-max` + `--gutter` | 11 repeticiones de `mx-auto max-w-screen-xl px-4` |
| `<Section>` | ritmo vertical `--section-y`, fondo opcional | los `py-6` / `py-12` / `py-20` sueltos |
| `<Page>` | aplica el offset del header **una sola vez** | los 13 `pt-32` / `pt-40` / `pt-20` |
| `<PageHeader>` | overline + h1 + bajada | títulos de página inconsistentes |
| `<Modal>` | focus trap, `role="dialog"`, Escape, scroll lock, restaura foco | el modal a mano de `MediaDisplay` |
| `<Lightbox>` | sobre `<Modal>`, con navegación accesible | `MediaDisplay` |
| `<MediaTile>` | tamaño por prop | fusión de `MediaCard` + `LazyMediaCard` |
| `<Seo>` | title, description, OG, canonical | nada (no existe) |

---

## 5. Arquitectura de código

### 5.1 Estructura objetivo

```
src/
├── app/
│   └── App.jsx                 router + providers + ErrorBoundary
├── components/
│   ├── ui/                     Button, Container, Section, Page, PageHeader,
│   │                           Modal, Badge, Overline, Seo
│   ├── media/                  ProgressiveImage, MediaTile, Lightbox, Carousel
│   ├── layout/                 Header, Nav, MobileNav, Footer, Layout, StickyCta
│   └── marketing/              Hero, Perks, ContactSection, UnitCard,
│                               AmenityCard, ProgressRing, TourEmbed
├── data/
│   ├── project.js              datos del proyecto: dirección, entrega, métricas,
│   │                           contacto, redes  (hoy hardcodeados en 6 archivos)
│   ├── units.js                torres + tipologías + Kuula  (ex apartmentData)
│   ├── amenities.js
│   ├── navigation.js           única fuente de la IA de navegación (D5)
│   └── imageManifest.js        generado — no tocar
├── hooks/
│   ├── useScrollDirection.js   con umbral, compartido (mata la duplicación §2.4)
│   ├── useLockBodyScroll.js
│   └── useFocusTrap.js
├── pages/
└── styles/
    ├── tokens.css
    └── index.css
```

### 5.2 Convenciones

- **Un componente por archivo**, `export default`, nombre de archivo = nombre del componente.
- **Props documentadas con JSDoc** (D1). Nada de `PropTypes`.
- **Sin lógica de datos en componentes de UI.** Todo sale de `src/data/`.
- **Sin colores/tamaños literales en JSX.** Solo utilidades de token
  (`bg-surface-alt`, no `bg-gray-100`; `text-ink-500`, no `text-gray-500`).
- **Los assets importados van en `src/assets/`**, nunca en `public/` (§2.7).
  `public/` es solo para lo que se sirve por ruta literal (imágenes del manifest,
  favicon, robots, sitemap).

---

## 6. Plan de ejecución

Siete fases. Cada una es un commit coherente y deja el sitio **funcionando**. Se
puede parar después de cualquiera.

---

### F0 · Red de seguridad y limpieza

*Sin cambios visuales. Elimina ruido antes de tocar nada importante.*

1. Borrar código muerto: `Button.jsx`, `AmenityDisplay.jsx`, `VideoPlayer.jsx`,
   `NearAttractions.jsx`.
2. Desinstalar deps sin uso: `@react-google-maps/api`, `@vis.gl/react-google-maps`,
   `@emailjs/browser`. Limpiar el comentario de `main.jsx:5-6`.
3. Migrar `Perks.jsx` de `react-icons/fa` a `lucide-react`; desinstalar `react-icons`.
4. Borrar las clases fantasma `perspective-1000`, `translate-z-10`, `z-60` (no
   producen CSS) y el `useEffect` vacío de `TowerNavigation.jsx:26-28`.
5. **Arreglar B1**: quitar el `<Header>` duplicado de `AmenitiesPage`.
6. **Arreglar B8**: montar `ErrorBoundary` en `App.jsx`, envolviendo `<Routes>`, con
   una pantalla de error decente (logo + mensaje + volver al inicio).
7. Configurar ESLint: desactivar `react/prop-types` (D1), dejar el resto en error.

**Aceptación**: `npm run lint` baja de 115 a menos de 30 problemas · `npm run build`
pasa · el bundle de vendor baja (menos react-icons) · el sitio se ve idéntico.

---

### F1 · Fundaciones de diseño

*Los tokens existen y son usables. Todavía no se aplican en masa.*

1. Crear `src/styles/tokens.css` con §4.1–§4.4.
2. Extender `tailwind.config.js`: colores, `fontFamily`, `fontSize` con la escala
   fluida, `borderRadius`, `boxShadow`, `transitionDuration`, `maxWidth`.
3. Instalar `@fontsource-variable/fraunces` y `@fontsource-variable/inter`.
   Eliminar el `@import` de Google Fonts, la clase `.cursive` y Pacifico (D3).
4. Agregar el bloque `prefers-reduced-motion` global.
5. Estilo de foco visible global: anillo `--focus` de 2px con 2px de offset.

**Aceptación**: `bg-surface-alt`, `text-ink-700`, `font-display` funcionan · no hay
requests a `fonts.googleapis.com` · el sitio sigue en gris (los tokens conviven con
las clases viejas).

---

### F2 · Layout, navegación y jerarquía

*Primer cambio visible. Es el que más se nota.*

1. **Header a 64/80px** con `--header-h` (D4).
2. Crear `<Page>` y migrar las 9 páginas: eliminar los 13 `pt-32`/`pt-40`/`pt-20`.
3. Extraer `useScrollDirection` **con umbral de 8px** y sin ocultar el header en los
   primeros 100px de scroll (arregla el jitter del §2.5). Usarlo en `Header` **y** en
   `ApartmentDetailPage` — se elimina la duplicación que `CLAUDE.md` documentaba.
4. **Nueva IA de navegación** (D5) desde `src/data/navigation.js`: dropdowns en
   desktop, drawer agrupado en mobile. **Arregla B2.**
5. Gradiente de protección en el header transparente de la home, para garantizar
   contraste sobre cualquier foto.
6. `<StickyCta>` en mobile: barra inferior con "WhatsApp" + "Ver tipologías",
   visible después del primer scroll.
7. Rehacer `TowerNavigation`: quitar los campos fantasma (**B3**), subir el
   contraste de los botones inactivos a AA, convertirlo en flujo normal del documento
   en vez de `absolute` (es lo que obligaba al `pt-40` de compensación).
8. Mover `logo.webp` a `src/assets/` (§2.7).

**Aceptación**: las 9 rutas alcanzables desde el header · ningún `pt-` mágico en
`src/pages/` · el header no parpadea al hacer micro-scroll · navegable con Tab ·
`logo` aparece una sola vez en `dist/`.

---

### F3 · Biblioteca de componentes UI

1. `<Button>` con las 4 variantes × 3 tamaños. Migrar los 5 estilos ad-hoc.
2. `<Container>`, `<Section>`, `<PageHeader>`, `<Overline>`, `<Badge>`.
3. `<Modal>` accesible: `role="dialog"`, `aria-modal`, focus trap
   (`useFocusTrap`), scroll lock (`useLockBodyScroll`), Escape, restauración del
   foco al cerrar.
4. **Reescribir `MediaDisplay` como `<Lightbox>`** sobre `<Modal>`:
   botones `<button>` reales con `aria-label` en vez de los dos `<div>` de media
   pantalla (§2.5), soporte de swipe en mobile, contador con `aria-live`, y
   **la imagen deja de ser una zona de navegación** — se puede mirar sin cambiarla.
   Corrige **B7** de paso.
5. Fusionar `MediaCard` + `LazyMediaCard` en `<MediaTile>`.
6. Normalizar radios, sombras y duraciones a los tokens (§4.4).
7. Reemplazar los 23 `bg-opacity-*` obsoletos por sintaxis `/opacidad`.

**Aceptación**: cero `<button className="rounded-full bg-...">` sueltos en páginas ·
el lightbox pasa una auditoría de teclado (abrir, navegar, cerrar, foco restaurado) ·
`npm run lint` en 0 problemas.

---

### F4 · Capa de datos

1. Crear `src/data/project.js`: dirección, coordenadas, fecha de entrega, teléfono,
   redes, métricas del masterplan. **Hoy están hardcodeados en 6 archivos distintos**
   (`Footer`, `ContactSection`, `ApartmentDetailPage`, `LocationPage`,
   `MasterplanPage`, `Perks`).
2. `apartmentData.js` → `src/data/units.js`, reestructurado:
   - las torres contienen sus tipologías → **elimina el `TYPOLOGIES_BY_TOWER`
     duplicado** en dos páginas;
   - las URLs de Kuula pasan a ser un campo de la tipología, no un objeto suelto
     en `ThreeSixtyPage`;
   - los íconos se referencian por nombre, no importando `lucide` en el archivo de datos.
3. **Arreglar B4**: quitar las 6 repeticiones de `25.webp` en Tipología 2.
4. **Arreglar B5**: separar `superficieCubierta` y `superficieTotal` como campos
   distintos y mostrarlos etiquetados. Se termina la contradicción.
5. **Reescribir los `alt`** de galería y fichas con descripciones reales
   ("Living comedor con salida al balcón terraza"), no numeración (§2.5).
6. Unificar el tono editorial de la descripción de Tipología 3, que hoy desentona con
   las otras dos (dice "apartamento", las otras dicen "tipología"; es la mitad de larga).

**Aceptación**: agregar una tipología requiere editar **un solo** archivo · no hay
strings de contacto/dirección fuera de `project.js` · ningún `alt` numerado.

---

### F5 · Rediseño página por página

Aplicación del sistema. Detalle en §7.

**Aceptación**: ninguna clase `gray-*` / `blue-*` de Tailwind en `src/` · toda página
termina en un CTA · las tres tipografías de display en su lugar.

---

### F6 · Accesibilidad y SEO

1. `<html lang="es">`.
2. Componente `<Seo>` (D10) + title/description/OG por ruta. Imagen OG de 1200×630.
3. `public/robots.txt` y `public/sitemap.xml` (10 rutas + las 3 fichas).
4. JSON-LD `Residence` + `LocalBusiness` con dirección y geo de `project.js`.
5. Un `<h1>` por página, jerarquía `h1 > h2 > h3` sin saltos.
6. Auditoría de contraste AA sobre la paleta nueva.
7. `aria-label` en todos los botones de solo ícono; `aria-current` en el link activo.
8. Skip link "Ir al contenido".
9. Recorrido completo con teclado y con VoiceOver.

**Aceptación**: Lighthouse Accessibility ≥ 95 · Lighthouse SEO ≥ 95 · compartir
cualquier URL por WhatsApp muestra título, bajada e imagen.

---

### F7 · Performance y cierre

1. **Mapbox bajo demanda** (D8): imagen estática + "Ver mapa interactivo".
   ~1 MB fuera de la carga inicial de `/ubicacion`. Revive los puntos de interés (**B6**).
2. **360 embebido** (D7): `<TourEmbed>` en modal. Corrige **B9** y **B10**
   (el `alert()` pasa a ser un estado vacío diseñado).
3. Simplificar `AvancesDisplay` a un solo SVG responsive (98 → ~40 líneas).
4. Revisar `BackgroundSlider`: pausar el auto-avance cuando la pestaña no está
   visible y bajo `prefers-reduced-motion`.
5. Lighthouse en las 4 rutas principales, mobile y desktop.
6. Actualizar `CLAUDE.md`: la nota sobre la duplicación de scroll en
   `ApartmentDetailPage` queda obsoleta tras F2.

**Aceptación**: LCP < 2.0s en 4G simulado · Performance ≥ 90 mobile en `/` y
`/departamentos` · el JS inicial de `/ubicacion` baja de ~1.2 MB a ~250 KB.

---

## 7. Detalle por página

### `/` — Home

El slider a pantalla completa está bien. Lo que falla es todo lo que viene después:
seis cards idénticas que dicen "Galería / Departamentos / Amenities…" son un **menú
disfrazado de contenido**. El header ya hace ese trabajo.

- Hero: **texto real** en Fraunces reemplaza `incomparable.webp` (D6). `<h1>` con el
  nombre y una bajada corta. Dos CTAs: "Ver tipologías" (primary) y "Recorrido 360°"
  (secondary). Indicador de scroll.
- Reemplazar la grilla de 6 cards por **3 bloques narrativos alternados**
  (imagen/texto): *El entorno* → *Las unidades* → *Los amenities*. Cada uno con su
  CTA a la sección correspondiente. Se cuenta una historia en vez de listar un menú.
- `Perks`: 12 tarjetas iguales es una pared. Reagrupar en 3 columnas temáticas
  (Escala · Bienestar · Entorno) con los números en display grande — los números son
  el argumento de venta (54 unidades, 126 cocheras, 12.300 m²), hoy están en `text-lg`
  igual que todo lo demás.
- `ContactSection`: hoy son 4 círculos de colores saturados que rompen la paleta.
  Rediseñar sobrio: WhatsApp como CTA primario destacado, el resto como links
  discretos.

### `/departamentos`

- `TowerNavigation` en flujo normal, contraste AA, sin campos fantasma (**B3**).
- `UnitCard` rediseñada: el número de tipología en `text-7xl` compite con la foto.
  Bajarlo, y subir en cambio los 3 datos que deciden una compra: **dormitorios,
  superficie, cocheras**. El carrusel horizontal de features dentro de la card
  (`ApartmentInfo`, con flechas para ver 11 íconos de a 3) es un patrón hostil:
  reemplazar por los 3 datos clave + "ver ficha completa".
- "Torres VIP" muestra hoy solo un `FutureUpgrade`. Sustituir por un teaser real
  (render + los datos que sí existen en el masterplan: 18 unidades de 3 dormitorios,
  3 cocheras) y captura de interés.

### `/ficha/:tower/:typology`

La página mejor resuelta del sitio. Ajustes:

- Texto de descripción a `--prose-max` (hoy corre a ~110 caracteres por línea).
- Superficies separadas y etiquetadas (**B5**).
- El aside sticky usa `useScrollDirection` compartido (F2).
- Agregar al aside: link al recorrido 360° de **esa** tipología y navegación
  "‹ Tipología anterior · siguiente ›". Hoy la ficha es un callejón sin salida.
- Los 11 íconos de features en grilla de 2 columnas son ruido visual. Jerarquizar:
  4 destacados arriba, el resto en lista compacta.

### `/galeria`

- Grilla uniforme de 12 tiles `h-52`. Pasar a **masonry con pesos**: algunas imágenes
  merecen ocupar el doble. Da ritmo y da a entender que hay una curaduría.
- `alt` reales (F4).
- Lightbox accesible (F3).
- CTA al final: "¿Querés verlo en persona?".

### `/amenities`

- El carrusel 3D con `rotateY` y `translateZ` es la pieza más frágil del sitio:
  offsets en píxeles fijos (380/560px) que no responden al viewport, auto-rotate cada
  5s **y** los indicadores de posición abren el lightbox en vez de cambiar de slide
  (`AmenitiesPage.jsx:301` llama a `handleImageClick`, no a un `goTo`). **Decisión:
  reemplazarlo** por un carrusel horizontal con scroll-snap: más simple, funciona en
  cualquier ancho, es nativo en touch, y es accesible.
- La sección "¿Por qué elegirnos?" (Calidad Premium / Disponibilidad 24/7 / Bienestar
  Total) es relleno genérico que no dice nada del proyecto. **Eliminar**, y en su lugar
  el CTA al recorrido 360° del SUM y el spa, que sí es contenido real.
- Cada amenity con su imagen; hoy son tarjetas de solo ícono y texto separadas del
  carrusel, sin relación visible entre ambos.

### `/ubicacion`

La página más pobre del sitio: un pin y una dirección. Y la ubicación es un argumento
central de venta.

- Mapa diferido (D8) con los puntos de interés reales (**B6**): colegios, salud,
  comercios, accesos, con **tiempos en auto** — que es lo que un comprador realmente
  quiere saber.
- Sección de contexto: qué es Villa Warcalde, distancia al centro de Córdoba.
- Foto aérea del entorno.

### `/masterplan`

- El overlay de 16 bloques de texto animados por scroll sobre la mitad derecha de la
  planimetría es ilegible en mobile (`w-1/2` fijo sobre una imagen que se achica) y
  saturado en desktop.
- **Rediseño**: planimetría a ancho completo, y debajo los datos como **grilla de
  cifras** en tipografía de display. Los números venden solos.
- `corte.webp` en `h-96 w-full` deforma la imagen (fuerza altura fija sobre una imagen
  panorámica). Respetar su ratio.

### `/avances`

- 4 anillos de progreso sin fecha ni contexto. Un anillo que dice "18 de 70
  departamentos" sin decir *cuándo* no genera confianza, genera dudas.
- Agregar fecha de última actualización y una fila de fotos de obra recientes.
- `ProgressRing` reescrito (F7).

### `/360`

- Embebido en modal (D7).
- Grilla unificada de tipologías + amenities en un solo nivel, en vez del
  `TowerNavigation` con "amenities" metido como si fuera una torre.
- Estado vacío diseñado en vez de `alert()` (**B10**).

---

## 8. Riesgos

| Riesgo | Mitigación |
|---|---|
| El cambio de paleta y tipografía es fuerte; puede no coincidir con la marca impresa del desarrollador. | Validar F1 con una sola página antes de propagar. Los tokens permiten cambiar toda la identidad editando un archivo. |
| Reemplazar `incomparable.webp` por texto (D6) toca un activo de marca. | Si el logotipo/lockup debe conservarse, mantenerlo como imagen **junto** al `<h1>` de texto, no en lugar de él. |
| Bajar el header de 128 a 80px reduce la presencia del logo. | Es la decisión correcta para el contenido; el logo gana peso relativo al ser el único elemento centrado. |
| Reescribir el lightbox y el carrusel 3D toca las piezas más visibles. | Van en fases separadas (F3 y F5), cada una verificable de forma aislada. |
| No hay tests. Todas las verificaciones son manuales. | Cada fase deja el sitio funcionando y tiene criterios de aceptación concretos. Sugerido: agregar Playwright para un smoke test de las 10 rutas antes de F5. |

---

## 9. Fuera de alcance (trabajo posterior)

Este refactor deja la base lista para lo que el sitio necesita de verdad, que es
**capturar demanda**. En orden de impacto sugerido:

1. **Captura de leads.** Hoy no hay un solo `<input>` en toda la app: el sitio no
   puede generar un contacto que no sea el usuario escribiendo por WhatsApp. Un
   formulario + brochure PDF descargable es el mayor retorno disponible.
2. **Eventos de analítica.** Vercel Analytics está montado pero no hay ni un
   `track()`. No hay forma de saber qué tipología se mira más ni dónde se abandona.
3. **Disponibilidad y precios.** No hay precio, piso, orientación ni estado de venta
   en ninguna parte. Es la primera pregunta de todo comprador.
4. Masterplan interactivo con unidades clickeables.
5. Timeline de obra con suscripción por email.

---

## 10. Resumen de esfuerzo

| Fase | Alcance | Riesgo | Prioridad |
|---|---|---|---|
| F0 · Limpieza | Bajo | Nulo | Alta |
| F1 · Tokens | Bajo | Nulo | Alta |
| F2 · Layout y navegación | Medio | Bajo | **Máxima** (arregla B1, B2, B3) |
| F3 · Componentes UI | Medio | Bajo | Alta |
| F4 · Datos | Medio | Bajo | Alta (arregla B4, B5) |
| F5 · Rediseño de páginas | Alto | Medio | Media |
| F6 · A11y + SEO | Medio | Nulo | Alta |
| F7 · Performance | Bajo | Bajo | Media |

**Corte mínimo recomendado si hay que priorizar**: F0 → F1 → F2 → F6.
Resuelve todos los bugs de severidad alta, hace el sitio navegable y accesible, y lo
vuelve compartible y encontrable — sin entrar en el rediseño visual completo.
