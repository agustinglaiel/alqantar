import { useState } from "react";
import TowerNavigation from "../components/TowerNavigation";
import ApartmentLayout from "../components/ApartmentLayout";
import FutureUpgrade from "../components/FutureUpgrade"; // 👈 nuevo
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import units from "../data/units";

function ApartmentsPage() {
  const [selectedTower, setSelectedTower] = useState("torre1");
  const typologies = Object.keys(units[selectedTower]?.typologies || {});

  return (
    <Page className="relative min-h-svh">
      <TowerNavigation onTowerChange={setSelectedTower} />

      <Container className="pb-20 text-center">
        <section>
          {typologies.length > 0 ? (
            <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {typologies.map((typology) => (
                <ApartmentLayout
                  key={typology}
                  tower={selectedTower}
                  typology={typology}
                  buttonText="Más información"
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-full max-w-2xl rounded-md bg-white shadow-sm">
                <FutureUpgrade
                  title="Próximamente"
                  message="Estamos trabajando en las tipologías de esta torre. Muy pronto vas a poder verlas acá."
                  icon="clock"
                  size="medium"
                />
              </div>
            </div>
          )}
        </section>
      </Container>
    </Page>
  );
}

export default ApartmentsPage;
