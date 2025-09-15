import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApartmentLayout from "../components/ApartmentLayout";
import TowerNavigation from "../components/TowerNavigation";
import FutureUpgrade from "../components/FutureUpgrade";

const TYPOLOGIES_BY_TOWER = {
  torre1: ["Tipología 1", "Tipología 2", "Tipología 3"],
  // torre2: ["Tipología 1"],
};

// URLs de Kuula para cada tipología
const KUULA_URLS = {
  "Tipología 1": "https://kuula.co/share/collection/71rs9?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1",
  "Tipología 2": "https://kuula.co/share/collection/71yMy?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1",
  "Tipología 3": "https://kuula.co/share/collection/7DpJR?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1"
};

function ThreeSixtyPage() {
  const location = useLocation();
  const [selectedTower, setSelectedTower] = useState("torre1");
  const typologies = TYPOLOGIES_BY_TOWER[selectedTower] || [];

  const handleOpenThreeSixty = (typology) => {
    const url = KUULA_URLS[typology];
    if (url) {
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="relative min-h-screen pt-32">
      <TowerNavigation onTowerChange={setSelectedTower} />
      
      <div className="container mx-auto pt-40 px-4 pb-20 text-center">
        <section>
          {typologies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {typologies.map((typology) => (
                <ApartmentLayout
                  key={typology}
                  tower={selectedTower}
                  typology={typology}
                  buttonText="Vistas 360"
                  onCustomClick={handleOpenThreeSixty}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
                <FutureUpgrade
                  title="Próximamente"
                  message="Estamos trabajando en las vistas 360° de esta torre. Muy pronto vas a poder verlas acá."
                  icon="clock"  
                  size="medium"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ThreeSixtyPage;