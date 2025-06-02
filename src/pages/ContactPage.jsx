import { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import Button from '../components/Button';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Configura EmailJS con tu service_id y template_id
    window.emailjs.send('your_service_id', 'your_template_id', formData)
      .then(() => {
        setStatus('Mensaje enviado con éxito');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => setStatus('Error al enviar el mensaje'));
  };

  return (
    <SectionWrapper className="bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-6 cursive">Contacto</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            rows="4"
            required
          ></textarea>
        </div>
        <Button type="submit">Enviar</Button>
        {status && <p className="text-center text-green-600">{status}</p>}
      </form>
    </SectionWrapper>
  );
}

export default ContactPage;