import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApartmentImage from './ApartmentImage';
import ApartmentInfo from './ApartmentInfo';

function ApartmentLayout({ tower, typology, buttonText = "Más información", onCustomClick }) {
  const navigate = useNavigate();

  const handleOpenDetails = () => {
    if (onCustomClick) {
      onCustomClick(typology);
    } else {
      navigate(`/ficha/${tower}/${encodeURIComponent(typology)}`);
    }
  };

  return (
    <>
      <div className="mx-auto flex min-h-96 w-full max-w-sm flex-col overflow-hidden rounded-lg bg-white pb-2 shadow-lg">
        {/* Sección superior: 60% imagen, 40% tipología */}
        <div className="flex flex-col sm:h-3/5 sm:flex-row">
          <div className="w-full shrink-0 sm:w-3/5">
            <ApartmentImage tower={tower} typology={typology} />
          </div>
          <div className="flex min-h-[80px] w-full items-center justify-center bg-white p-4 sm:w-2/5">
            <div className="text-center">
              <div className="flex flex-row items-center justify-center gap-2 sm:flex-col sm:gap-0">
                <h3 className="text-md font-medium uppercase text-gray-800">Tipología</h3>
                <h2 className="text-2xl font-bold text-gray-800 sm:text-7xl">
                  {typology.includes('Tipología') ? typology.split(' ')[1] : typology}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Sección intermedia: Cubos con datos */}
        <ApartmentInfo
          tower={tower}
          typology={typology}
          buttonText={buttonText}
          onDetailsClick={handleOpenDetails}  // 👈 ahora navega
        />
      </div>
    </>
  );
}

export default ApartmentLayout;
