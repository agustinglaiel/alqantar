// src/utils/apartmentData.js
import { BedDouble, ShowerHead, Car, ChefHat, DoorOpen, Square as SquareIcon, Grid, Utensils, Shirt, Sofa, Layers } from 'lucide-react';

const apartmentData = {
  torre1: {
    'Tipología 1': {
      mainImage: '/images/01.png',
      images: [
        { src: '/images/01.png', alt: 'Tipología 1 - Vista 1' },
        { src: '/images/02.png', alt: 'Tipología 1 - Vista 2' },
        { src: '/images/03.png', alt: 'Tipología 1 - Vista 3' },
      ],
      description: 'La Tipología 01 de Alqantar Condominio ha sido diseñada en esquina, lo que le otorga mayor amplitud visual, luminosidad y privacidad. Concebida para quienes buscan una unidad exclusiva de dos dormitorios, combina la comodidad de espacios generosos con la calidez de un entorno natural único en Villa Warcalde. Con una superficie propia de 175 m², esta tipología integra ambientes funcionales y elegantes, que se prolongan hacia balcones concebidos para disfrutar del verde y las vistas abiertas en cada momento del día.',
      size: '275 m²',
      features: [
        { icon: BedDouble, value: '2', color: 'bg-gray-600', label: 'Dormitorios' },
        { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
        { icon: Grid, value: '1', color: 'bg-gray-600', label: 'Vestidor en Suite' },
        { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Cocina' },
        { icon: Sofa, value: '1', color: 'bg-gray-600', label: 'Estar/Comedor' },
        { icon: Shirt, value: '1', color: 'bg-gray-600', label: 'Lavadero' },
        { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
        { icon: Utensils, value: '1', color: 'bg-gray-600', label: 'Asador' },
        { icon: DoorOpen, value: '3', color: 'bg-gray-600', label: 'Balcones' },
        { icon: Layers, value: '1', color: 'bg-gray-600', label: 'Baulera' },
        { icon: SquareIcon, value: '275 m²', color: 'bg-gray-600', label: 'Superficie' },
      ],
    },
    'Tipología 2': {
      mainImage: '/images/02.png',
      images: [
        { src: '/images/02.png', alt: 'Tipología 2 - Vista 1' },
        { src: '/images/03.png', alt: 'Tipología 2 - Vista 2' },
        { src: '/images/01.png', alt: 'Tipología 2 - Vista 3' },
      ],
      description: 'El lujo de los grandes espacios. Con 3 dormitorios luminosos y 3 baños, este apartamento combina amplitud con exclusividad. Sus 4 balcones panorámicos y su asador propio lo convierten en el lugar perfecto para quienes buscan un estilo de vida sofisticado. Incluye 2 cocheras y una superficie total de 320 m².',
      size: '320 m²',
      features: [
        { icon: BedDouble, value: '3', color: 'bg-gray-600', label: 'Dormitorios' },
        { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
        { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
        { icon: Utensils, value: '1', color: 'bg-gray-600', label: 'Asador' },
        { icon: DoorOpen, value: '4', color: 'bg-gray-600', label: 'Balcones' },
        { icon: SquareIcon, value: '320 m²', color: 'bg-gray-600', label: 'Superficie' },
      ],
    },
    'Tipología 3': {
      mainImage: '/images/03.png',
      images: [
        { src: '/images/03.png', alt: 'Tipología 3 - Vista 1' },
        { src: '/images/01.png', alt: 'Tipología 3 - Vista 2' },
        { src: '/images/02.png', alt: 'Tipología 3 - Vista 3' },
      ],
      description: 'Perfecto equilibrio entre diseño y practicidad. Este apartamento de 2 dormitorios y 3 baños cuenta con 2 balcones estratégicamente ubicados que aportan luz natural y vistas privilegiadas. Con 2 cocheras y un asador privado, suma confort a su superficie de 265 m².',
      size: '265 m²',
      features: [
        { icon: BedDouble, value: '2', color: 'bg-gray-600', label: 'Dormitorios' },
        { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
        { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
        { icon: Utensils, value: '1', color: 'bg-gray-600', label: 'Asador' },
        { icon: DoorOpen, value: '2', color: 'bg-gray-600', label: 'Balcones' },
        { icon: SquareIcon, value: '265 m²', color: 'bg-gray-600', label: 'Superficie' },
      ],
    },
    'Terraza/Quincho': {
      mainImage: '/images/01.png',
      images: [
        { src: '/images/01.png', alt: 'Terraza/Quincho - Vista 1' },
        { src: '/images/02.png', alt: 'Terraza/Quincho - Vista 2' },
      ],
      description: 'Disfrutá momentos inolvidables en la terraza de Torre 1: un quincho exclusivo en altura, pensado para reuniones sociales, asados y encuentros rodeados de vistas espectaculares.',
      size: 'Común',
      features: [],
    },
    'Subsuelo': {
      mainImage: '/images/01.png',
      images: [
        { src: '/images/01.png', alt: 'Subsuelo - Vista 1' },
        { src: '/images/02.png', alt: 'Subsuelo - Vista 2' },
      ],
      description: 'Sala de usos múltiples en el subsuelo de Torre 1.',
      size: 'Común',
      features: [],
    },
  },
  torre2: {
    'Tipología 1': {
      mainImage: '/images/04.png',
      images: [
        { src: '/images/04.png', alt: 'Tipología 1 - Vista 1' },
        { src: '/images/01.png', alt: 'Tipología 1 - Vista 2' },
      ],
      description: 'Apartamento en Torres VIP de diseño moderno.',
      size: 'N/A',
      features: [
        { icon: BedDouble, value: '1', color: 'bg-gray-600', label: 'Dormitorios' },
        { icon: ShowerHead, value: '1', color: 'bg-gray-600', label: 'Baños' },
        { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Asador' },
        { icon: DoorOpen, value: '1', color: 'bg-gray-600', label: 'Balcones' },
        { icon: SquareIcon, value: 'N/A', color: 'bg-gray-600', label: 'Superficie' },
      ],
    },
    'Terraza/Quincho': {
      mainImage: '/images/01.png',
      images: [
        { src: '/images/01.png', alt: 'Terraza/Quincho - Vista 1' },
        { src: '/images/02.png', alt: 'Terraza/Quincho - Vista 2' },
      ],
      description: 'Terraza y quincho en la azotea de Torre 2.',
      size: 'Común',
      features: [],
    },
    'Subsuelo': {
      mainImage: '/images/01.png',
      images: [
        { src: '/images/01.png', alt: 'Subsuelo - Vista 1' },
        { src: '/images/02.png', alt: 'Subsuelo - Vista 2' },
      ],
      description: 'Sala de usos múltiples en el subsuelo de Torre 2.',
      size: 'Común',
      features: [],
    },
  },
};

export default apartmentData;