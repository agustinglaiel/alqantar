import React, { useState } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Determinar cómo acceder a la variable de entorno según el entorno de compilación
const GOOGLE_MAPS_API_KEY =
  import.meta.env?.VITE_GOOGLE_MAPS_API_KEY || // Para Vite
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY || // Para CRA
  "TU_CLAVE_AQUI"; // Fallback para depuración (reemplaza con tu clave)

function LocationPage() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(null);

  // Log para depuración
  console.log("Google Maps API Key:", GOOGLE_MAPS_API_KEY);

  // Coordenadas de la ubicación (José María Eguía Zanón 9932, Villa Warcalde, Córdoba)
  const mapCenter = {
    lat: -31.3485,
    lng: -64.2157,
  };

  // Estilo del contenedor del mapa
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "12px",
    overflow: "hidden",
  };

  // Opciones del mapa
  const mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  const handleScriptError = () => {
    setScriptError(
      "No se pudo cargar el mapa. Por favor, verifica tu conexión o la clave de API."
    );
  };

  return (
    <div>
      <BackgroundSlider />
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            UBICACIÓN
          </h2>
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-600">
              José María Eguía Zanón 9932, Villa Warcalde, Córdoba
            </p>
          </div>
          {scriptError ? (
            <div className="text-center text-red-500">{scriptError}</div>
          ) : (
            <LoadScript
              googleMapsApiKey={GOOGLE_MAPS_API_KEY}
              onLoad={handleScriptLoad}
              onError={handleScriptError}
            >
              {isScriptLoaded ? (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={15}
                  options={mapOptions}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              ) : (
                <div className="text-center text-gray-500">
                  Cargando el mapa...
                </div>
              )}
            </LoadScript>
          )}
        </div>
      </section>
    </div>
  );
}

export default LocationPage;
