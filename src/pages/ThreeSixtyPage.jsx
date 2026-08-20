import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApartmentLayout from "../components/ApartmentLayout";
import AmenitieLayout from "../components/AmenitieLayout";
import TowerNavigation from "../components/TowerNavigation";
import FutureUpgrade from "../components/FutureUpgrade";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import units from "../data/units";

// URLs de Kuula para amenities (por ahora placeholder)
const AMENITIES_KUULA_URLS = {
  "sum": "https://kuula.co/share/collection/7DqTL?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1",
  "spa": "https://kuula.co/share/collection/7DTfh?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1"
};

function ThreeSixtyPage() {
  const location = useLocation();
  const [selectedTower, setSelectedTower] = useState("torre1");

  const handleOpenThreeSixty = (typology) => {
    const url = units[selectedTower]?.typologies?.[typology]?.kuulaUrl;
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleOpenAmenityThreeSixty = (amenityType) => {
    const url = AMENITIES_KUULA_URLS[amenityType];
    if (url && !url.includes('placeholder')) {
      window.open(url, '_blank');
    } else {
      // Por ahora, mostrar alerta de que está en desarrollo
      alert('Las vistas 360° de este amenity estarán disponibles próximamente.');
    }
  };

  const handleTowerChange = (towerId) => {
    setSelectedTower(towerId);
  };

  const renderContent = () => {
    if (selectedTower === 'amenities') {
      return (
        <div className="mx-auto grid max-w-4xl grid-cols-1 justify-center gap-8 md:grid-cols-2">
          <AmenitieLayout
            amenityType="sum"
            onCustomClick={handleOpenAmenityThreeSixty}
          />
          <AmenitieLayout
            amenityType="spa"
            onCustomClick={handleOpenAmenityThreeSixty}
          />
        </div>
      );
    }

    const typologies = Object.keys(units[selectedTower]?.typologies || {});

    if (typologies.length > 0) {
      return (
        <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {typologies.map((typology) => (
            <ApartmentLayout
              key={typology}
              tower={selectedTower}
              typology={typology}
              buttonText="Vistas 360"
              onCustomClick={handleOpenThreeSixty}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <div className="w-full max-w-2xl rounded-md bg-white shadow-sm">
          <FutureUpgrade
            title="Próximamente"
            message="Estamos trabajando en las vistas 360° de esta torre. Muy pronto vas a poder verlas acá."
            icon="clock"
            size="medium"
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <Page className="relative min-h-screen">
      <TowerNavigation onTowerChange={handleTowerChange} showAmenities={true} />

      <Container className="pb-20 text-center">
        <section>
          {renderContent()}
        </section>
      </Container>
    </Page>
  );
}

export default ThreeSixtyPage;
