import React from 'react';

function FutureUpgrade({ 
  title = "Próximamente",
  message = "Estamos trabajando para traerte esta funcionalidad muy pronto",
  icon = "construction",
  className = "",
  size = "medium"
}) {
  // Diferentes iconos disponibles
  const icons = {
    construction: (
      <svg className="w-full h-full text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    rocket: (
      <svg className="w-full h-full text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    sparkles: (
      <svg className="w-full h-full text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM15 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2zM5 15a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2z" />
      </svg>
    ),
    clock: (
      <svg className="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    heart: (
      <svg className="w-full h-full text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    gear: (
      <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  // Tamaños disponibles
  const sizes = {
    small: {
      container: "py-8 px-4",
      icon: "w-12 h-12 mb-4",
      title: "text-lg",
      message: "text-sm",
      dots: "w-1 h-1"
    },
    medium: {
      container: "py-12 px-6",
      icon: "w-16 h-16 mb-6",
      title: "text-xl",
      message: "text-base",
      dots: "w-1.5 h-1.5"
    },
    large: {
      container: "py-16 px-8",
      icon: "w-20 h-20 mb-8",
      title: "text-2xl",
      message: "text-lg",
      dots: "w-2 h-2"
    }
  };

  const currentSize = sizes[size] || sizes.medium;
  const selectedIcon = icons[icon] || icons.construction;

  return (
    <div className={`flex flex-col items-center justify-center text-center ${currentSize.container} ${className}`}>
      {/* Icono con animación */}
      <div className={`${currentSize.icon} relative`}>
        <div className="animate-bounce">
          {selectedIcon}
        </div>
        
        {/* Efecto de brillo/pulso sincronizado */}
        <div className="absolute inset-0 opacity-20" style={{ animation: 'ping 1s infinite 0.5s' }}>
          {selectedIcon}
        </div>
      </div>

      {/* Título */}
      <h3 className={`font-bold text-gray-800 mb-3 ${currentSize.title}`}>
        {title}
      </h3>

      {/* Mensaje */}
      <p className={`text-gray-600 max-w-md leading-relaxed mb-6 ${currentSize.message}`}>
        {message}
      </p>

      {/* Puntos animados decorativos */}
      <div className="flex space-x-2">
        <div 
          className={`${currentSize.dots} bg-blue-400 rounded-full animate-pulse`}
          style={{ animationDelay: '0ms', animationDuration: '1.5s' }}
        />
        <div 
          className={`${currentSize.dots} bg-purple-400 rounded-full animate-pulse`}
          style={{ animationDelay: '300ms', animationDuration: '1.5s' }}
        />
        <div 
          className={`${currentSize.dots} bg-green-400 rounded-full animate-pulse`}
          style={{ animationDelay: '600ms', animationDuration: '1.5s' }}
        />
      </div>

      {/* Texto adicional sutil */}
      <div className="mt-4 text-xs text-gray-400 flex items-center space-x-1">
        <span>Gracias por su paciencia</span>
      </div>
    </div>
  );
}

export default FutureUpgrade;