import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env?.VITE_MAPBOX_ACCESS_TOKEN || "TU_TOKEN_PUBLICO_AQUI";

/**
 * The actual Mapbox map. Lives in its own file (D8) so `LocationPage` can
 * load it with `lazy()` — the ~1 MB `mapbox-gl` chunk only downloads once
 * the visitor clicks "Ver mapa interactivo", instead of on every `/ubicacion`
 * page load.
 *
 * @param {{lat: number, lng: number}} center
 */
function InteractiveMap({ center }) {
  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{ longitude: center.lng, latitude: center.lat, zoom: 15 }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker longitude={center.lng} latitude={center.lat} anchor="bottom">
        <div className="size-5 rounded-full border-2 border-surface bg-accent-600 shadow-md" />
      </Marker>
    </Map>
  );
}

export default InteractiveMap;
