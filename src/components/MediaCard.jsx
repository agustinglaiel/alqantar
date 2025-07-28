import React from "react";

function MediaCard({ src, type = "image", alt, onClick, className, imageFit = "cover" }) {
  const isVideo = type.toLowerCase() === "video";

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-lg overflow-hidden shadow-lg w-full h-52 perspective-1000 cursor-pointer ${className}`}
    >
      <div className="absolute w-full h-full">
        <div
          className={`w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105 ${
            isVideo ? "bg-transparent" : `bg-gray-100 ${imageFit === "contain" ? "bg-center" : ""}`
          }`}
          style={isVideo ? {} : { backgroundImage: `url(${src})` }}
        >
          {isVideo ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white opacity-70"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-${imageFit} ${imageFit === "contain" ? "p-1" : ""}`}
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 group-hover:translate-z-10 transition-transform duration-300" />
      
      {/* Overlay con ícono de zoom */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </div>
    </div>
  );
}

export default MediaCard;