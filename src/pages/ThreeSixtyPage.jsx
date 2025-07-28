import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackgroundSlider from "../components/BackgroundSlider";
import ApartmentLayout from "../components/ApartmentLayout";
import TowerNavigation from "../components/TowerNavigation";

const TYPOLOGIES_BY_TOWER = {
  torre1: ["Tipología A", "Tipología B/D/E", "Tipología C/F"],
  torre2: ["Tipología A/B"],
};

function ThreeSixtyPage() {
  const location = useLocation();
  const [selectedTower, setSelectedTower] = useState("torre1");
  const typologies = TYPOLOGIES_BY_TOWER[selectedTower] || [];

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="relative min-h-screen">
      <BackgroundSlider />
      <TowerNavigation onTowerChange={setSelectedTower} />
      
      <div className="container mx-auto px-4 py-20 mt-16 text-center">
        <section>
          <h2 className="text-2xl font-bold mb-6">Explora las tipologías en 360°</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {typologies.map((typology) => (
              <ApartmentLayout
                key={typology}
                tower={selectedTower}
                typology={typology}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ThreeSixtyPage;