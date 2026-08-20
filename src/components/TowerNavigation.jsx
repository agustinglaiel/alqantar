import React, { useState } from 'react';

const TOWERS = [
  { id: 'torre1', name: 'Torres 1 y 2' },
  { id: 'torre2', name: 'Torres VIP' },
];

function TowerNavigation({ onTowerChange, showAmenities = false }) {
  const [activeTower, setActiveTower] = useState('torre1');

  // Crear array de opciones dinámicamente
  const navigationOptions = [
    ...TOWERS,
    ...(showAmenities ? [{ id: 'amenities', name: 'Amenities' }] : [])
  ];

  const handleTowerSelect = (towerId) => {
    setActiveTower(towerId);
    onTowerChange?.(towerId);
  };

  // Calcular el índice de la opción activa
  const activeIndex = navigationOptions.findIndex(option => option.id === activeTower);

  return (
    <div className="relative z-20 w-full">
      <div className="absolute left-1/2 top-8 w-11/12 max-w-2xl -translate-x-1/2">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-xl">
          <div className="relative flex overflow-hidden rounded-xl">
            <div 
              className="absolute left-0 top-0 h-full rounded-xl border border-white/30 bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg transition-transform duration-500 ease-out"
              style={{
                width:     `${100 / navigationOptions.length}%`,
                transform: `translateX(${activeIndex * 100}%)`
              }}
            />
            
            {navigationOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleTowerSelect(option.id)}
                className={`
                  relative flex-1 px-6 py-4 transition-all duration-300 ease-out
                  ${activeTower === option.id 
                    ? 'font-semibold text-white' 
                    : 'text-gray-500 hover:bg-white/5 hover:text-gray-800'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-lg font-medium">{option.name}</span>
                  <span className="text-xs opacity-80">{option.description}</span>
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