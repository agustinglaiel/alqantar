import React from "react";
import { MessageCircleMore, Instagram, Facebook, Mail } from "lucide-react";

function ContactSection() {
  return (
    <section className="max-w-5xl mx-auto bg-gray-900 rounded-xl overflow-hidden">
      <div className="min-h-96 bg-gray-800 text-white p-12 flex flex-col items-center justify-center">
        {/* <h2 className="text-4xl font-bold text-center mb-8 text-white">
          CONTACTO
        </h2> */}
        <p className="mb-12 text-2xl text-center max-w-2xl">
          Envíe su consulta a nuestro equipo de asesores a
          través de los siguientes medios:
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* WhatsApp */}
          <div className="flex flex-col items-center">
            <a
              href="https://wa.me/5493517496383"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-600 transition-colors duration-200 shadow-lg">
                <MessageCircleMore size={40} className="text-white" />
              </div>
              <span className="text-gray-300 group-hover:text-green-400 transition-colors duration-200 font-medium">
                WhatsApp
              </span>
            </a>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center">
            <a
              href="https://www.instagram.com/alqantar_condominio"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center mb-3 group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-orange-600 transition-all duration-200 shadow-lg">
                <Instagram size={40} className="text-white" />
              </div>
              <span className="text-gray-300 group-hover:text-pink-400 transition-colors duration-200 font-medium">
                Instagram
              </span>
            </a>
          </div>

          {/* Facebook */}
          <div className="flex flex-col items-center">
            <a
              href="https://www.facebook.com/alqantar.condominio"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-700 transition-colors duration-200 shadow-lg">
                <Facebook size={40} className="text-white" />
              </div>
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors duration-200 font-medium">
                Facebook
              </span>
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <a
              href="mailto:info@alqantar.com"
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-gray-500 transition-colors duration-200 shadow-lg">
                <Mail size={40} className="text-white" />
              </div>
              <span className="text-gray-300 group-hover:text-gray-100 transition-colors duration-200 font-medium">
                Email
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
