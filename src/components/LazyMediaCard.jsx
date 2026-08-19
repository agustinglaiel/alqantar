import React from 'react';
import ProgressiveImage from './ProgressiveImage';

function LazyMediaCard({ src, type = "image", alt, onClick, className = "", imageFit = "cover", sizes = "100vw" }) {
  const isVideo = type.toLowerCase() === "video";

  return (
    <div
      onClick={onClick}
      className={`perspective-1000 group relative h-52 w-full cursor-pointer overflow-hidden rounded-lg shadow-lg ${className}`}
    >
      <div className="absolute size-full">
        {isVideo ? (
          <div className="flex size-full items-center justify-center bg-gray-800">
            <svg
              className="size-16 text-white opacity-70"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        ) : (
          <ProgressiveImage
            src={src}
            alt={alt}
            fit={imageFit}
            sizes={sizes}
            className="size-full"
            imgClassName={imageFit === "contain" ? "p-1" : ""}
          />
        )}
      </div>
      <div className="group-hover:translate-z-10 absolute inset-0 transition-transform duration-300" />

      {/* Overlay con ícono de zoom */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20">
        <svg
          className="size-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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

export default LazyMediaCard;
