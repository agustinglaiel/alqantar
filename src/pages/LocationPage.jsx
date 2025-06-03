import React, { useState, useEffect } from "react";
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
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3; // Número máximo de intentos antes de mostrar un error

  // Log para depuración
  console.log("Google Maps API Key:", GOOGLE_MAPS_API_KEY);

  // Coordenadas de la ubicación (José María Eguía Zanón 9932, Villa Warcalde, Córdoba)
  const mapCenter = {
    lat: -31.33593,
    lng: -64.30234,
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
    console.log("Script de Google Maps cargado correctamente");
    setIsScriptLoaded(true);
  };

  const handleScriptError = () => {
    console.log("Error al cargar el script de Google Maps");
    setScriptError(
      "No se pudo cargar el mapa. Por favor, verifica tu conexión o la clave de API."
    );
  };

  // Temporizador para detectar si el script no se carga después de 5 segundos
  useEffect(() => {
    if (isScriptLoaded || scriptError || retryCount >= MAX_RETRIES) return;

    const timer = setTimeout(() => {
      if (!isScriptLoaded) {
        console.log(
          `El script no se cargó después de 5 segundos. Intentando de nuevo... (Intento ${retryCount + 1}/${MAX_RETRIES})`
        );
        setRetryCount((prev) => prev + 1);
        setIsScriptLoaded(false); // Forzar un reintento
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isScriptLoaded, scriptError, retryCount]);

  // Mostrar error si se agotan los intentos
  useEffect(() => {
    if (retryCount >= MAX_RETRIES && !isScriptLoaded && !scriptError) {
      setScriptError(
        "No se pudo cargar el mapa después de varios intentos. Por favor, recarga la página o verifica tu conexión."
      );
    }
  }, [retryCount, isScriptLoaded, scriptError]);

  return (
    <div>
      {scriptError ? (
        <div className="flex items-center justify-center h-screen bg-gray-200">
          <p className="text-red-500 text-xl">{scriptError}</p>
        </div>
      ) : isScriptLoaded ? (
        <>
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
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={15}
                options={mapOptions}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </div>
          </section>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-200">
          <p className="text-xl text-gray-700">Cargando el mapa...</p>
        </div>
      )}
      {/* Asegurar que LoadScript se monte siempre, con un key para forzar recarga */}
      <LoadScript
        key={`load-script-${retryCount}`} // Cambia el key para forzar remount
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
    </div>
  );
}

export default LocationPage;