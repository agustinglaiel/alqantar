import logo from "../assets/logo.webp";
import { Facebook, Instagram, MessageCircleMore, Mail } from "lucide-react";
import Container from "./ui/Container";
import project, { whatsappLink } from "../data/project";

function Footer() {
  return (
    <footer className="mt-8 bg-gray-800 py-8 text-white">
      <Container>
        {/* Desktop Layout */}
        <div className="hidden gap-4 md:flex md:items-start md:justify-between">
          {/* Izquierda: Dirección */}
          <div className="flex-1 text-left">
            {/* p, no heading: el footer no debe introducir su propio nivel
                de heading — la última sección de contenido termina en h2
                ("Conversemos sobre Alqantar"), y un h4 acá saltaría el h3. */}
            <p className="mb-2 font-semibold text-gray-300">Dirección</p>
            <p className="text-sm leading-relaxed">
              {project.address.street},
              <br />
              {project.address.neighborhood},
              <br />
              {project.address.city}
            </p>
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
            <div className="flex space-x-4">
              <a
                href={project.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Alqantar"
                className="text-gray-400 transition-colors duration-200 hover:scale-110 hover:text-blue-500"
              >
                <Facebook size={20} />
              </a>
              <a
                href={project.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Alqantar"
                className="text-gray-400 transition-colors duration-200 hover:scale-110 hover:text-pink-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
                className="text-gray-400 transition-colors duration-200 hover:scale-110 hover:text-green-500"
              >
                <MessageCircleMore size={20} />
              </a>
              <a
                href={`mailto:${project.email}`}
                aria-label="Enviar un email"
                className="text-gray-400 transition-colors duration-200 hover:scale-110 hover:text-gray-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Derecha: Enlaces */}
          <div className="flex-1 text-right">
            <p className="mb-2 font-semibold text-gray-300">Navegación</p>
            <div className="space-y-1">
              <p>
                <a
                  href="/"
                  className="text-sm text-white transition-colors duration-200 hover:text-blue-400"
                >
                  Inicio
                </a>
              </p>
              <p>
                <a
                  href="/galeria"
                  className="text-sm text-white transition-colors duration-200 hover:text-blue-400"
                >
                  Galería
                </a>
              </p>
              <p>
                <a
                  href="/departamentos"
                  className="text-sm text-white transition-colors duration-200 hover:text-blue-400"
                >
                  Departamentos
                </a>
              </p>
              <p>
                <a
                  href="/ubicacion"
                  className="text-sm text-white transition-colors duration-200 hover:text-blue-400"
                >
                  Ubicación
                </a>
              </p>
              <p>
                <a
                  href="/masterplan"
                  className="text-sm text-white transition-colors duration-200 hover:text-blue-400"
                >
                  Masterplan
                </a>
              </p>
              <p>
                <a
                  href="/avances"
                  className="text-sm text-white transition-colors duration-200 hover:text-blue-400"
                >
                  Avances
                </a>
              </p>
              <p>
                <a
                  href="/contacto#contacto"
                  className="text-sm text-white transition-colors duration-200 hover:text-blue-400"
                >
                  Contacto
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex justify-center md:hidden">
          {/* Solo Logo y Redes Sociales - Centrado */}
          <div className="flex flex-col items-center">
            <img src={logo} alt="Alqantar Logo" className="mb-3 h-12 w-auto object-contain" />
            <div className="flex space-x-4">
              <a
                href={project.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Alqantar"
                className="text-gray-400 transition-colors duration-200 hover:text-blue-500"
              >
                <Facebook size={20} />
              </a>
              <a
                href={project.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Alqantar"
                className="text-gray-400 transition-colors duration-200 hover:text-pink-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
                className="text-gray-400 transition-colors duration-200 hover:text-green-500"
              >
                <MessageCircleMore size={20} />
              </a>
              <a
                href={`mailto:${project.email}`}
                aria-label="Enviar un email"
                className="text-gray-400 transition-colors duration-200 hover:text-gray-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>        
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-xs text-gray-400">
            © 2025 Alqantar. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;