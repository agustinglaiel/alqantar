import { Link } from "react-router-dom";

const options = [
  {
    title: "Masterplan",
    imageSrc: "/images/01.png",
    linkTo: "/masterplan",
    description: "Descubre el diseño integral de Alqantar.",
  },
  {
    title: "Departamentos",
    imageSrc: "/images/02.png",
    linkTo: "/departamentos",
    description: "Explora nuestras modernas torres residenciales.",
  },
  {
    title: "Amenities",
    imageSrc: "/images/09.png",
    linkTo: "/amenities",
    description: "Disfruta de nuestras amenidades exclusivas.",
  },
  {
    title: "Ubicación",
    imageSrc: "/images/12.png",
    linkTo: "/ubicacion",
    description: "En el corazón de Villa Warcalde, Córdoba.",
  },
  {
    title: "Avances",
    imageSrc: "/images/06.png",
    linkTo: "/avances",
    description: "Vive el progreso de Alqantar en tiempo real.",
  },
  {
    title: "360°",
    imageSrc: "/images/03.png",
    linkTo: "/360",
    description: "Vive una experiencia inmersiva en 360°.",
  },
];

function OptionCardWithHover() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {options.map((option, index) => (
        <Link
          key={index}
          to={option.linkTo}
          className="group relative rounded-lg overflow-hidden shadow-lg w-full h-64 perspective-1000"
        >
          {/* Imagen de fondo */}
          <div className="absolute w-full h-full">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${option.imageSrc})` }}
            />
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60" />
          </div>
          {/* Contenido (título, descripción y botón) */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center w-full">
              {/* Título siempre visible */}
              <h3 className="text-white text-2xl font-semibold text-center">
                {option.title}
              </h3>
              {/* Contenedor para descripción y botón, oculto sin hover */}
              <div className="hidden group-hover:flex flex-col items-center justify-center w-full mt-2 transition-all duration-300">
                <p className="text-white text-sm text-center font-sans mb-2">
                  {option.description}
                </p>
                <span className="inline-block px-4 py-2 text-white text-sm font-semibold border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-200">
                  VER MÁS
                </span>
              </div>
            </div>
          </div>
          {/* Capa para el efecto 3D */}
          <div className="absolute inset-0 group-hover:translate-z-10 transition-transform duration-300" />
        </Link>
      ))}
    </div>
  );
}

export default OptionCardWithHover;
