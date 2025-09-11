import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BedDouble,
  ShowerHead,
  Square as SquareIcon,
  CalendarClock,
  MessageCircleMore,
  Info,
} from "lucide-react";

import apartmentData from "../utils/apartmentData";
import ImageCarousel from "../components/ImageCarousel";
import FutureUpgrade from "../components/FutureUpgrade";

const featureByLabel = (features, labelStartsWith) =>
  features?.find((f) => f.label?.toLowerCase().startsWith(labelStartsWith));

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-100 p-3">
    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
      <Icon className="text-blue-500" size={20} />
    </div>
    <div className="text-left">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-base font-semibold text-gray-800">
        {value ?? "—"}
      </div>
    </div>
  </div>
);

export default function ApartmentDetailPage() {
  const { tower, typology: typParam } = useParams();
  const typology = decodeURIComponent(typParam || "");
  
  // Estado para controlar la posición del aside
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const data = apartmentData[tower]?.[typology];

  // Detectar dirección del scroll y visibilidad del header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Lógica del header (copiada del Header.jsx)
      if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
        setIsScrollingUp(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Si no hay data, mostramos el componente "Próximamente"
  if (!data) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-24">
        <FutureUpgrade
          title="Ficha no disponible"
          message="Estamos preparando la información detallada de esta tipología."
          icon="clock"
          size="large"
        />
        <div className="text-center mt-6">
          <Link
            to="/departamentos"
            className="inline-block px-5 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-colors"
          >
            Volver a Departamentos
          </Link>
        </div>
      </div>
    );
  }

  // Extraer valores típicos para las “píldoras”
  const bedrooms = featureByLabel(data.features, "dormitorio")?.value;
  const bathrooms = featureByLabel(data.features, "baño")?.value;
  const area =
    featureByLabel(data.features, "superficie")?.value ||
    featureByLabel(data.features, "m²")?.value;

  // CTA de WhatsApp con mensaje prellenado
  const waLink = useMemo(() => {
    const msg = `Hola, me interesa la ${typology} de ${tower.toUpperCase()} en Alqantar. ¿Podrían enviarme más información?`;
    return `https://wa.me/5493517496383?text=${encodeURIComponent(msg)}`;
  }, [tower, typology]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 pt-40 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Columna principal del contenido */}
          <div className="lg:col-span-8 space-y-8">
            {/* ImageCarousel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <ImageCarousel images={data.images} />
            </div>

            {/* Descripción */}
            <section>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Descripción
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </section>

            {/* Características */}
            <section>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {/* Detalles (bullets) si existen */}
                {data.details?.length > 0 && (
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                      Características
                    </h4>
                    <ul className="space-y-2">
                      {data.details.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Aside lateral */}
          <aside className="lg:col-span-4">
            <div className={`sticky transition-all duration-300 ease-in-out space-y-4 ${
              isHeaderVisible ? 'top-36' : 'top-4'
            }`}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                  {typology}
                </h1>
                <p className="text-gray-500 text-sm mt-1 capitalize">
                  Torre: {tower}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="text-sm">
                    <div className="text-gray-500">Entrega estimada</div>
                    <div className="font-semibold">Diciembre 2026</div>
                  </div>
                </div>

                {Array.isArray(data.features) && data.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Características
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {data.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 ${
                              f.color || "bg-gray-600"
                            } rounded-full flex items-center justify-center`}
                          >
                            {/* el icono ya viene en f.icon desde apartmentData */}
                            <f.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="leading-tight text-left">
                            <div className="text-sm font-semibold text-gray-800">
                              {f.value}
                            </div>
                            <div className="text-xs text-gray-500">
                              {f.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-6 space-y-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    Comunicate para más información
                    <MessageCircleMore size={18} className="opacity-90" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
