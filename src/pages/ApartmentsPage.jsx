// src/pages/ApartmentsPage.jsx
import React, { useState } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import TowerNavigation from "../components/TowerNavigation";
import ApartmentLayout from "../components/ApartmentLayout";

// Mapeo de qué departamentos existen en cada torre
const TYPOLOGIES_BY_TOWER = {
  torre1: ["Departamento A", "Departamento B/D/E", "Departamento C/F"],
  torre2: ["Departamento A/B"],
  torre3: ["Departamento A", "Departamento B", "Departamento C"],
  amenities: ["Piscina", "Gimnasio", "Sauna", "SPA"],
};

function ApartmentsPage() {
  const [selectedTower, setSelectedTower] = useState("torre1");

  const handleTowerChange = (towerId) => {
    setSelectedTower(towerId);
  };

  // Solo las tipologías de la torre activa
  const availableTypologies = TYPOLOGIES_BY_TOWER[selectedTower] || [];

  return (
    <div className="relative min-h-screen">
      <BackgroundSlider />
      <TowerNavigation onTowerChange={handleTowerChange} />

      <div className="container mx-auto px-4 py-20 mt-8 space-y-8">
        {availableTypologies.map((typology) => (
          <ApartmentLayout
            key={typology}
            tower={selectedTower}
            typology={typology}
          />
        ))}
      </div>
    </div>
  );
}

export default ApartmentsPage;
