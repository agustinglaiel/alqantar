import React, { useState, useEffect } from "react";
import ProgressiveImage from "../components/ProgressiveImage";
import Page from "../components/ui/Page";
import project from "../data/project";

function MasterplanPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { metrics } = project;
  // en-US formatting preserves the comma-thousands look this page already had.
  const features = [
    `M2 DE CONSTRUCCIÓN: ${metrics.constructionM2.toLocaleString("en-US")} m²`,
    `SUPERFICIE DEL TERRENO: ${metrics.landM2.toLocaleString("en-US")} m²`,
    "36 UNIDADES DE 3 y 2 DORMITORIOS CON 2 COCHERAS SUBTERRÁNEAS Y BAULERA",
    "18 UNIDADES DE 3 DORMITORIOS VIP CON 3 COCHERAS SUBTERRÁNEAS Y BAULERA",
    "ETAPA 1: TORRE 1 | ETAPA 2: TORRE 2 | ETAPA 3: TORRES VIPs",
    `SUPERFICIE DE ESPACIOS VERDES: ${metrics.greenSpaceM2.toLocaleString("en-US")} m²`,
    "GIMNASIO",
    "SAUNA",
    "SALA DE RELAX",
    "SOLARIUM HÚMEDO",
    "SOLARIUM SECO",
    `PISCHINA DE ${metrics.poolLengthM} M DE LARGO`,
    `3 QUINCHOS CON CAPACIDAD DE ${metrics.sumCapacity} PERSONAS`,
    "COWORKING Y OFICINA PRIVADA",
    `${metrics.typologiesCount} TIPOLOGÍAS`,
    `${metrics.parkingCourtesy} COCHERAS DE CORTESÍA`,
  ];

  return(
    <Page>
      <div className="w-full px-4 py-10 text-center">
        {/* Contenedor con posición relativa para el overlay */}
        <div className="relative">
          <ProgressiveImage
            src="/images/planimetria.webp"
            alt="Planimetría"
            sizes="100vw"
            priority
            className="w-full"
          />
          
          {/* Overlay con información */}
          <div className="pointer-events-none absolute inset-0">
            <div className="ml-auto flex h-full w-1/2 flex-col items-start justify-center p-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`mb-3 rounded-lg bg-white/70 p-3 text-sm text-black transition-all duration-300 md:text-base ${
                    scrollY > 50 + (index * 20) 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-10 opacity-0'
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
        
        <ProgressiveImage
          src="/images/corte.webp"
          alt="Corte"
          sizes="100vw"
          className="mt-4 h-96 w-full"
        />
      </div>
    </Page>
  )
}

export default MasterplanPage;