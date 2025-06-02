import SectionWrapper from '../components/SectionWrapper';

function HomePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "../../public/images/logo.png" }}
    >
      <SectionWrapper className="pt-20 bg-gray-100 bg-opacity-80">
        <h2 className="text-4xl font-bold text-center mb-6 cursive">Bienvenidos a Alqantar</h2>
        <p className="text-lg text-center max-w-prose mx-auto">
          Explora nuestra colección de imágenes y videos, y contáctanos para cualquier consulta.
        </p>
      </SectionWrapper>
    </div>
  );
}

export default HomePage;