import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import project, { addressFull } from "../data/project";

const MAPBOX_TOKEN =
  import.meta.env?.VITE_MAPBOX_ACCESS_TOKEN || "TU_TOKEN_PUBLICO_AQUI";

function LocationPage() {
  const [mapLocations] = useState([]);
  const mapCenter = project.coordinates;

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
      className="flex size-6 items-center justify-center rounded-full border-2 border-black bg-white text-[10px] font-bold"
      title={`Punto ${n}`}
    >
      {n}
    </div>
  );

  return (
    <Page className="min-h-full">
      <section className="py-12">
        <Container>
          <div className="mb-6 text-center">
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-600 transition-colors duration-200 hover:text-blue-500 hover:underline"
            >
              {addressFull}
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
                <div className="size-5 rounded-full border-2 border-white bg-red-500 shadow" />
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
        </Container>
      </section>
    </Page>
  );
}

export default LocationPage;
