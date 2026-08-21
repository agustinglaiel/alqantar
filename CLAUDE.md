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
- `src/data/amenities.js` — amenity list + carousel image paths. Each amenity is rendered as a
  row in an editorial index on `AmenitiesPage` (D17), not a photo card — there is no per-item
  image pairing. An amenity gets a `metric` field only if it has a hard figure to show (pulled
  from `project.metrics`, e.g. `"24,3 m lineales"`); most don't and render without a `Badge`.
- `src/utils/imageManifest.js` — **generated**, do not edit by hand. Maps each `/images/*.webp` to its
  intrinsic size, the widths available under `/images/opt/`, and a base64 LQIP placeholder.

### Key Architectural Patterns

**Header hide-on-scroll**: `Header` and `ApartmentDetailPage`'s sticky aside both drive their
show/hide behavior off the same shared `useScrollDirection` hook
(`src/hooks/useScrollDirection.js`, with a scroll-delta threshold and a `minY` floor so trackpad
micro-scrolls don't cause flicker) — there is no duplicated scroll logic between them.

**Header theme (`media`/`solid`), not a route list**: `useHeaderTheme()`
(`src/hooks/useHeaderTheme.js`) drives the header off *content*, not the current route. An
`IntersectionObserver` watches the header's own strip of the viewport (`rootMargin` trims out
everything below `--header-h`) for any element carrying `data-header-over="media"` — currently
only `BackgroundSlider`'s root, on the home hero. While one is intersecting, the header is
`"media"` (transparent, white text, gold underline on the active link); otherwise it's `"solid"`
(`bg-accent-700/95` + `backdrop-blur-md`, pill on the active link, `invert` Button variant for the
CTA). A new route needs zero registration — it's `"solid"` by default — and a new photo hero only
needs the `data-header-over="media"` attribute on its root element.

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
`StickyCta` publishes its own rendered height as `--sticky-cta-h` on `<html>` while visible (and
back to `0px` while hidden); `Layout`'s root div applies that as `padding-bottom` unconditionally,
via the `var(--sticky-cta-h, 0px)` fallback — so the reserved space always lands *after* `Footer`
(the actual last element in flow), not on `<main>`, since padding before an earlier sibling
doesn't protect content that renders after it.

**Mobile-first, 360px floor**: iPhone 14+ and base Galaxy phones (360–428px) are the primary
target, not desktop. Tap tokens live in `tokens.css`: `--tap-min` (44px, the minimum
interactive-control size), `--safe-top`/`--safe-bottom` (`env(safe-area-inset-*)`, meaningful only
because `index.html`'s viewport meta has `viewport-fit=cover`). `Button`'s three sizes all carry
`min-h-[var(--tap-min)]`; icon-only controls (footer social links, header hamburger/drawer close,
carousel and lightbox arrows) use `<IconButton>` (`src/components/ui/IconButton.jsx`), which
fixes a `size-[var(--tap-min)]` box around the icon regardless of the icon's own size. The header
adds `--safe-top` to its own height (`pt-[var(--safe-top)]`) rather than to `--header-h` itself,
so `Page`'s `pt-[calc(var(--header-h)+var(--safe-top))]` offset has to stay in sync with it.

### External Integrations

- **Mapbox GL** (`react-map-gl/mapbox`) on `LocationPage` — mounts on its own, no click gate (D15
  reverses the earlier button-gated D8): still `React.lazy()`, requested only when the map's
  container is about to enter the viewport (`IntersectionObserver`, 200px margin), so the ~1 MB
  `mapbox-gl` chunk stays out of every other route's bundle. Token from
  `VITE_MAPBOX_ACCESS_TOKEN`; if it's unset, `LocationPage` skips the map entirely and shows the
  address + Google Maps link instead (no broken Mapbox box).
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

**Color tokens are RGB channels, never hex.** `tokens.css` defines each color as
space-separated channels (`--ink-900: 28 26 23`), and `tailwind.config.js` wraps them as
`rgb(var(--ink-900) / <alpha-value>)`. This is required for Tailwind's alpha modifier
(`bg-ink-900/95`) to work — a `var()` pointing at a hex value is opaque, so Tailwind silently
drops any class with a `/NN` suffix instead of emitting it. If a new color token is added as
hex, every alpha-modified class using it will compile to nothing with no error. Raw usages
outside Tailwind classes (e.g. SVG `stroke`) must read `rgb(var(--token))`, not `var(--token)`.
`--focus-hex` is the one exception: it's consumed directly as a color by the `:focus-visible`
outline, which doesn't take an alpha modifier.

### Vite Config Note

`vite.config.js` excludes `react-map-gl` from `optimizeDeps` and explicitly includes only `mapbox-gl` and `react-map-gl/mapbox`. Do not change this without testing the map page — it was added to fix a known bundling issue.
