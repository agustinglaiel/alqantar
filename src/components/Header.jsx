import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.webp";
import navigation, { contactCta } from "../data/navigation";
import useScrollDirection from "../hooks/useScrollDirection";
import Button from "./ui/Button";

const OPAQUE_PAGES = ["/galeria", "/departamentos", "/ubicacion", "/avances", "/masterplan", "/amenities", "/360"];

/** Desktop dropdown for one nav group ("El Proyecto", "Unidades", "Experiencia"). */
function NavGroup({ group, isActive, currentPath }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`text-body font-medium transition-colors duration-fast ${
          isActive ? "text-white" : "text-white/85 hover:text-white"
        }`}
      >
        {group.label}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 rounded-md border border-line bg-surface p-2 shadow-md"
        >
          {group.items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              aria-current={currentPath === item.path ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="block rounded-sm px-3 py-2 text-body text-ink-700 transition-colors duration-fast hover:bg-surface-alt hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isVisible = useScrollDirection({ threshold: 8, minY: 100 });

  const isOpaquePage = OPAQUE_PAGES.includes(location.pathname) || location.pathname.startsWith("/ficha/");
  const isTransparent = !isOpaquePage && !isScrolled && isVisible;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const bgClass = isTransparent ? "bg-ink-900/0" : "bg-ink-900/95";

  return (
    <>
      {/* Gradiente de protección: garantiza contraste del texto blanco sobre
          fotos claras mientras el header está transparente (home, sin scroll). */}
      {!isOpaquePage && (
        <div
          aria-hidden="true"
          className={`from-ink-900/60 pointer-events-none fixed inset-x-0 top-0 z-20 h-40 bg-gradient-to-b to-transparent transition-opacity duration-base ${
            isTransparent ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <header
        className={`fixed left-0 top-0 z-30 h-[var(--header-h)] w-full transition-all duration-base ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${bgClass}`}
      >
        <div className="mx-auto flex h-full max-w-content items-center justify-between px-[var(--gutter)]">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center">
            <img src={logo} alt="Alqantar" className="h-8 w-auto object-contain md:h-10" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((group) =>
              group.items ? (
                <NavGroup
                  key={group.label}
                  group={group}
                  isActive={group.items.some((item) => item.path === location.pathname)}
                  currentPath={location.pathname}
                />
              ) : (
                <Link
                  key={group.path}
                  to={group.path}
                  aria-current={location.pathname === group.path ? "page" : undefined}
                  className={`text-body font-medium transition-colors duration-fast ${
                    location.pathname === group.path ? "text-white" : "text-white/85 hover:text-white"
                  }`}
                >
                  {group.label}
                </Link>
              )
            )}
            <Button to={contactCta.path} onClick={handleContactClick} variant="primary" size="sm">
              {contactCta.label}
            </Button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            className="z-50 rounded-md p-2 text-white transition-colors duration-fast hover:bg-white/10 md:hidden"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Menú móvil: mismos grupos que el desktop, agrupados en secciones.
          Se oculta con un transform (para poder animarlo), así que sigue
          técnicamente "visible" para el DOM cuando está cerrado: sin
          aria-hidden/inert, sus links quedaban en el orden de Tab y su <h2>
          "Menú" aparecía antes del <h1> de la página para un lector de
          pantalla. inert además saca los links del orden de tabulación. */}
      <div
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
        className={`fixed inset-y-0 left-0 z-40 w-80 max-w-[85vw] bg-ink-900 shadow-md transition-transform duration-slow ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <h2 className="text-h3 font-semibold text-white">Menú</h2>
          <button
            onClick={closeMobileMenu}
            aria-label="Cerrar menú"
            className="rounded-full p-1 text-white transition-colors duration-fast hover:bg-white/10"
          >
            <X className="size-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 overflow-y-auto p-6">
          {navigation.map((group) => (
            <div key={group.label}>
              {group.items ? (
                <>
                  <p className="mb-2 text-overline text-white/50 overline">{group.label}</p>
                  <ul className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={closeMobileMenu}
                          aria-current={location.pathname === item.path ? "page" : undefined}
                          className={`block rounded-md px-3 py-2 text-body-l text-white/90 transition-colors duration-fast hover:bg-white/5 ${
                            location.pathname === item.path ? "bg-white/10 text-white" : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={group.path}
                  onClick={closeMobileMenu}
                  aria-current={location.pathname === group.path ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 text-body-l text-white/90 transition-colors duration-fast hover:bg-white/5 ${
                    location.pathname === group.path ? "bg-white/10 text-white" : ""
                  }`}
                >
                  {group.label}
                </Link>
              )}
            </div>
          ))}

          <Button
            to={contactCta.path}
            onClick={handleContactClick}
            variant="primary"
            className="mt-2 justify-center"
          >
            {contactCta.label}
          </Button>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="bg-ink-900/60 fixed inset-0 z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Header;
