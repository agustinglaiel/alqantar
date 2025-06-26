import React from 'react';

export default function AvancesDisplay({ label, completed, total, colorClass = 'bg-cyan-500' }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Configuración del círculo más grande
  const size = 180;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Extraer el color del stroke desde la clase CSS
  const getStrokeColor = (colorClass) => {
    if (colorClass.includes('cyan')) return '#06b6d4';
    if (colorClass.includes('green')) return '#10b981';
    if (colorClass.includes('blue')) return '#3b82f6';
    if (colorClass.includes('red')) return '#ef4444';
    if (colorClass.includes('yellow')) return '#eab308';
    if (colorClass.includes('purple')) return '#a855f7';
    return '#06b6d4'; // Default cyan
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
        <svg 
          width={size} 
          height={size} 
          className="transform -rotate-90 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
        >
          {/* Círculo de fondo */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          {/* Círculo de progreso */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getStrokeColor(colorClass)}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Contenido centrado: porcentaje y label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-800 mb-1 transition-all duration-300">
            {percentage}%
          </span>
          <span className="text-xs font-medium text-gray-600 text-center leading-tight max-w-[140px] px-2 transition-all duration-300">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}