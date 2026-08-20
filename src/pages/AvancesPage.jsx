import React from 'react';
import AvancesDisplay from '../components/AvancesDisplay';
import Page from '../components/ui/Page';
import Container from '../components/ui/Container';

export default function AvancesPage() {
  const metrics = [
    { label: 'Departamentos construidos', completed: 18, total: 70, colorClass: 'bg-cyan-500' },
    { label: 'Metros cuadrados construidos', completed: 1000, total: 5000, colorClass: 'bg-green-500' },
    { label: 'Unidades vendidas', completed: 2, total: 50, colorClass: 'bg-blue-500' },
    { label: 'Amenities construidos', completed: 3, total: 5, colorClass: 'bg-purple-500' },
  ];

  return (
    <Page className="relative min-h-screen">
      <Container className="relative z-10 py-20">
        <div className="relative rounded-md bg-white p-4 shadow-sm md:p-12">
          {/* Líneas divisorias - solo visibles en desktop */}
          <div className="absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 bg-gray-200 md:block"></div>
          <div className="absolute inset-x-8 top-1/2 hidden h-px -translate-y-1/2 bg-gray-200 md:block"></div>
          
          <div className="grid min-h-[500px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="relative flex items-center justify-center">
                {/* Línea separadora horizontal para móviles (excepto el último elemento) */}
                {index < metrics.length - 1 && (
                  <div className="absolute inset-x-4 bottom-0 h-px bg-gray-200 md:hidden"></div>
                )}
                <AvancesDisplay
                  label={metric.label}
                  completed={metric.completed}
                  total={metric.total}
                  colorClass={metric.colorClass}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Page>
  );
}