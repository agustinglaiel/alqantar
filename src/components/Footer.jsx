import logo from "../../public/images/logo.png";
import { Facebook, Instagram, MessageCircleMore, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:justify-between md:items-start gap-4">
          {/* Izquierda: Dirección */}
          <div className="flex-1 text-left">
            <h4 className="font-semibold mb-2 text-gray-300">Dirección</h4>
            <p className="text-sm leading-relaxed">
              José María Eguía Zanón 9932,
              <br />
              Villa Warcalde,
              <br />
              Córdoba
            </p>
          </div>
          
          {/* Centro: Logo y Redes Sociales - Alineado arriba */}
          <div className="flex-1 flex flex-col items-center">
            {/* Título invisible para alinear con otros títulos */}
            <h4 className="font-semibold mb-2 text-transparent">Logo</h4>
            <img src={logo} alt="Alqantar Logo" className="h-12 w-auto mb-2" />
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/alqantar.condominio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200 hover:scale-110 transform"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/alqantar_condominio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200 hover:scale-110 transform"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/5493517496383"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors duration-200 hover:scale-110 transform"
              >
                <MessageCircleMore size={20} />
              </a>
              <a
                href="mailto:info@alqantar.com"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200 hover:scale-110 transform"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Derecha: Enlaces */}
          <div className="flex-1 text-right">
            <h4 className="font-semibold mb-2 text-gray-300">Navegación</h4>
            <div className="space-y-1">
              <p>
                <a
                  href="/"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Inicio
                </a>
              </p>
              <p>
                <a
                  href="/galeria"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Galería
                </a>
              </p>
              <p>
                <a
                  href="/departamentos"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Departamentos
                </a>
              </p>
              <p>
                <a
                  href="/ubicacion"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Ubicación
                </a>
              </p>
              <p>
                <a
                  href="/avances"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Avances
                </a>
              </p>
              <p>
                <a
                  href="/contacto#contacto"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Contacto
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex justify-center">
          {/* Solo Logo y Redes Sociales - Centrado */}
          <div className="flex flex-col items-center">
            <img src={logo} alt="Alqantar Logo" className="h-12 w-auto object-contain mb-3" />
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/alqantar.condominio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/alqantar_condominio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/5493517496383"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors duration-200"
              >
                <MessageCircleMore size={20} />
              </a>
              <a
                href="mailto:info@alqantar.com"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>        {/* Línea divisoria y copyright */}
        {/* <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-400">
            © 2025 Alqantar. Todos los derechos reservados.
          </p>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;