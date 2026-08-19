import React from 'react';

export default function AvancesDisplay({ label, completed, total, colorClass = 'bg-cyan-500' }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Configuración del círculo - usando valores fijos que se adaptan con CSS
  const sizeMobile = 120;
  const sizeDesktop = 180;
  const radiusMobile = (sizeMobile - 8) / 2; // Stroke más delgado en móvil
  const radiusDesktop = (sizeDesktop - 12) / 2;
  const circumferenceMobile = 2 * Math.PI * radiusMobile;
  const circumferenceDesktop = 2 * Math.PI * radiusDesktop;

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
    <div className="flex flex-col items-center justify-center p-2 md:p-4">
      <div className="group relative cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-110">
        {/* SVG para móviles */}
        <svg 
          width={sizeMobile} 
          height={sizeMobile} 
          className="-rotate-90 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl md:hidden"
        >
          {/* Círculo de fondo móvil */}
          <circle
            cx={sizeMobile / 2}
            cy={sizeMobile / 2}
            r={radiusMobile}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Círculo de progreso móvil */}
          <circle
            cx={sizeMobile / 2}
            cy={sizeMobile / 2}
            r={radiusMobile}
            stroke={getStrokeColor(colorClass)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumferenceMobile}
            strokeDashoffset={circumferenceMobile - (percentage / 100) * circumferenceMobile}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* SVG para desktop */}
        <svg 
          width={sizeDesktop} 
          height={sizeDesktop} 
          className="hidden -rotate-90 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl md:block"
        >
          {/* Círculo de fondo desktop */}
          <circle
            cx={sizeDesktop / 2}
            cy={sizeDesktop / 2}
            r={radiusDesktop}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          {/* Círculo de progreso desktop */}
          <circle
            cx={sizeDesktop / 2}
            cy={sizeDesktop / 2}
            r={radiusDesktop}
            stroke={getStrokeColor(colorClass)}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumferenceDesktop}
            strokeDashoffset={circumferenceDesktop - (percentage / 100) * circumferenceDesktop}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Contenido centrado: porcentaje y label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="mb-1 text-lg font-bold text-gray-800 transition-all duration-300 md:text-3xl">
            {percentage}%
          </span>
          <span className="max-w-[90px] px-1 text-center text-xs font-medium leading-tight text-gray-600 transition-all duration-300 md:max-w-[140px] md:px-2">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}