import { useState } from "react";
import { BedDouble, Car, Layers } from "lucide-react";
import TowerNavigation from "../components/TowerNavigation";
import ApartmentLayout from "../components/ApartmentLayout";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Overline from "../components/ui/Overline";
import units from "../data/units";
import { whatsappLink } from "../data/project";

// Cifras de las Torres VIP (etapa 3 del masterplan) — mismos números citados
// en src/pages/MasterplanPage.jsx; esa torre todavía no tiene tipologías
// cargadas en src/data/units.js, así que no hay campo de datos del que
// derivarlas.
const VIP_FACTS = [
  { icon: BedDouble, value: "18", label: "Unidades de 3 dormitorios" },
  { icon: Car, value: "3", label: "Cocheras subterráneas por unidad" },
  { icon: Layers, value: "1", label: "Baulera por unidad" },
];

function ApartmentsPage() {
  const [selectedTower, setSelectedTower] = useState("torre1");
  const typologies = Object.keys(units[selectedTower]?.typologies || {});

  return (
    <Page className="min-h-svh bg-surface-alt">
      <Container className="pt-12 text-center">
        <PageHeader
          overline="Alqantar"
          title="Departamentos"
          description="Torres 1 y 2 ya en construcción; las Torres VIP son la próxima etapa del desarrollo."
        />
      </Container>

      <TowerNavigation onTowerChange={setSelectedTower} />

      <Container className="pb-20">
        {typologies.length > 0 ? (
          <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {typologies.map((typology) => (
              <ApartmentLayout key={typology} tower={selectedTower} typology={typology} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-md bg-surface p-8 text-center shadow-sm md:flex-row md:text-left">
            <div className="flex-1">
              <Overline>Etapa 3 del masterplan</Overline>
              <h2 className="mt-3 font-display text-h2 text-ink-900">Torres VIP</h2>
              <p className="mt-4 max-w-prose text-body text-ink-700">
                La última etapa de Alqantar suma unidades de mayor categoría, con
                más cocheras y espacio propio. Todavía no están a la venta: dejanos
                tu contacto para ser de los primeros en enterarte cuando se
                habiliten.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-4">
                {VIP_FACTS.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label}>
                      <Icon className="mx-auto size-5 text-accent-600 md:mx-0" aria-hidden="true" />
                      <dd className="mt-2 font-display text-h2 text-ink-900">{fact.value}</dd>
                      <dt className="text-caption text-ink-500">{fact.label}</dt>
                    </div>
                  );
                })}
              </dl>
              <Button
                href={whatsappLink(
                  "Hola, me interesa recibir información sobre las Torres VIP de Alqantar cuando estén disponibles."
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
                className="mt-8"
              >
                Quiero que me avisen
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Page>
  );
}

export default ApartmentsPage;
