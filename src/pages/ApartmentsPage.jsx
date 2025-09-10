import React, { useState } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import TowerNavigation from "../components/TowerNavigation";
import ApartmentLayout from "../components/ApartmentLayout";

// Mapeo de todas las tipologías (departamentos y lugares comunes) por torre
const TYPOLOGIES_BY_TOWER = {
  torre1: ["Tipología 1", "Tipología 2", "Tipología 3"], //, "Terraza/Quincho", "Subsuelo"
  torre2: ["Tipología 1"], //, "Terraza/Quincho", "Subsuelo"
};

function ApartmentsPage() {
  const [selectedTower, setSelectedTower] = useState("torre1");
  const typologies = TYPOLOGIES_BY_TOWER[selectedTower] || [];

  return (
    <div className="relative min-h-screen">
      <BackgroundSlider />
      <TowerNavigation onTowerChange={setSelectedTower} />

      <div className="container mx-auto px-4 py-20 mt-32 text-center">
        <section>
          {/* <h2 className="text-2xl font-bold mb-6">Departamentos</h2> */}
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

export default ApartmentsPage;