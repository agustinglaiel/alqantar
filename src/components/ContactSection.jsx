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
    <section className="py-12 bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-600">
            CONTACTO
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="apellido"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu apellido"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="tuemail@ejemplo.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-gray-700"
              >
                Consulta *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                placeholder="Tu mensaje aquí..."
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
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
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
