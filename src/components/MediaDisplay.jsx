import React from "react";
import { Link } from "react-router-dom";

function MediaDisplay({ src, type = "image", alt, title, linkTo, caption }) {
  const isVideo = type.toLowerCase() === "video";

  return (
    <Link
      to={linkTo || "#"}
      className="group relative rounded-lg overflow-hidden shadow-lg w-full h-64 perspective-1000"
    >
      <div className="absolute w-full h-full">
        <div
          className={`w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105 ${
            isVideo ? "bg-transparent" : ""
          }`}
          style={isVideo ? {} : { backgroundImage: `url(${src})` }}
        >
          {isVideo && (
            <iframe
              className="w-full h-full"
              src={src}
              title={title || alt}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60" />
      </div>
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center w-full">
          <h3 className="text-white text-xl font-semibold text-center">
            {title || alt}
          </h3>
          {caption && (
            <p className="text-white text-sm text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {caption}
            </p>
          )}
        </div>
      </div>
      <div className="absolute inset-0 group-hover:translate-z-10 transition-transform duration-300" />
    </Link>
  );
}

export default MediaDisplay;