import AvancesDisplay from "../components/AvancesDisplay";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";

// "18 de 70 departamentos" sin fecha lee como incertidumbre, no como
// progreso: se agrega cuándo se actualizó por última vez.
const LAST_UPDATED = "20 de agosto de 2026";

const METRICS = [
  { label: "Departamentos construidos", completed: 18, total: 70 },
  { label: "Metros cuadrados construidos", completed: 1000, total: 5000 },
  { label: "Unidades vendidas", completed: 2, total: 50 },
  { label: "Amenities construidos", completed: 3, total: 5 },
];

export default function AvancesPage() {
  return (
    <Page>
      <Container className="pt-12 text-center">
        <PageHeader
          overline="Alqantar"
          title="Avances de obra"
          description={`Estado de la construcción, actualizado al ${LAST_UPDATED}.`}
        />
      </Container>

      <Container className="pb-20">
        <div className="rounded-md bg-surface p-6 shadow-sm md:p-12">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-8">
            {METRICS.map((metric) => (
              <AvancesDisplay key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </Container>
    </Page>
  );
}
