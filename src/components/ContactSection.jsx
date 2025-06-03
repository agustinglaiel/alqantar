import React, { useState } from "react";

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

    // Validación del email al escribir
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailRegex.test(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
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

    // Si pasa las validaciones
    setStatus("¡Operación exitosa!");
    setTimeout(() => {
      setStatus("");
      setFormData({ nombre: "", apellido: "", email: "", mensaje: "" });
      setEmailError(false);
    }, 5000);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-600">
          CONTACTO
        </h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-600"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Tu nombre"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-gray-600"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Tu apellido"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="tuemail@ejemplo.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="mensaje"
              className="block text-sm font-medium text-gray-600"
            >
              Escribe un mensaje *
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              placeholder="Tu mensaje aquí..."
            ></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors duration-200"
            >
              Enviar
            </button>
            {status && (
              <div
                className={`text-sm ${
                  status === "¡Operación exitosa!"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <span>{status}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
