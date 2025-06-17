import React, { useState } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import TowerNavigation from "../components/TowerNavigation";
import ApartmentLayout from "../components/ApartmentLayout";

// Mapeo de departamentos por torre
const DEPARTMENTS_BY_TOWER = {
  torre1: ["Departamento A", "Departamento B/D/E", "Departamento C/F"],
  torre2: ["Departamento A/B"],
  torre3: ["Departamento A", "Departamento B", "Departamento C"],
  amenities: ["Piscina", "Gimnasio", "Sauna", "SPA"],
};

// Todos los Lugares Comunes aplican a cada torre
const COMMON_AREAS = ["Terraza/Quincho", "Subsuelo"];

function ApartmentsPage() {
  const [selectedTower, setSelectedTower] = useState("torre1");
  const departments = DEPARTMENTS_BY_TOWER[selectedTower] || [];

  return (
    <div className="relative min-h-screen">
      <BackgroundSlider />
      <TowerNavigation onTowerChange={setSelectedTower} />

      <div className="container mx-auto px-4 py-20 space-y-8 mt-16 text-center">
        {/* ——— Sección Departamentos ——— */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Departamentos</h2>
          <div className="space-y-8">
            {departments.map((typology) => (
              <ApartmentLayout
                key={typology}
                tower={selectedTower}
                typology={typology}
              />
            ))}
          </div>
        </section>

        {/* ——— Sección Lugares Comunes ——— */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Lugares Comunes</h2>
          <div className="space-y-8">
            {COMMON_AREAS.map((typology) => (
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
