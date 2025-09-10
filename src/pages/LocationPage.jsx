import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import BackgroundSlider from "../components/BackgroundSlider";

const MAPBOX_TOKEN =
  import.meta.env?.VITE_MAPBOX_ACCESS_TOKEN ||
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ||
  "TU_TOKEN_PUBLICO_AQUI";

function LocationPage() {
  const [mapLocations, setMapLocations] = useState([]);
  const mapCenter = { lat: -31.33593, lng: -64.30234 };

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "12px",
    overflow: "hidden",
  };

  const googleMapsLink = `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}`;

  // marcador SVG numerado (equivalente a tu customMarker de Google)
  const NumberMarker = ({ n }) => (
    <div
      className="w-6 h-6 flex items-center justify-center bg-white border-2 border-black rounded-full text-[10px] font-bold"
      title={`Punto ${n}`}
    >
      {n}
    </div>
  );

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

          <div style={mapContainerStyle}>
            <Map
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{
                longitude: mapCenter.lng,
                latitude: mapCenter.lat,
                zoom: 15,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              {/* Marcador central */}
              <Marker longitude={mapCenter.lng} latitude={mapCenter.lat} anchor="bottom">
                <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow" />
              </Marker>

              {/* Otros marcadores, numerados */}
              {mapLocations.map((loc, i) => (
                <Marker key={i} longitude={loc.lng} latitude={loc.lat} anchor="bottom">
                  <NumberMarker n={i + 1} />
                </Marker>
              ))}
            </Map>
          </div>

          {/* <NearAttractions onOpen={(locations) => setMapLocations(locations)} /> */}
        </div>
      </section>
    </div>
  );
}

export default LocationPage;
