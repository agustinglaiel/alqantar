import React, { useState, useEffect } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import TowerNavigation from "../components/TowerNavigation";

function ApartmentsPage(){
  const [selectedTower, setSelectedTower] = useState('torre1');

  const handleTowerChange = (towerId) => {
    setSelectedTower(towerId);
    console.log('Torre seleccionada:', towerId);
    // Aquí puedes agregar lógica adicional cuando cambie la torre
  };

  return(
    <div className="relative min-h-screen">
      <BackgroundSlider />
      <TowerNavigation onTowerChange={handleTowerChange} />
      <div className="container mx-auto px-4 py-20" />
    </div>
  );
}

export default ApartmentsPage;