// TODO: reemplazar por el dominio real de producción una vez que esté
// definido (no hay ninguno configurado hoy en vercel.json ni en el repo).
const SITE_URL = import.meta.env?.VITE_SITE_URL || "https://alqantar.com";
const SITE_NAME = "Alqantar Condominio";
const DEFAULT_DESCRIPTION =
  "Alqantar Condominio: departamentos de 2 y 3 dormitorios entre sierras y bosque nativo, en Villa Warcalde, Córdoba.";
// No existe un asset 1200×630 dedicado (gap, ver informe F6): se usa la
// variante más grande ya generada de la foto de fachada como default.
const DEFAULT_OG_IMAGE = "/images/opt/01-1200.webp";

/**
 * Metadatos por ruta (D10): título, descripción, Open Graph y Twitter Card,
 * más el <link rel="canonical">. React 19 sube `<title>`/`<meta>`/`<link>`
 * al `<head>` automáticamente sin importar en qué componente se rendericen.
 *
 * @param {string} title - sin sufijo; se le agrega " | Alqantar Condominio"
 * @param {string} [description]
 * @param {string} [path] - ruta canónica, ej. "/galeria"
 * @param {string} [ogImage] - ruta absoluta desde `public/`, ej. "/images/01.webp"
 */
function Seo({ title, description = DEFAULT_DESCRIPTION, path = "/", ogImage = DEFAULT_OG_IMAGE }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}${ogImage}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}

export default Seo;
