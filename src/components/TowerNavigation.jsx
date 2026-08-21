import { useState } from "react";

const TOWERS = [
  { id: "torre1", name: "Torres 1 y 2" },
  { id: "torre2", name: "Torres VIP" },
];

/**
 * Switches between towers (and optionally amenities) for pages that group
 * content by tower. Normal document flow — callers don't need to
 * compensate with extra top padding for an absolutely positioned nav.
 *
 * @param {(id: string) => void} [onTowerChange]
 * @param {boolean} [showAmenities=false] - append an "Amenities" tab
 */
function TowerNavigation({ onTowerChange, showAmenities = false }) {
  const [activeTower, setActiveTower] = useState("torre1");

  const navigationOptions = [
    ...TOWERS,
    ...(showAmenities ? [{ id: "amenities", name: "Amenities" }] : []),
  ];

  const handleTowerSelect = (towerId) => {
    setActiveTower(towerId);
    onTowerChange?.(towerId);
  };

  const activeIndex = navigationOptions.findIndex((option) => option.id === activeTower);
  // A partir de 3 tabs, w-11/12 a 360px queda al límite (§3.8/M7): el pill
  // deja de repartir el ancho a partes iguales y en cambio scrollea, sin
  // romper la animación (que asume tabs de igual ancho entre sí).
  const isScrollable = navigationOptions.length > 2;

  return (
    <div className="mx-auto w-11/12 max-w-2xl py-6">
      <div
        className={`rounded-md border border-line bg-surface/90 p-2 shadow-sm backdrop-blur-xl ${
          isScrollable ? "no-scrollbar overflow-x-auto" : ""
        }`}
      >
        <div
          className={`relative flex overflow-hidden rounded-sm ${isScrollable ? "min-w-max" : ""}`}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-sm bg-accent-600 shadow-sm transition-transform duration-base ease-out"
            style={{
              width: `${100 / navigationOptions.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />

          {navigationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleTowerSelect(option.id)}
              className={`relative flex-1 p-4 text-body font-medium transition-colors duration-base ease-out ${
                isScrollable ? "min-w-[110px]" : ""
              } ${activeTower === option.id ? "text-white" : "text-ink-700 hover:text-ink-900"}`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TowerNavigation;
