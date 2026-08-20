import { useEffect, useState } from "react";
import { MessageCircleMore } from "lucide-react";
import Button from "./ui/Button";

const WHATSAPP_LINK = "https://wa.me/5493517496383";
const SHOW_AFTER_Y = 300;

/**
 * Mobile-only bottom bar with quick "WhatsApp" + "Ver tipologías" actions,
 * shown after the first scroll so it doesn't compete with the hero.
 */
function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_Y);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-line bg-surface p-3 shadow-md md:hidden">
      <Button
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        variant="whatsapp"
        className="flex-1 justify-center"
      >
        <MessageCircleMore size={18} />
        WhatsApp
      </Button>
      <Button to="/departamentos" variant="secondary" className="flex-1 justify-center">
        Ver tipologías
      </Button>
    </div>
  );
}

export default StickyCta;
