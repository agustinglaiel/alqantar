import React from 'react';
import AvancesDisplay from '../components/AvancesDisplay';

export default function AvancesPage() {
  const metrics = [
    { label: 'Departamentos construidos', completed: 18, total: 70, colorClass: 'bg-cyan-500' },
    { label: 'Metros cuadrados construidos', completed: 1000, total: 5000, colorClass: 'bg-green-500' },
    { label: 'Unidades vendidas', completed: 2, total: 50, colorClass: 'bg-blue-500' },
    { label: 'Amenities construidos', completed: 3, total: 5, colorClass: 'bg-purple-500' },
  ];

  return (
    <div className="relative min-h-screen pt-32">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-12 relative">
          {/* Líneas divisorias - solo visibles en desktop */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
          <div className="absolute top-1/2 left-8 right-8 h-px bg-gray-200 transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-h-[500px]">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-center relative">
                {/* Línea separadora horizontal para móviles (excepto el último elemento) */}
                {index < metrics.length - 1 && (
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gray-200 md:hidden"></div>
                )}
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