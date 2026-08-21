// src/data/amenities.js
import project from "./project";

const { metrics } = project;

const amenitiesData = [
  {
    title: "Piscina",
    description: "Piscina de 24 m lineales: un espacio imponente para disfrutar del verano, rodeado de solárium seco y húmedo con vistas al entorno verde.",
    metric: `${metrics.poolLengthM.toString().replace(".", ",")} m lineales`,
  },
  {
    title: "Gimnasio",
    description:
      "Gimnasio equipado, pensado para el entrenamiento diario, con equipamiento de última generación y vistas naturales que inspiran.",
  },
  {
    title: "Sauna",
    description:
      "Sauna ideal para relajarse y revitalizar cuerpo y mente",
  },
  {
    title: "Sala de relax",
    description:
      "Sala de relax, un ambiente diseñado para el descanso, la calma y el bienestar.",
  },
  {
    title: "Espacio de coworking",
    description:
      "Espacio de coworking moderno y funcional, perfecto para combinar productividad y confort sin salir de casa.",
  },
  {
    title: "SUM privado",
    description:
      "SUM privado en cada torre: salones amplios y equipados con capacidad para 25 personas, ideales para encuentros sociales o reuniones familiares.",
    metric: `${metrics.sumCapacity} personas`,
  },
  {
    title: "Espacios Verdes",
    description:
      "12.300 m² de espacios verdes, un parque natural privado que conecta con la esencia de Villa Warcalde.",
    metric: `${metrics.greenSpaceM2.toLocaleString("es-AR")} m²`,
  },
  {
    title: "Cocheras de cortesía",
    description:
      "35 cocheras de cortesía pensadas para la comodidad de residentes e invitados.",
    metric: `${metrics.parkingCourtesy} cocheras`,
  },
  {
    title: "Seguridad",
    description:
      "Seguridad privada 24 hs con control de accesos y monitoreo permanente para vivir con total tranquilidad.",
    metric: "24 hs",
  },
];


// 01 y 13 son láminas de plano técnico (mucho margen en blanco alrededor del
// dibujo), no fotos: forzar "cover" las deja prácticamente en blanco. Igual
// que las plantas en ImageCarousel, van con "contain" sobre fondo neutro.
const amenityCarouselImages = [
  { src: "/images/amenities/01.webp", fit: "contain" },
  { src: "/images/amenities/02.webp"},
  { src: "/images/amenities/03.webp"},
  { src: "/images/amenities/04.webp"},
  { src: "/images/amenities/05.webp"},
  { src: "/images/amenities/06.webp"},
  { src: "/images/amenities/07.webp"},
  { src: "/images/amenities/08.webp"},
  { src: "/images/amenities/09.webp"},
  { src: "/images/amenities/10.webp"},
  { src: "/images/amenities/11.webp"},
  { src: "/images/amenities/12.webp"},
  { src: "/images/amenities/13.webp", fit: "contain" },
  { src: "/images/amenities/14.webp"},
  { src: "/images/amenities/15.webp"},
  { src: "/images/amenities/16.webp"},
  { src: "/images/amenities/17.webp"},
  { src: "/images/amenities/18.webp"},
  { src: "/images/amenities/19.webp"},
  { src: "/images/amenities/20.webp"},
  { src: "/images/amenities/21.webp"},
];

export default amenitiesData;
export { amenityCarouselImages };

