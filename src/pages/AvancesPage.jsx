import React from 'react';
import BackgroundSlider from '../components/BackgroundSlider';  
import AvancesDisplay from '../components/AvancesDisplay';

export default function AvancesPage() {
  const metrics = [
    { label: 'Departamentos construidos', completed: 18, total: 70, colorClass: 'bg-cyan-500' },
    { label: 'Metros cuadrados construidos', completed: 1000, total: 5000, colorClass: 'bg-green-500' },
    { label: 'Unidades vendidas', completed: 2, total: 50, colorClass: 'bg-blue-500' },
    { label: 'Amenities construidos', completed: 3, total: 5, colorClass: 'bg-purple-500' },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100">
      <BackgroundSlider />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Avances del Proyecto
        </h2>
        
        {/* Modal más alto con grid 2x2 con líneas divisorias */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 relative">
          {/* Línea vertical divisoria */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gray-800 transform -translate-x-1/2"></div>
          {/* Línea horizontal divisoria */}
          <div className="absolute top-1/2 left-8 right-8 h-px bg-gray-800 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-2 gap-8 min-h-[500px]">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-center">
                <AvancesDisplay
                  label={metric.label}
                  completed={metric.completed}
                  total={metric.total}
                  colorClass={metric.colorClass}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}