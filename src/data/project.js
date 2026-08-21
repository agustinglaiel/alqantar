// src/data/project.js
//
// Central source of truth for project-level facts (D9): address, delivery
// date, contact channels, social links, and masterplan metrics. These used
// to be hardcoded independently in Footer, ContactSection,
// ApartmentDetailPage, LocationPage, MasterplanPage and Perks — nothing
// outside this file should hardcode them now. See PLAN-REFACTOR.md §6 (F4).

const project = {
  name: "Alqantar Condominio",
  address: {
    street: "José María Eguía Zanón 9932",
    neighborhood: "Villa Warcalde",
    city: "Córdoba",
  },
  /** Mapbox uses { longitude, latitude }; keep the plain lat/lng pair here. */
  coordinates: { lat: -31.33593, lng: -64.30234 },
  deliveryDate: "Diciembre 2026",
  whatsappNumber: "5493517496383",
  email: "info@alqantar.com",
  social: {
    facebook: "https://www.facebook.com/alqantar.condominio",
    instagram: "https://www.instagram.com/alqantar_condominio",
  },
  /** Masterplan / project-scale figures reused across Perks and Masterplan. */
  metrics: {
    units: 54,
    parkingUnderground: 126,
    parkingCourtesy: 35,
    greenSpaceM2: 12300,
    constructionM2: 18439.62,
    landM2: 15576.8,
    typologiesCount: 4,
    poolLengthM: 24.3,
    sumCapacity: 25,
  },
};

/** "José María Eguía Zanón 9932, Villa Warcalde, Córdoba" */
export const addressFull = `${project.address.street}, ${project.address.neighborhood}, ${project.address.city}`;

/** Google Maps link by address query — opens the place card, not a bare pin. */
export const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressFull)}`;

/** WhatsApp link, optionally with a prefilled message. */
export function whatsappLink(message) {
  const base = `https://wa.me/${project.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export default project;
