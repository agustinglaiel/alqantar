import React, { useState } from 'react';
import ApartmentImage from './ApartmentImage';
import ApartmentInfo from './ApartmentInfo';
import ApartmentDetailModal from './ApartmentDetailModal';

function ApartmentLayout({ tower, typology }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-96 flex flex-col">
        <div className="flex-shrink-0">
          <ApartmentImage tower={tower} typology={typology} />
        </div>
        <div className="flex-1 flex flex-col">
          <ApartmentInfo tower={tower} typology={typology} onDetailsClick={handleOpenModal} />
        </div>
      </div>
      <ApartmentDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tower={tower}
        typology={typology}
      />
    </>
  );
}

export default ApartmentLayout;