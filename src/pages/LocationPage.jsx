import React, { useState, useEffect } from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import NearAttractions from "../components/NearAttractions";

// Determinar cómo acceder a la variable de entorno según el entorno de compilación
const GOOGLE_MAPS_API_KEY =
  import.meta.env?.VITE_GOOGLE_MAPS_API_KEY ||
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  "TU_CLAVE_AQUI";

function LocationPage() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [mapLocations, setMapLocations] = useState([]);
  const MAX_RETRIES = 3;

  const mapCenter = { lat: -31.33593, lng: -64.30234 };
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "12px",
    overflow: "hidden",
  };
  const mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };
  const googleMapsLink = `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}`;

  const handleScriptLoad = () => setIsScriptLoaded(true);
  const handleScriptError = () =>
    setScriptError(
      "No se pudo cargar el mapa. Verifica tu conexión o la clave de API."
    );

  useEffect(() => {
    if (!isScriptLoaded && !scriptError && retryCount < MAX_RETRIES) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setIsScriptLoaded(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isScriptLoaded, scriptError, retryCount]);

  useEffect(() => {
    if (retryCount >= MAX_RETRIES && !isScriptLoaded && !scriptError) {
      setScriptError(
        "No se pudo cargar el mapa después de varios intentos. Recarga la página."
      );
    }
  }, [retryCount, isScriptLoaded, scriptError]);

  // ---- corrección aquí ----
  const customMarker = (number) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="white" stroke="black" stroke-width="2"/>
        <text x="12" y="15" text-anchor="middle" fill="black" font-size="12" font-weight="bold">${number}</text>
      </svg>
    `;
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new window.google.maps.Size(24, 24),
    };
  };
  // --------------------------

  return (
    <div>
      <BackgroundSlider />
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            UBICACIÓN
          </h2>
          <div className="mb-6 text-center">
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-600 hover:text-blue-500 hover:underline transition-colors duration-200"
            >
              José María Eguía Zanón 9932, Villa Warcalde, Córdoba
            </a>
          </div>

          <div style={mapContainerStyle} className="relative">
            {scriptError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <p className="text-red-500 text-lg">{scriptError}</p>
              </div>
            ) : isScriptLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={15}
                options={mapOptions}
              >
                <Marker position={mapCenter} />
                {mapLocations.map((loc, i) => (
                  <Marker
                    key={i}
                    position={{ lat: loc.lat, lng: loc.lng }}
                    icon={customMarker(i + 1)}
                  />
                ))}
              </GoogleMap>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <p className="text-lg text-gray-700">Cargando el mapa...</p>
              </div>
            )}
          </div>

          {/* <NearAttractions onOpen={(locations) => setMapLocations(locations)} /> */}
        </div>
      </section>

      <LoadScript
        key={`load-script-${retryCount}`}
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
    </div>
  );
}

export default LocationPage;
