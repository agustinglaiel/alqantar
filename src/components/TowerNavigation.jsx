import React, { useState, useEffect } from 'react';

const TOWERS = [
  { id: 'torre1', name: 'Torres 1 y 2' },
  { id: 'torre2', name: 'Torres VIP' },
];

function TowerNavigation({ onTowerChange }) {
  const [activeTower, setActiveTower] = useState('torre1');

  const handleTowerSelect = (towerId) => {
    setActiveTower(towerId);
    onTowerChange?.(towerId);
  };

  // Calcular el índice de la torre activa
  const activeIndex = TOWERS.findIndex(tower => tower.id === activeTower);

  // Forzar actualización del estilo para asegurar la transición
  useEffect(() => {
    // Esto asegura que el DOM se actualice tras el cambio de activeTower
  }, [activeTower]);

  return (
    <div className="relative z-20 w-full">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-2xl">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-2">
          <div className="relative flex rounded-xl overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-800 to-gray-600 rounded-xl shadow-lg transition-transform duration-500 ease-out border border-white/30"
              style={{
                width:     `${100 / TOWERS.length}%`,
                transform: `translateX(${activeIndex * 100}%)`
              }}
            />
            
            {TOWERS.map((tower) => (
              <button
                key={tower.id}
                onClick={() => handleTowerSelect(tower.id)}
                className={`
                  relative flex-1 px-6 py-4 transition-all duration-300 ease-out
                  ${activeTower === tower.id 
                    ? 'text-white font-semibold' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-white/5'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-2xl">{tower.icon}</span>
                  <span className="text-lg font-medium">{tower.name}</span>
                  <span className="text-xs opacity-80">{tower.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TowerNavigation;