/**
 * Single source of truth for the header nav (desktop dropdowns + mobile
 * drawer sections). Groups with `items` render as a dropdown/section;
 * entries with a bare `path` render as a direct link.
 */
const navigation = [
  {
    label: "El Proyecto",
    items: [
      { label: "Masterplan", path: "/masterplan" },
      { label: "Avances de obra", path: "/avances" },
    ],
  },
  {
    label: "Unidades",
    items: [
      { label: "Tipologías", path: "/departamentos" },
      { label: "Recorridos 360°", path: "/360" },
    ],
  },
  {
    label: "Experiencia",
    items: [
      { label: "Amenities", path: "/amenities" },
      { label: "Galería", path: "/galeria" },
    ],
  },
  { label: "Ubicación", path: "/ubicacion" },
];

/** Persistent CTA rendered apart from the grouped links. */
export const contactCta = { label: "Contactar", path: "/contacto#contacto" };

export default navigation;
