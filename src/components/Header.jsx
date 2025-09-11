import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/images/logo.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // 👉 Detecta si es la página de ficha
  const isDetailPage = location.pathname.startsWith("/ficha/");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleContactClick = (e) => {
    if (location.pathname === "/" || location.pathname === "/contacto") {
      e.preventDefault();
      const element = document.getElementById("contacto");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        navigate("/contacto#contacto", { replace: true });
      }
    }
  };

  const navLinksLeft = [
    { path: "/", label: "Inicio" },
    { path: "/galeria", label: "Galería" },
    { path: "/departamentos", label: "Departamentos" },
  ];

  const navLinksRight = [
    { path: "/ubicacion", label: "Ubicación" },
    { path: "/avances", label: "Avances" },
    { path: "/contacto#contacto", label: "Contacto", onClick: handleContactClick },
  ];

  // 👇 Si es ficha, forzamos SIEMPRE opaco; si no, mantenemos el comportamiento actual
  const bgClass = isDetailPage
    ? "bg-gray-800 bg-opacity-95"
    : (isScrolled || !isVisible
        ? "bg-gray-800 bg-opacity-95"
        : "bg-gray-800 bg-opacity-0");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 h-32 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${bgClass}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center h-full">
        <nav>
          <ul className="flex space-x-6">
            {navLinksLeft.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-white hover:text-blue-300 text-lg ${
                    location.pathname === link.path ? "border-b-2 border-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <img src={logo} alt="Alqantar Logo" className="h-16" />
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6">
            {navLinksRight.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={link.onClick || (() => {})}
                  className={`text-white hover:text-blue-300 text-lg ${
                    location.pathname === link.path ? "border-b-2 border-white" : ""
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
