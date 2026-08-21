import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircleMore, Mail, MapPin } from "lucide-react";
import logo from "../assets/logo.webp";
import Container from "./ui/Container";
import IconButton from "./ui/IconButton";
import project, { whatsappLink, googleMapsLink } from "../data/project";
import navigation, { contactCta } from "../data/navigation";

const footerLinks = [
  { label: "Inicio", path: "/" },
  ...navigation.flatMap((entry) => (entry.items ? entry.items : [entry])),
  contactCta,
];

const SOCIAL_LINKS = [
  { href: project.social.facebook, label: "Facebook de Alqantar", Icon: Facebook },
  { href: project.social.instagram, label: "Instagram de Alqantar", Icon: Instagram },
  { href: whatsappLink(), label: "Escribir por WhatsApp", Icon: MessageCircleMore },
  { href: `mailto:${project.email}`, label: "Enviar un email", Icon: Mail },
];

function SocialLinks() {
  return (
    <div className="flex gap-1">
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <IconButton
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          variant="invert"
        >
          <Icon size={20} />
        </IconButton>
      ))}
    </div>
  );
}

function AddressLink({ className = "" }) {
  return (
    <a
      href={googleMapsLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir la dirección de Alqantar en Google Maps"
      className={`inline-flex items-start gap-1.5 text-sm leading-relaxed text-white/80 transition-colors duration-200 hover:text-white ${className}`}
    >
      <MapPin size={16} className="mt-0.5 shrink-0" />
      <span>
        {project.address.street},
        <br />
        {project.address.neighborhood},
        <br />
        {project.address.city}
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="mt-8 bg-ink-900 py-8 text-white">
      <Container>
        {/* Desktop Layout */}
        <div className="hidden gap-4 md:flex md:items-start md:justify-between">
          {/* Izquierda: Dirección */}
          <div className="flex-1 text-left">
            {/* p, no heading: el footer no debe introducir su propio nivel
                de heading — la última sección de contenido termina en h2
                ("Conversemos sobre Alqantar"), y un h4 acá saltaría el h3. */}
            <p className="mb-2 font-semibold text-white/60">Dirección</p>
            <AddressLink />
          </div>

          {/* Centro: Logo y Redes Sociales - Alineado arriba */}
          <div className="flex flex-1 flex-col items-center">
            {/* Título invisible para alinear con otros títulos. aria-hidden:
                color transparent no lo oculta de un lector de pantalla, y no
                aporta nada leerlo. */}
            <p aria-hidden="true" className="mb-2 font-semibold text-transparent">
              Logo
            </p>
            <img src={logo} alt="Alqantar Logo" className="mb-2 h-12 w-auto" />
            <SocialLinks />
          </div>

          {/* Derecha: Enlaces */}
          <div className="flex-1 text-right">
            <p className="mb-2 font-semibold text-white/60">Navegación</p>
            <div className="space-y-1">
              {footerLinks.map((link) => (
                <p key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white transition-colors duration-200 hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout: navegación y dirección completas (M6), no solo logo + redes. */}
        <div className="flex flex-col items-center gap-6 text-center md:hidden">
          <img src={logo} alt="Alqantar Logo" className="h-12 w-auto object-contain" />

          <AddressLink className="justify-center" />

          <nav aria-label="Navegación del pie de página" className="flex flex-col items-center">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex min-h-[var(--tap-min)] items-center text-sm text-white transition-colors duration-200 hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <SocialLinks />
        </div>

        <div className="mt-6 border-t border-white/20 pt-4 text-center">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Alqantar. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
