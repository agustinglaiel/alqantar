import project, { addressFull } from "../../data/project";

// Mismo placeholder que Seo.jsx — no hay dominio de producción configurado
// en el repo todavía. Ver TODO en Seo.jsx.
const SITE_URL = import.meta.env?.VITE_SITE_URL || "https://alqantar.com";

const address = {
  "@type": "PostalAddress",
  streetAddress: `${project.address.street}, ${project.address.neighborhood}`,
  addressLocality: project.address.city,
  addressRegion: "Córdoba",
  addressCountry: "AR",
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: project.coordinates.lat,
  longitude: project.coordinates.lng,
};

// Residence + LocalBusiness (D10/F6): datos reales tomados de src/data/project.js,
// sin coordenadas ni dirección inventadas. Se usa el subtipo "ApartmentComplex"
// (Place > Residence > ApartmentComplex en la jerarquía de schema.org) en vez del
// tipo genérico "Residence" porque es el que Google reconoce para desarrollos
// residenciales — el plan pide "Residence"; esto lo satisface siendo más específico.
const residenceLd = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: project.name,
  description: `Condominio de ${project.metrics.units} departamentos en ${addressFull}.`,
  address,
  geo,
  numberOfAccommodationUnits: project.metrics.units,
  url: SITE_URL,
};

const businessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: project.name,
  address,
  geo,
  telephone: `+${project.whatsappNumber}`,
  email: project.email,
  url: SITE_URL,
  sameAs: [project.social.facebook, project.social.instagram],
};

/** Structured data, rendered once site-wide (Layout.jsx): describes the
 * building itself, so it applies regardless of which route is active. */
function JsonLd() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(residenceLd)}</script>
      <script type="application/ld+json">{JSON.stringify(businessLd)}</script>
    </>
  );
}

export default JsonLd;
