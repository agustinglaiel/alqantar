import { Link } from "react-router-dom";
import ProgressiveImage from "./ProgressiveImage";

const options = [
  {
    title: "Galería",
    imageSrc: "/images/01.webp",
    linkTo: "/galeria",
    description: "Descubre la belleza de Alqantar en imágenes.",
  },
  {
    title: "Departamentos",
    imageSrc: "/images/02.webp",
    linkTo: "/departamentos",
    description: "Explora nuestras modernas torres residenciales.",
  },
  {
    title: "Amenities",
    imageSrc: "/images/09.webp",
    linkTo: "/amenities",
    description: "Disfruta de nuestras amenities exclusivas.",
  },
  {
    title: "Ubicación",
    imageSrc: "/images/12.webp",
    linkTo: "/ubicacion",
    description: "En el corazón de Villa Warcalde, Córdoba.",
  },
  {
    title: "Avances",
    imageSrc: "/images/06.webp",
    linkTo: "/avances",
    description: "Vive el progreso de Alqantar en tiempo real.",
  },
  {
    title: "360°",
    imageSrc: "/images/03.webp",
    linkTo: "/360",
    description: "Vive una experiencia inmersiva en 360°.",
  },
];

function OptionCardWithHover() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option, index) => (
        <Link
          key={index}
          to={option.linkTo}
          className="group relative h-64 w-full overflow-hidden rounded-lg shadow-lg"
        >
          {/* Imagen de fondo */}
          <div className="absolute size-full">
            <ProgressiveImage
              src={option.imageSrc}
              alt={option.title}
              sizes="(min-width: 1024px) 410px, (min-width: 640px) 47vw, 92vw"
              className="size-full"
              imgClassName="transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60" />
          </div>
          {/* Contenido (título, descripción y botón) */}
          <div className="relative flex size-full items-center justify-center p-4">
            <div className="flex w-full flex-col items-center justify-center">
              {/* Título siempre visible */}
              <h3 className="text-center text-2xl font-semibold text-white">
                {option.title}
              </h3>
              {/* Contenedor para descripción y botón, oculto sin hover */}
              <div className="mt-2 hidden w-full flex-col items-center justify-center transition-all duration-300 group-hover:flex">
                <p className="mb-2 text-center font-sans text-sm text-white">
                  {option.description}
                </p>
                <span className="inline-block rounded-full border border-white px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black">
                  VER MÁS
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default OptionCardWithHover;
