import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/images/logo.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determinar la dirección del scroll
      if (currentScrollY > lastScrollY) {
        // Scroll hacia abajo: ocultar el header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba: mostrar el header
        setIsVisible(true);
      }

      // Verificar si estamos en el tope de la página
      setIsScrolled(currentScrollY > 10);

      // Actualizar la posición del último scroll
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Mapa de rutas a etiquetas para los enlaces
  const navLinksLeft = [
    { path: "/", label: "Inicio" },
    { path: "/galeria", label: "Galería" },
    { path: "/departamentos", label: "Departamentos" },
  ];

  const navLinksRight = [
    { path: "/ubicacion", label: "Ubicación" },
    { path: "/avances", label: "Avances" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 h-32 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled || !isVisible
          ? "bg-gray-800 bg-opacity-80"
          : "bg-gray-800 bg-opacity-0"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center h-full">
        {/* Enlaces izquierda */}
        <nav>
          <ul className="flex space-x-6">
            {navLinksLeft.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-white hover:text-blue-300 text-lg ${
                    location.pathname === link.path
                      ? "border-b-2 border-white"
                      : ""
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
          <img src={logo} alt="Alqantar Logo" className="h-16" />
        </div>

        {/* Enlaces derecha */}
        <nav>
          <ul className="flex space-x-6">
            {navLinksRight.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-white hover:text-blue-300 text-lg ${
                    location.pathname === link.path
                      ? "border-b-2 border-white"
                      : ""
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
