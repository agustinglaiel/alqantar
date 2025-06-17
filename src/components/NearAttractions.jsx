// import React, { useState } from 'react';

// const attractions = {
//   supermarkets: [
//     { name: 'Carrefour Express', address: 'Av. Principal 123, Villa Warcalde' },
//     { name: 'Supermercado El Mundo', address: 'Calle Secundaria 456, Villa Warcalde' },
//   ],
//   shopping: [
//     { name: 'Córdoba Shopping', address: 'Av. Colón 500, Córdoba (15 km)' },
//   ],
//   restaurants: [
//     { name: 'La Parrilla de Juan', address: 'Calle Gastronómica 789, Villa Warcalde' },
//     { name: 'Pizzería Roma', address: 'Av. Central 101, Villa Warcalde' },
//   ],
//   hospitals: [
//     { name: 'Clínica Villa Warcalde', address: 'Calle Salud 202, Villa Warcalde' },
//   ],
//   schools: [
//     { name: 'Escuela Primaria N° 10', address: 'Av. Educativa 303, Villa Warcalde' },
//   ],
//   parks: [
//     { name: 'Parque Los Alamos', address: 'Calle Verde 404, Villa Warcalde' },
//   ],
//   pharmacies: [
//     { name: 'Farmacia del Pueblo', address: 'Av. Principal 505, Villa Warcalde' },
//   ],
//   transport: [
//     { name: 'Parada Bus Línea 15', address: 'Esquina Central, Villa Warcalde' },
//   ],
// };

// const locations = [
//   { name: 'Carrefour Express', lat: -31.3360, lng: -64.3030 },
//   { name: 'Supermercado El Mundo', lat: -31.3350, lng: -64.3010 },
//   { name: 'Córdoba Shopping', lat: -31.4200, lng: -64.1880 },
//   { name: 'La Parrilla de Juan', lat: -31.3365, lng: -64.3025 },
//   { name: 'Pizzería Roma', lat: -31.3355, lng: -64.3015 },
//   { name: 'Clínica Villa Warcalde', lat: -31.3370, lng: -64.3035 },
//   { name: 'Escuela Primaria N° 10', lat: -31.3345, lng: -64.3005 },
//   { name: 'Parque Los Alamos', lat: -31.3368, lng: -64.3040 },
//   { name: 'Farmacia del Pueblo', lat: -31.3352, lng: -64.3020 },
//   { name: 'Parada Bus Línea 15', lat: -31.3362, lng: -64.3018 },
// ];

// function NearAttractions({ onOpen }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//     onOpen(locations); // Pasar las ubicaciones al mapa
//   };

//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="py-4">
//       <button
//         onClick={openModal}
//         className="px-6 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-700 transition-colors duration-200"
//       >
//         Ver Atracciones Cercanas
//       </button>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto w-11/12 max-w-md">
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">Atracciones Cercanas</h2>
//             {Object.entries(attractions).map(([category, items], catIndex) => (
//               <div key={catIndex} className="mb-6">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </h3>
//                 <ul className="space-y-2">
//                   {items.map((item, index) => (
//                     <li key={index} className="text-gray-600">
//                       {item.name} - {item.address} <span className="text-gray-800 font-bold">{catIndex * 3 + index + 1}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//             <button
//               onClick={closeModal}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NearAttractions;