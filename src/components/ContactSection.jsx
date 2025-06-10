import React, { useState } from "react";
import { MessageCircleMore, Instagram, Facebook, Mail } from "lucide-react";

function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    mensaje: "",
  });
  const [status, setStatus] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailRegex.test(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isMessageValid = formData.mensaje.trim() !== "";

    if (!isEmailValid) {
      setStatus("Dirección de Correo incorrecta");
      setTimeout(() => setStatus(""), 5000);
      return;
    }

    if (!isMessageValid) {
      setStatus("No puede enviar un mensaje vacío");
      setTimeout(() => setStatus(""), 5000);
      return;
    }

    setStatus("¡Operación exitosa!");
    setTimeout(() => {
      setStatus("");
      setFormData({ nombre: "", apellido: "", email: "", mensaje: "" });
      setEmailError(false);
    }, 5000);
  };

  return (
    <section className="max-w-5xl mx-auto bg-gray-900 rounded-xl overflow-hidden">
      <div className="flex min-h-96">
        <div className="w-2/3 bg-white rounded-l-xl p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-600">
            CONTACTO
          </h2>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Tu apellido"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-cyan-500 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="tuemail@ejemplo.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Consulta *
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 h-24 resize-none"
                placeholder="Tu mensaje aquí..."
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-700 transition-colors duration-200"
              >
                Enviar
              </button>
              {status && (
                <div
                  className={`text-sm ml-4 ${
                    status === "¡Operación exitosa!"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <span>{status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-gray-800 text-white p-8 flex flex-col text-center">
          <p className="mb-4 text-xl text-justify">
            Envíe su consulta a nuestro equipo de asesores o comuníquese a
            través de los siguientes medios:
          </p>
          <div className="space-y-2">
            <p>
              <a
                href="https://wa.me/5493513173344"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-500 transition-colors duration-200 flex items-center"
              >
                <MessageCircleMore size={20} className="mr-2" />
                +54 9 351 131-73344
              </a>
            </p>
            <p>
              <a
                href="https://www.instagram.com/alqantar_condominio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-200 flex items-center"
              >
                <Instagram size={20} className="mr-2" />
                @alqantar_condominio
              </a>
            </p>
            <p>
              <a
                href="https://www.facebook.com/alqantar.condominio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors duration-200 flex items-center"
              >
                <Facebook size={20} className="mr-2" />
                @alqantar.condominio
              </a>
            </p>
            <p>
              <a
                href="mailto:info@alqantar.com"
                className="text-gray-300 hover:text-gray-400 transition-colors duration-200 flex items-center"
              >
                <Mail size={20} className="mr-2" />
                info@alqantar.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
