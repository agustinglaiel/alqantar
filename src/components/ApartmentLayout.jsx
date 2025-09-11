import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApartmentImage from './ApartmentImage';
import ApartmentInfo from './ApartmentInfo';

function ApartmentLayout({ tower, typology }) {
  const navigate = useNavigate();

  const handleOpenDetails = () => {
    navigate(`/ficha/${tower}/${encodeURIComponent(typology)}`);
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden min-h-96 flex flex-col pb-2">
        {/* Sección superior: 60% imagen, 40% tipología */}
        <div className="flex flex-col sm:flex-row h-3/5">
          <div className="w-full sm:w-3/5 flex-shrink-0">
            <ApartmentImage tower={tower} typology={typology} />
          </div>
          <div className="w-full sm:w-2/5 flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center">
              <h3 className="text-md font-medium text-gray-800 uppercase">Tipología</h3>
              <h2 className="text-2xl sm:text-7xl font-bold text-gray-800">
                {typology.includes('Tipología') ? typology.split(' ')[1] : typology}
              </h2>
            </div>
          </div>
        </div>

        {/* Sección intermedia: Cubos con datos */}
        <ApartmentInfo
          tower={tower}
          typology={typology}
          onDetailsClick={handleOpenDetails}  // 👈 ahora navega
        />
      </div>
    </>
  );
}

export default ApartmentLayout;
