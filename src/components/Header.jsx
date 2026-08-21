import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.webp";
import navigation, { contactCta } from "../data/navigation";
import useScrollDirection from "../hooks/useScrollDirection";
import useHeaderTheme from "../hooks/useHeaderTheme";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";

/** Shared classes for a top-level nav link/trigger, active state depends on header mode (D13). */
function navItemClasses(isActive, mode) {
  const base = "text-body font-medium text-white/85 transition-colors duration-fast hover:text-white";
  if (!isActive) return base;
  return mode === "solid"
    ? `${base} rounded-full bg-white/15 px-3 py-1 text-white`
    : `${base} text-white underline decoration-2 decoration-gold-500 underline-offset-4`;
}

/** Desktop dropdown for one nav group ("El Proyecto", "Unidades", "Experiencia"). */
function NavGroup({ group, isActive, currentPath, mode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const closeMenu = (focusTrigger = false) => {
    clearCloseTimer();
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return undefined;
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

  useEffect(() => clearCloseTimer, []);

  const focusItemAt = (index) => {
    const items = ref.current?.querySelectorAll('[role="menuitem"]');
    if (!items || items.length === 0) return;
    items[(index + items.length) % items.length]?.focus();
  };

  const handleTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openMenu();
      requestAnimationFrame(() => focusItemAt(0));
    }
  };

  const handleMenuKeyDown = (e) => {
    const items = Array.from(ref.current?.querySelectorAll('[role="menuitem"]') || []);
    const currentIndex = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItemAt(currentIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItemAt(currentIndex - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      closeMenu(true);
    }
  };

  const handleBlur = (e) => {
    if (!ref.current?.contains(e.relatedTarget)) setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        className={navItemClasses(isActive, mode)}
      >
        {group.label}
      </button>
      {open && (
        // Envolver el panel en top-full + pt-2 (en vez de mt-2 en el panel)
        // hace que los 8px de separación sean parte de la caja de este
        // contenedor: el mouse nunca pasa por una franja que no pertenezca
        // a ningún elemento, así que el trigger→panel diagonal no dispara
        // onMouseLeave antes de llegar.
        <div className="absolute left-1/2 top-full w-48 -translate-x-1/2 pt-2">
          <div
            role="menu"
            onKeyDown={handleMenuKeyDown}
            className="rounded-md border border-line bg-surface p-2 shadow-md"
          >
            {group.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                role="menuitem"
                aria-current={currentPath === item.path ? "page" : undefined}
                onClick={() => closeMenu()}
                className="block rounded-sm px-3 py-2 text-body text-ink-700 transition-colors duration-fast hover:bg-surface-alt hover:text-ink-900 focus-visible:bg-surface-alt focus-visible:text-ink-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isVisible = useScrollDirection({ threshold: 8, minY: 100 });
  const headerRef = useRef(null);
  const mode = useHeaderTheme(headerRef);
  const isMedia = mode === "media";

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

  return (
    <>
      {/* Gradiente de protección: garantiza contraste del texto blanco sobre
          fotos claras mientras el header está en modo "media". */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-ink-900/60 to-transparent transition-opacity duration-base ${
          isMedia ? "opacity-100" : "opacity-0"
        }`}
      />

      <header
        ref={headerRef}
        className={`fixed left-0 top-0 z-30 h-[calc(var(--header-h)+var(--safe-top))] w-full pt-[var(--safe-top)] transition-all duration-base ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isMedia ? "bg-transparent" : "bg-accent-700/95 backdrop-blur-md"}`}
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
                  mode={mode}
                />
              ) : (
                <Link
                  key={group.path}
                  to={group.path}
                  aria-current={location.pathname === group.path ? "page" : undefined}
                  className={navItemClasses(location.pathname === group.path, mode)}
                >
                  {group.label}
                </Link>
              )
            )}
            <Button
              to={contactCta.path}
              onClick={handleContactClick}
              variant={mode === "solid" ? "invert" : "primary"}
              size="sm"
            >
              {contactCta.label}
            </Button>
          </nav>

          <IconButton
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            className="z-50 md:hidden"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </IconButton>
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
        className={`fixed inset-y-0 left-0 z-40 w-80 max-w-[85vw] bg-accent-700 shadow-md transition-transform duration-slow ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <h2 className="text-h3 font-semibold text-white">Menú</h2>
          <IconButton onClick={closeMobileMenu} aria-label="Cerrar menú">
            <X className="size-6" />
          </IconButton>
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
          className="fixed inset-0 z-30 bg-ink-900/60 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Header;
