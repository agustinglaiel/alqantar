import logo from "../../public/images/logo.png";
import { Facebook, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-3 items-center gap-8">
          {/* Izquierda: Dirección */}
          <div className="text-left">
            <h4 className="font-semibold mb-2 text-gray-300">Dirección</h4>
            <p className="text-sm leading-relaxed">
              José María Eguía Zanón 9932,
              <br />
              Villa Warcalde,
              <br />
              Córdoba
            </p>
          </div>

          {/* Centro: Logo y Redes Sociales */}
          <div className="flex flex-col items-center">
            <img src={logo} alt="Alqantar Logo" className="h-16 w-auto mb-3" />
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
            </div>
          </div>

          {/* Derecha: Enlaces */}
          <div className="text-right">
            <h4 className="font-semibold mb-2 text-gray-300">Navegación</h4>
            <div className="space-y-1">
              <p>
                <a
                  href="#"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Departamentos
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Galería
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Ubicación
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-sm text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Contacto
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-400">
            © 2025 Alqantar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
