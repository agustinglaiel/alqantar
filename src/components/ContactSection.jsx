import React from "react";
import { MessageCircleMore, Instagram, Facebook, Mail } from "lucide-react";
import project, { whatsappLink } from "../data/project";

function ContactSection() {
  return (
    <section className="mx-auto max-w-5xl overflow-hidden rounded-xl bg-gray-900">
      <div className="flex min-h-96 flex-col items-center justify-center bg-gray-800 p-12 text-white">
        {/* <h2 className="text-4xl font-bold text-center mb-8 text-white">
          CONTACTO
        </h2> */}
        <p className="mb-12 max-w-2xl text-center text-2xl">
          Envíe su consulta a nuestro equipo de asesores a
          través de los siguientes medios:
        </p>
        
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* WhatsApp */}
          <div className="flex flex-col items-center">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-green-500 shadow-lg transition-colors duration-200 group-hover:bg-green-600">
                <MessageCircleMore size={40} className="text-white" />
              </div>
              <span className="font-medium text-gray-300 transition-colors duration-200 group-hover:text-green-400">
                WhatsApp
              </span>
            </a>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center">
            <a
              href={project.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg transition-all duration-200 group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-orange-600">
                <Instagram size={40} className="text-white" />
              </div>
              <span className="font-medium text-gray-300 transition-colors duration-200 group-hover:text-pink-400">
                Instagram
              </span>
            </a>
          </div>

          {/* Facebook */}
          <div className="flex flex-col items-center">
            <a
              href={project.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-colors duration-200 group-hover:bg-blue-700">
                <Facebook size={40} className="text-white" />
              </div>
              <span className="font-medium text-gray-300 transition-colors duration-200 group-hover:text-blue-400">
                Facebook
              </span>
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <a
              href={`mailto:${project.email}`}
              className="group flex flex-col items-center"
            >
              <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-gray-600 shadow-lg transition-colors duration-200 group-hover:bg-gray-500">
                <Mail size={40} className="text-white" />
              </div>
              <span className="font-medium text-gray-300 transition-colors duration-200 group-hover:text-gray-100">
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
