import ProgressiveImage from "../components/ProgressiveImage";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import project from "../data/project";

function MasterplanPage() {
  const { metrics } = project;

  // Los números venden solos (§7 del plan): reemplaza el overlay de 16
  // bloques de texto animados por scroll, ilegible en mobile.
  const stats = [
    { value: metrics.units, label: "Departamentos" },
    { value: metrics.typologiesCount, label: "Tipologías" },
    { value: metrics.parkingUnderground, label: "Cocheras subterráneas" },
    { value: metrics.parkingCourtesy, label: "Cocheras de cortesía" },
    { value: `${metrics.greenSpaceM2.toLocaleString("es-AR")} m²`, label: "Espacios verdes" },
    { value: `${Math.round(metrics.constructionM2).toLocaleString("es-AR")} m²`, label: "Superficie construida" },
  ];

  return (
    <Page>
      <Container className="py-12">
        <PageHeader
          overline="Alqantar"
          title="Masterplan"
          description={`Tres etapas sobre un mismo terreno de ${Math.round(metrics.landM2).toLocaleString("es-AR")} m²: Torre 1, Torre 2 y las Torres VIP.`}
          className="mb-10"
        />
      </Container>

      <ProgressiveImage
        src="/images/planimetria.webp"
        alt="Planimetría general del masterplan de Alqantar Condominio"
        sizes="100vw"
        priority
        className="w-full"
      />

      <Section>
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-display-l text-ink-900">{stat.value}</dd>
                <dt className="mt-2 text-body text-ink-500">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* corte.webp respeta su ratio nativo vía el manifest — antes forzaba
          h-96, lo que deformaba una imagen panorámica. */}
      <ProgressiveImage
        src="/images/corte.webp"
        alt="Corte arquitectónico del conjunto de torres de Alqantar Condominio"
        sizes="100vw"
        className="w-full"
      />

      <Section className="text-center">
        <Container>
          <Button to="/departamentos" variant="primary" size="lg">
            Ver tipologías
          </Button>
        </Container>
      </Section>
    </Page>
  );
}

export default MasterplanPage;
