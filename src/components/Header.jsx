import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/images/logo.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const opaquePages = ["/galeria", "/departamentos", "/ubicacion", "/avances", "/masterplan", "/amenities", "/360"];
  const isOpaquePage = opaquePages.includes(location.pathname) || location.pathname.startsWith("/ficha/");
  
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
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  const handleContactClick = (e) => {
    if (location.pathname === "/" || location.pathname === "/contacto") {
      e.preventDefault();
      const element = document.getElementById("contacto");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        navigate("/contacto#contacto", { replace: true });
      }
    }
    setIsMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
  
  const allNavLinks = [...navLinksLeft, ...navLinksRight];
  
  const bgClass = isOpaquePage
    ? "bg-gray-800 bg-opacity-95"
    : (isScrolled || !isVisible
        ? "bg-gray-800 bg-opacity-95"
        : "bg-gray-800 bg-opacity-0");
  
  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 h-32 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${bgClass}`}
      >
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center h-full">
          
          {/* Navegación desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navLinksLeft.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-white hover:text-blue-300 text-lg transition-colors duration-200 ${
                      location.pathname === link.path ? "border-b-2 border-white" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Menú hamburguesa mejorado */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none z-50 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}
              ></span>
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                }`}
              ></span>
            </div>
          </button>
          
          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" onClick={closeMobileMenu}>
              <img src={logo} alt="Alqantar Logo" className="h-16 w-auto object-contain" />
            </Link>
          </div>
          
          {/* Navegación derecha desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navLinksRight.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={link.onClick || (() => {})}
                    className={`text-white hover:text-blue-300 text-lg transition-colors duration-200 ${
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
      
      {/* Menú móvil mejorado */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-80 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 backdrop-blur-md bg-opacity-95 z-40 transition-all duration-500 ease-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(51, 65, 85, 0.95) 100%)'
        }}
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-between p-6 border-b border-white border-opacity-10">
          <div className="flex items-center space-x-3">

            <h2 className="text-white font-semibold text-lg">Menú</h2>
          </div>
          <button
            onClick={closeMobileMenu}
            className="text-white hover:text-blue-300 p-1 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Links del menú con animación escalonada */}
        <div className="flex flex-col justify-center flex-1 px-6">
          <nav>
            <ul className="flex flex-col space-y-4 mt-4">
              {allNavLinks.map((link, index) => (
                <li 
                  key={link.path}
                  className={`transform transition-all duration-500 ease-out ${
                    isMobileMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <Link
                    to={link.path}
                    onClick={(e) => {
                      if (link.onClick) {
                        link.onClick(e);
                      }
                      closeMobileMenu();
                    }}
                    className={`flex items-center text-white hover:text-blue-300 text-xl font-light py-4 px-4 rounded-xl hover:bg-white hover:bg-opacity-5 transition-all duration-200 group ${
                      location.pathname === link.path ? "text-blue-300 bg-white bg-opacity-10" : ""
                    }`}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                    {location.pathname === link.path && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full ml-auto"></div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Overlay mejorado */}
      {isMobileMenuOpen && (
        <div 
          className={`md:hidden fixed inset-0 bg-black transition-opacity duration-300 z-30 ${
            isMobileMenuOpen ? 'bg-opacity-60' : 'bg-opacity-0'
          }`}
          onClick={closeMobileMenu}
          style={{
            backdropFilter: 'blur(4px)'
          }}
        ></div>
      )}
    </>
  );
}

export default Header;