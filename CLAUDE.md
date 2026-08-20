# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Behavioral Guidelines

### 1. Think Before Coding

Before implementing, state assumptions explicitly. If multiple interpretations exist, present them — don't pick silently. If something is unclear, stop and ask rather than guessing.

### 2. Simplicity First

Minimum code that solves the problem. No speculative features, no abstractions for single-use code, no flexibility that wasn't requested. If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes

Touch only what the request requires. Don't "improve" adjacent code, formatting, or comments. Match existing style. If your changes create unused imports/variables, remove them — but leave pre-existing dead code alone unless asked.

### 4. Goal-Driven Execution

For multi-step tasks, state a brief plan with verifiable steps before starting. Strong success criteria reduce back-and-forth.

---

## Commands

```bash
npm run dev            # Start dev server (Vite HMR)
npm run build          # Production build
npm run preview        # Preview production build locally
npm run lint           # Run ESLint
npm run optimize:images  # Regenerate resized variants + LQIP manifest
```

`dev` and `build` both run `optimize:images` first via npm `pre` hooks. The script is
incremental, so repeat runs are near-instant.

There are no tests in this project.

---

## Architecture

**Alqantar** is a React 19 + Vite marketing/brochure site for a residential condominium in Villa Warcalde, Córdoba, Argentina. Deployed on Vercel.

### Routing (`src/App.jsx`)

React Router v7 with these routes:
- `/` → `HomePage` (also handles `/contacto` via hash scroll to `#contacto`)
- `/galeria` → `GalleryPage`
- `/departamentos` → `ApartmentsPage`
- `/ficha/:tower/:typology` → `ApartmentDetailPage` (dynamic apartment detail)
- `/ubicacion` → `LocationPage`
- `/amenities` → `AmenitiesPage`
- `/avances` → `AvancesPage`
- `/masterplan` → `MasterplanPage`
- `/360` → `ThreeSixtyPage`

### Data Layer (`src/data/` + `src/utils/`)

All content is **static data** — no backend or API calls:
- `src/data/project.js` — address, coordinates, delivery date, contact/social links, and
  masterplan metrics. Single source of truth (D9); nothing outside this file should hardcode them.
- `src/data/units.js` — towers → typologies (ex `apartmentData.js`), each with images, features
  (icons referenced by name, resolved via `src/utils/icons.js`), description,
  `superficieCubierta`/`superficieTotal`, and `kuulaUrl`.
- `src/data/navigation.js` — single source of truth for the header nav (desktop dropdowns +
  mobile drawer sections).
- `src/utils/amenitiesData.js` — amenity list + carousel image paths.
- `src/utils/imageManifest.js` — **generated**, do not edit by hand. Maps each `/images/*.webp` to its
  intrinsic size, the widths available under `/images/opt/`, and a base64 LQIP placeholder.

### Key Architectural Patterns

**Header hide-on-scroll**: `Header` and `ApartmentDetailPage`'s sticky aside both drive their
show/hide behavior off the same shared `useScrollDirection` hook
(`src/hooks/useScrollDirection.js`, with a scroll-delta threshold and a `minY` floor so trackpad
micro-scrolls don't cause flicker) — there is no duplicated scroll logic between them.

**Opaque vs. transparent header**: On `HomePage` the header starts transparent and turns opaque on scroll. All other pages are always opaque. The list of opaque pages is hardcoded in `Header.jsx`.

**Per-page SEO** (`src/components/ui/Seo.jsx`): each page renders `<Seo title description path ogImage>`
near the top of its JSX; React 19 hoists the `<title>`/`<meta>`/`<link>` tags it renders to
`<head>` natively (no `react-helmet`). Structured data (`src/components/ui/JsonLd.jsx`) is
rendered once, site-wide, from `Layout.jsx`. Important caveat: this is a fully client-rendered
SPA (no SSR/prerendering) — crawlers that don't execute JavaScript (WhatsApp, Facebook, Twitter
link-preview bots) will never see these tags, only crawlers that render JS (Googlebot) will.

**Progressive images**: every content image goes through `ProgressiveImage`, which paints the
inline LQIP blur immediately, picks a size via `srcset`/`sizes`, starts fetching 400px before
entering the viewport, and crossfades to the sharp image. It reserves space from the manifest's
intrinsic dimensions, so there is no layout shift. Callers pass the *original* path
(`/images/01.webp`) — the variant paths are derived. Images missing from the manifest degrade
to a plain `<img>`.

Note: `ProgressiveImage` only applies `relative` to its wrapper when the caller does not pass a
positioning class. Tailwind emits `.relative` after `.absolute`, so hardcoding it would silently
override callers like `BackgroundSlider` that need the wrapper absolutely positioned.

**Layout wrapper** (`src/components/Layout.jsx`): Wraps every page with a skip link ("Ir al
contenido" → `#main-content`, visually hidden until focused), `<Header>`, `<Footer>`,
`<StickyCta>`, site-wide JSON-LD (`<JsonLd>`), Vercel `<Analytics>`, and `<SpeedInsights>`.

### External Integrations

- **Mapbox GL** (`react-map-gl/mapbox`) on `LocationPage` — lazy-loaded via `React.lazy()` behind
  a "Ver mapa interactivo" button (D8), so the ~1 MB `mapbox-gl` chunk isn't in the initial
  bundle; token from `VITE_MAPBOX_ACCESS_TOKEN` env var
- **Vercel Analytics + Speed Insights** — injected globally in `Layout.jsx`

### Static Assets

All images and videos live under `public/`. Typology images: `/images/tipologiaNNN/NN.webp`.
Amenity images: `/images/amenities/NN.webp`. These full-size `.webp` files are the **sources**
for the optimizer and are never served to users directly.

`public/images/opt/` holds the generated variants (`<name>-<width>.webp`). It is gitignored and
rebuilt on every `dev`/`build`. Add a new image by dropping the `.webp` into `public/images/`
and re-running the build.

### Styling

Tailwind CSS v3 with a design-token system: `src/styles/tokens.css` defines CSS custom
properties (warm-neutral + sierra-green palette, Fraunces/Inter type scale, spacing, radii,
shadows, motion durations), mirrored into `tailwind.config.js`'s `theme.extend` as Tailwind
utilities (`bg-surface-alt`, `text-ink-700`, `font-display`, etc). `eslint-plugin-tailwindcss`
enforces classname order (warn-level).

### Vite Config Note

`vite.config.js` excludes `react-map-gl` from `optimizeDeps` and explicitly includes only `mapbox-gl` and `react-map-gl/mapbox`. Do not change this without testing the map page — it was added to fix a known bundling issue.
