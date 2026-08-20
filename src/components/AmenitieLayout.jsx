import ProgressiveImage from './ProgressiveImage';
import Button from './ui/Button';

function AmenitieLayout({ amenityType, onCustomClick }) {
  // Configuración para cada tipo de amenity
  const amenityConfig = {
    'sum': {
      title: 'SUM Privado',
      description: 'Salones amplios y equipados',
      image: '/images/amenities/15.webp'
    },
    'spa': {
      title: 'Gimnasio & Spa & Relax',
      description: 'Gimnasio, Sauna y Sala de relax',
      image: '/images/amenities/03.webp'
    }
  };

  const config = amenityConfig[amenityType] || amenityConfig['sum'];

  const handleClick = () => {
    if (onCustomClick) {
      onCustomClick(amenityType);
    }
  };

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-sm flex-col overflow-hidden rounded-md bg-white shadow-sm">
      {/* Sección superior: Imagen (70% del espacio) */}
      <div className="relative h-64 overflow-hidden">
        <ProgressiveImage
          src={config.image}
          alt={config.title}
          sizes="384px"
          className="size-full"
        />
      </div>

      {/* Sección media: Título y descripción (20% del espacio) */}
      <div className="flex flex-1 flex-col justify-center p-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          {config.title}
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          {config.description}
        </p>
      </div>

      {/* Sección inferior: Botón (10% del espacio) */}
      <div className="p-4 pt-0">
        <Button onClick={handleClick} variant="primary" className="w-full">
          Vistas 360°
        </Button>
      </div>
    </div>
  );
}

export default AmenitieLayout;