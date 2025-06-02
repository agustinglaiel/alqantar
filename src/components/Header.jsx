import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/images/logo.png';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detectar scroll para cambiar el fondo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mapa de rutas a etiquetas para los enlaces
  const navLinksLeft = [
    { path: '/', label: 'Inicio' },
    { path: '/gallery', label: 'Galería' },
    { path: '/departments', label: 'Departamentos' },
  ];

  const navLinksRight = [
    { path: '/location', label: 'Ubicación' },
    { path: '/progress', label: 'Avances' },
    { path: '/contact', label: 'Contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        isScrolled ? 'bg-gray-800 bg-opacity-90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Enlaces izquierda */}
        <nav>
          <ul className="flex space-x-6">
            {navLinksLeft.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-white hover:text-blue-300 ${
                    location.pathname === link.path ? 'border-b-2 border-white' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo centrado */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={logo} alt="Alqantar Logo" className="h-12" />
        </div>

        {/* Enlaces derecha */}
        <nav>
          <ul className="flex space-x-6">
            {navLinksRight.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-white hover:text-blue-300 ${
                    location.pathname === link.path ? 'border-b-2 border-white' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;