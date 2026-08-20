import { useNavigate } from 'react-router-dom';
import { BedDouble, Car, Ruler } from 'lucide-react';
import ApartmentImage from './ApartmentImage';
import Button from './ui/Button';
import units from '../data/units';

/**
 * Summary card for a typology (used on `/departamentos`). Surfaces the 3
 * facts that actually drive a decision — dormitorios, superficie, cocheras —
 * instead of the old arrow-paginated carousel of 11 icons. Full detail lives
 * one click away on the ficha.
 *
 * @param {string} tower
 * @param {string} typology
 * @param {string} [buttonText="Más información"]
 * @param {(typology: string) => void} [onCustomClick]
 */
function ApartmentLayout({ tower, typology, buttonText = "Ver ficha completa", onCustomClick }) {
  const navigate = useNavigate();
  const data = units[tower]?.typologies?.[typology];

  const bedrooms = data?.features?.find((f) => f.icon === "BedDouble")?.value;
  const parking = data?.features?.find((f) => f.icon === "Car")?.value;
  const surface = data?.superficieTotal;
  const number = typology.includes('Tipología') ? typology.split(' ')[1] : typology;

  const handleOpenDetails = () => {
    if (onCustomClick) {
      onCustomClick(typology);
    } else {
      navigate(`/ficha/${tower}/${encodeURIComponent(typology)}`);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-md bg-surface shadow-sm">
      <ApartmentImage tower={tower} typology={typology} />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-baseline justify-between">
          {/* h2, no h3: en /departamentos es el primer nivel de heading debajo
              del h1 de la página (no hay un h2 intermedio que lo preceda). */}
          <h2 className="text-h3 font-semibold text-ink-900">Tipología {number}</h2>
          {surface && <span className="text-caption text-ink-500">{surface} totales</span>}
        </div>

        <dl className="grid grid-cols-3 gap-2 border-y border-line py-4 text-center">
          <div>
            <BedDouble className="mx-auto size-5 text-accent-600" aria-hidden="true" />
            <dd className="mt-1 text-body font-semibold text-ink-900">{bedrooms ?? "—"}</dd>
            <dt className="text-caption text-ink-500">Dormitorios</dt>
          </div>
          <div>
            <Ruler className="mx-auto size-5 text-accent-600" aria-hidden="true" />
            <dd className="mt-1 text-body font-semibold text-ink-900">{surface ?? "—"}</dd>
            <dt className="text-caption text-ink-500">Superficie</dt>
          </div>
          <div>
            <Car className="mx-auto size-5 text-accent-600" aria-hidden="true" />
            <dd className="mt-1 text-body font-semibold text-ink-900">{parking ?? "—"}</dd>
            <dt className="text-caption text-ink-500">Cocheras</dt>
          </div>
        </dl>

        <Button onClick={handleOpenDetails} variant="ghost" className="mt-auto justify-center">
          {buttonText} →
        </Button>
      </div>
    </div>
  );
}

export default ApartmentLayout;
