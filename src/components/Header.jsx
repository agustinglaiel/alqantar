import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/images/logo.webp";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const opaquePages = ["/galeria", "/departamentos", "/ubicacion", "/avances", "/masterplan", "/amenities", "/360"];
  const isOpaquePage = opaquePages.includes(location.pathname) || location.pathname.startsWith("/ficha/");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setIsVisible(true);
      }
      setIsScrolled(currentScrollY > 10);
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
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
    { path: "/amenities", label: "Amenities" },
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
        className={`fixed left-0 top-0 z-30 h-32 w-full transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${bgClass}`}
      >
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between p-4">
          
          {/* Navegación desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navLinksLeft.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-lg text-white transition-colors duration-200 hover:text-blue-300 ${
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
            className="z-50 rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white hover:bg-opacity-10 focus:outline-none md:hidden"
            aria-label="Toggle mobile menu"
          >
            <div className="flex size-6 flex-col items-center justify-center">
              <span
                className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'
                }`}
              ></span>
              <span
                className={`my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
                }`}
              ></span>
            </div>
          </button>
          
          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
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
                    className={`text-lg text-white transition-colors duration-200 hover:text-blue-300 ${
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
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-opacity-95 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 shadow-2xl backdrop-blur-md transition-all duration-500 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(51, 65, 85, 0.95) 100%)'
        }}
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-between border-b border-white border-opacity-10 p-6">
          <div className="flex items-center space-x-3">

            <h2 className="text-lg font-semibold text-white">Menú</h2>
          </div>
          <button
            onClick={closeMobileMenu}
            className="rounded-full p-1 text-white transition-colors duration-200 hover:bg-white hover:bg-opacity-10 hover:text-blue-300"
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Links del menú con animación escalonada */}
        <div className="flex flex-1 flex-col justify-center px-6">
          <nav>
            <ul className="mt-4 flex flex-col space-y-4">
              {allNavLinks.map((link, index) => (
                <li 
                  key={link.path}
                  className={`transition-all duration-500 ease-out ${
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
                    className={`group flex items-center rounded-xl p-4 text-xl font-light text-white transition-all duration-200 hover:bg-white hover:bg-opacity-5 hover:text-blue-300 ${
                      location.pathname === link.path ? "bg-white bg-opacity-10 text-blue-300" : ""
                    }`}
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                    {location.pathname === link.path && (
                      <div className="ml-auto size-2 rounded-full bg-blue-400"></div>
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
          className={`fixed inset-0 z-30 bg-black transition-opacity duration-300 md:hidden ${
            isMobileMenuOpen ? 'bg-opacity-60' : 'bg-opacity-0'
          }`}
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
}

export default Header;