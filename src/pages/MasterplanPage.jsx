import React, { useState, useEffect } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import Header from "../components/Header";

function MasterplanPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    "M2 DE CONSTRUCCIÓN: 18,439.62 m²",
    "SUPERFICIE DEL TERRENO: 15,576.8 m²",
    "36 UNIDADES DE 3 y 2 DORMITORIOS CON 2 COCHERAS SUBTERRÁNEAS Y BAULERA",
    "18 UNIDADES DE 3 DORMITORIOS VIP CON 3 COCHERAS SUBTERRÁNEAS Y BAULERA",
    "ETAPA 1: TORRE 1 | ETAPA 2: TORRE 2 | ETAPA 3: TORRES VIPs",
    "SUPERFICIE DE ESPACIOS VERDES: 12,300 m²",
    "GIMNASIO",
    "SAUNA",
    "SALA DE RELAX",
    "SOLARIUM HÚMEDO",
    "SOLARIUM SECO",
    "PISCHINA DE 24.3 M DE LARGO",
    "3 QUINCHOS CON CAPACIDAD DE 25 PERSONAS",
    "COWORKING Y OFICINA PRIVADA",
    "4 TIPOLOGÍAS",
    "35 COCHERAS DE CORTESÍA"
  ];

  return(
    <div>
      <div className="w-full text-center py-10 pt-32 px-4">
        {/* Contenedor con posición relativa para el overlay */}
        <div className="relative">
          <img 
            src="/images/planimetria.png" 
            alt="Planimetría" 
            className="w-full h-auto object-cover"
          />
          
          {/* Overlay con información */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-full w-1/2 ml-auto flex flex-col justify-center items-start p-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`mb-3 p-3 bg-opacity-70 bg-white text-black rounded-lg text-sm md:text-base transition-all duration-300 transform ${
                    scrollY > 50 + (index * 20) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-10'
                  }`}
                  style={{
                    transitionDelay: `${index * 80}ms`
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <img 
          src="/images/corte.png" 
          alt="Corte" 
          className="w-full h-96 object-cover mt-4"
        />
      </div>
    </div>
  )
}

export default MasterplanPage;