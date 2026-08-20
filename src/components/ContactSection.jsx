import { Instagram, Facebook, Mail, MessageCircleMore } from "lucide-react";
import project, { whatsappLink } from "../data/project";
import Button from "./ui/Button";
import Overline from "./ui/Overline";

const secondaryChannels = [
  { icon: Instagram, label: "Instagram", href: project.social.instagram, external: true },
  { icon: Facebook, label: "Facebook", href: project.social.facebook, external: true },
  { icon: Mail, label: "Email", href: `mailto:${project.email}` },
];

/**
 * Sober contact block: WhatsApp is the one highlighted CTA (the channel
 * this audience actually uses), everything else is a discreet ink-toned
 * link — no saturated color circles, no purple→pink→orange gradient.
 */
function ContactSection() {
  return (
    <div className="text-center">
      <Overline>Contacto</Overline>
      <h2 className="mt-3 font-display text-h2 text-ink-900">Conversemos sobre Alqantar</h2>
      <p className="mx-auto mt-4 max-w-prose text-body-l text-ink-700">
        Escribinos por WhatsApp para recibir información, coordinar una
        visita o resolver cualquier duda sobre el proyecto.
      </p>

      <Button
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        variant="whatsapp"
        size="lg"
        className="mt-8"
      >
        <MessageCircleMore className="size-5" />
        Escribir por WhatsApp
      </Button>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-line pt-8">
        {secondaryChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-body text-ink-500 transition-colors duration-fast hover:text-ink-900"
            >
              <Icon className="size-5" />
              {channel.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default ContactSection;
