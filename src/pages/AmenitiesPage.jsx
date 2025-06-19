import React from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import AmenityDisplay from "../components/AmenityDisplay";

function AmenitiesPage() {
  const amenities = [
    {
      title: "Piscina",
      description: "Disfruta de nuestra amplia piscina climatizada, perfecta para relajarte después de un largo día. Con un diseño moderno y vistas panorámicas, es el lugar ideal para desconectar y disfrutar del sol.",
      image: "/images/08.png",
      features: [
        "Piscina climatizada todo el año",
        "Área de descanso con reposeras",
        "Vista panorámica de la ciudad",
        "Iluminación LED nocturna"
      ]
    },
    {
      title: "Gimnasio",
      description: "Mantente en forma en nuestro gimnasio completamente equipado con la última tecnología en equipos de ejercicio. Un espacio amplio y ventilado diseñado para tu bienestar.",
      image: "/images/09.png",
      features: [
        "Equipos de última generación",
        "Área de pesas libres",
        "Zona de cardio con pantallas",
        "Entrenador personal disponible"
      ]
    },
    {
      title: "Sauna y SPA",
      description: "Relájate y rejuvenece en nuestra zona de spa con sauna finlandés. Un oasis de tranquilidad donde podrás desestresarte y cuidar tu bienestar físico y mental.",
      image: "/images/10.png",
      features: [
        "Sauna finlandés tradicional",
        "Área de relajación",
        "Duchas con hidroterapia",
        "Ambiente zen y tranquilo"
      ]
    },
    {
      title: "Jardines y Espacios Verdes",
      description: "Conecta con la naturaleza en nuestros hermosos jardines paisajísticos. Espacios verdes diseñados para el descanso, la meditación y actividades al aire libre.",
      image: "/images/08.png", // Placeholder - reemplaza con imagen real
      features: [
        "Jardines paisajísticos",
        "Senderos para caminar",
        "Áreas de picnic",
        "Zona de juegos para niños"
      ]
    }
  ];

  return (
    <div className="relative">
      <BackgroundSlider />
      
      <div className="relative z-10 bg-white bg-opacity-95">
        <div className="max-w-screen-xl mx-auto px-4 pt-20 pb-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              Amenities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todas las comodidades y servicios exclusivos que hemos diseñado 
              para enriquecer tu experiencia de vida en nuestro complejo residencial.
            </p>
          </div>

          {/* Amenities alternados */}
          {amenities.map((amenity, index) => (
            <AmenityDisplay
              key={index}
              title={amenity.title}
              description={amenity.description}
              image={amenity.image}
              imagePosition={index % 2 === 0 ? 'left' : 'right'}
              features={amenity.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AmenitiesPage;