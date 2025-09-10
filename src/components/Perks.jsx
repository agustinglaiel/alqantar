import React from "react";
import { 
  FaBuilding, 
  FaCar, 
  FaBed, 
  FaUsers, 
  FaDumbbell, 
  FaSwimmingPool, 
  FaRegBuilding, 
  FaThermometerHalf, 
  FaTree, 
  FaShieldAlt, 
  FaMapMarkerAlt 
} from "react-icons/fa";

function Perks() {
  const perks = [
    {
      icon: FaBuilding,
      title: "54 Unidades",
      description: "Espacios residenciales modernos y funcionales diseñados para tu comodidad."
    },
    {
      icon: FaCar,
      title: "126 Cocheras Subterráneas",
      description: "Estacionamiento seguro y amplio para todos los residentes."
    },
    {
      icon: FaCar,
      title: "35 Cocheras de Cortesía",
      description: "Estacionamiento seguro y amplio para tus invitados."
    },
    {
      icon: FaBed,
      title: "Tipologías de 2 y 3 Dormitorios",
      description: "Opciones variadas para adaptarse a tus necesidades familiares."
    },
    {
      icon: FaUsers,
      title: "Espacio Co-working",
      description: "Área de trabajo compartida con oficinas privadas equipadas."
    },
    {
      icon: FaDumbbell,
      title: "Gimnasio",
      description: "Sala de entrenamiento con equipos de última generación."
    },
    {
      icon: FaSwimmingPool,
      title: "Piscina",
      description: "Piscina para relajarte y disfrutar del verano."
    },
    {
      icon: FaRegBuilding,
      title: "SUM",
      description: "Sala de usos múltiples para eventos y reuniones sociales."
    },
    {
      icon: FaThermometerHalf,
      title: "Sauna",
      description: "Zona de relajación con sauna para tu bienestar."
    },
    {
      icon: FaTree,
      title: "12.300 m² de Espacios Verdes",
      description: "Jardines y áreas naturales para conectar con la naturaleza."
    },
    {
      icon: FaShieldAlt,
      title: "Seguridad 24 hs",
      description: "Protección constante con sistemas de vigilancia avanzados."
    },
    {
      icon: FaMapMarkerAlt,
      title: "Entorno Incomparable",
      description: "Ubicación en Villa Warcalde, Córdoba"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg my-12">
      <div className="p-4 md:p-8">
        <div className="flex flex-wrap justify-center gap-6">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-600">{perk.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Perks;