import React, { useState } from "react";
import TowerNavigation from "../components/TowerNavigation";
import ApartmentLayout from "../components/ApartmentLayout";
import FutureUpgrade from "../components/FutureUpgrade"; // 👈 nuevo

// Mapeo de tipologías por torre
const TYPOLOGIES_BY_TOWER = {
  torre1: ["Tipología 1", "Tipología 2", "Tipología 3"],
  // torre2: [], // si no hay tipologías, dejá el array vacío o directamente omití la clave
};

function ApartmentsPage() {
  const [selectedTower, setSelectedTower] = useState("torre1");
  const typologies = TYPOLOGIES_BY_TOWER[selectedTower] || [];

  return (
    <div className="relative min-h-svh pt-32">
      <TowerNavigation onTowerChange={setSelectedTower} 
    />

      <div className="container mx-auto pt-40 px-4 pb-20 text-center">
        <section>
          {typologies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {typologies.map((typology) => (
                <ApartmentLayout
                  key={typology}
                  tower={selectedTower}
                  typology={typology}
                  buttonText="Más información"
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
                <FutureUpgrade
                  title="Próximamente"
                  message="Estamos trabajando en las tipologías de esta torre. Muy pronto vas a poder verlas acá."
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

export default ApartmentsPage;
