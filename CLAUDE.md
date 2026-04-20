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
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

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

### Data Layer (`src/utils/`)

All content is **static data** — no backend or API calls:
- `apartmentData.js` — typologies keyed by `torre1.['Tipología N']`, each with images, features (lucide-react icons), description, and detail bullets
- `amenitiesData.js` — amenity list + carousel image paths
- `useImagePreloader.js` — custom hook that preloads an array of image URLs, returns `{ loaded, errors }`

### Key Architectural Patterns

**Header hide-on-scroll**: `Header` tracks scroll direction and hides on scroll-down (`-translate-y-full`). `ApartmentDetailPage` replicates this logic locally to adjust its sticky aside `top` offset — this duplication is intentional.

**Opaque vs. transparent header**: On `HomePage` the header starts transparent and turns opaque on scroll. All other pages are always opaque. The list of opaque pages is hardcoded in `Header.jsx`.

**Image preloading gate**: `ApartmentDetailPage` blocks render with a spinner until all typology images finish loading via `useImagePreloader`.

**Layout wrapper** (`src/components/Layout.jsx`): Wraps every page with `<Header>`, `<Footer>`, Vercel `<Analytics>`, and `<SpeedInsights>`.

### External Integrations

- **Mapbox GL** (`react-map-gl/mapbox`) on `LocationPage` — token from `VITE_MAPBOX_ACCESS_TOKEN` env var
- **EmailJS** (`@emailjs/browser`) — dependency available, check components for usage
- **Vercel Analytics + Speed Insights** — injected globally in `Layout.jsx`

### Static Assets

All images and videos live under `public/`. Typology images: `/images/tipologiaNNN/NN.png`. Amenity images: `/images/amenities/NN.png`.

### Styling

Tailwind CSS v3. `eslint-plugin-tailwindcss` enforces classname order (warn-level). No custom theme extensions.

### Vite Config Note

`vite.config.js` excludes `react-map-gl` from `optimizeDeps` and explicitly includes only `mapbox-gl` and `react-map-gl/mapbox`. Do not change this without testing the map page — it was added to fix a known bundling issue.
