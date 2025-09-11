// src/utils/apartmentData.js
import { BedDouble, ShowerHead, Car, ChefHat, DoorOpen, Square as SquareIcon } from 'lucide-react';

const apartmentData = {
  torre1: {
    'Tipología 1': {
      mainImage: '/images/01.png',
      images: [
        { src: '/images/01.png', alt: 'Tipología 1 - Vista 1' },
        { src: '/images/02.png', alt: 'Tipología 1 - Vista 2' },
        { src: '/images/03.png', alt: 'Tipología 1 - Vista 3' },
      ],
      description: 'Apartamento de 2 dormitorios con 2 baños.',
      size: '275 m²',
      features: [
        { icon: BedDouble, value: '2', color: 'bg-gray-600', label: 'Dormitorios' },
        { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
        { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
        { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Asador' },
        { icon: DoorOpen, value: '3', color: 'bg-gray-600', label: 'Balcones' },
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
      description: 'Apartamento de 3 dormitorios con 3 baños.',
      size: '320 m²',
      features: [
        { icon: BedDouble, value: '3', color: 'bg-gray-600', label: 'Dormitorios' },
        { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
        { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
        { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Asador' },
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
      description: 'Apartamento de 2 dormitorios con 2 baños.',
      size: '265 m²',
      features: [
        { icon: BedDouble, value: '2', color: 'bg-gray-600', label: 'Dormitorios' },
        { icon: ShowerHead, value: '3', color: 'bg-gray-600', label: 'Baños' },
        { icon: Car, value: '2', color: 'bg-gray-600', label: 'Cocheras' },
        { icon: ChefHat, value: '1', color: 'bg-gray-600', label: 'Asador' },
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
      description: 'Terraza y quincho en la azotea de Torre 1.',
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