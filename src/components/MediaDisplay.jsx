import React from "react";
import { Link } from "react-router-dom";

function MediaDisplay({ src, type = "image", alt, linkTo }) {
  const isVideo = type.toLowerCase() === "video";

  return (
    <Link
      to={linkTo || "#"}
      className="group relative rounded-lg overflow-hidden shadow-lg w-full h-52 perspective-1000"
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
              title={alt}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
      <div className="absolute inset-0 group-hover:translate-z-10 transition-transform duration-300" />
    </Link>
  );
}

export default MediaDisplay;