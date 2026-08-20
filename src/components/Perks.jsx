import {
  Building2,
  Car,
  Users,
  Dumbbell,
  Waves,
  Building,
  Thermometer,
  Trees,
  ShieldCheck,
} from "lucide-react";
import project from "../data/project";
import Overline from "./ui/Overline";

/**
 * Three thematic columns (Escala · Bienestar · Entorno) replacing the wall
 * of ~12 identical cards. The headline figures are the sales argument, so
 * they render in display typography instead of `text-lg` like everything
 * else. All numbers come from `src/data/project.js`.
 */
function Perks() {
  const { metrics } = project;

  const columns = [
    {
      title: "Escala",
      stat: { value: metrics.units, label: "Unidades" },
      items: [
        { icon: Car, text: `${metrics.parkingUnderground} cocheras subterráneas` },
        { icon: Car, text: `${metrics.parkingCourtesy} cocheras de cortesía` },
        { icon: Building2, text: `${metrics.typologiesCount} tipologías, de 2 y 3 dormitorios` },
      ],
    },
    {
      title: "Bienestar",
      stat: { value: `${metrics.poolLengthM}`, label: "Metros de pileta" },
      items: [
        { icon: Dumbbell, text: "Gimnasio equipado" },
        { icon: Thermometer, text: "Sauna y sala de relax" },
        { icon: Building, text: `SUM y quinchos para ${metrics.sumCapacity} personas` },
        { icon: Users, text: "Coworking y oficina privada" },
      ],
    },
    {
      title: "Entorno",
      stat: { value: metrics.greenSpaceM2.toLocaleString("es-AR"), label: "m² de espacios verdes" },
      items: [
        { icon: Trees, text: `Ubicación en ${project.address.neighborhood}, ${project.address.city}` },
        { icon: Waves, text: "Jardines y bosque nativo integrados al diseño" },
        { icon: ShieldCheck, text: "Seguridad 24 hs" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
      {columns.map((column) => (
        <div key={column.title}>
          <Overline>{column.title}</Overline>
          <p className="mt-2 font-display text-display-l text-ink-900">{column.stat.value}</p>
          <p className="text-body text-ink-500">{column.stat.label}</p>

          <ul className="mt-6 space-y-3 border-t border-line pt-6">
            {column.items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.text} className="flex items-start gap-3 text-body text-ink-700">
                  <Icon className="mt-0.5 size-5 shrink-0 text-accent-600" />
                  <span>{item.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Perks;
