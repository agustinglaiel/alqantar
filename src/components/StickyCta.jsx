import { useEffect, useRef, useState } from "react";
import { MessageCircleMore } from "lucide-react";
import Button from "./ui/Button";
import { whatsappLink } from "../data/project";

const WHATSAPP_LINK = whatsappLink();
const SHOW_AFTER_Y = 300;

/**
 * Mobile-only bottom bar with quick "WhatsApp" + "Ver tipologías" actions,
 * shown after the first scroll so it doesn't compete with the hero.
 *
 * Publishes its own height as --sticky-cta-h on <html> (D20) while visible,
 * and back to 0px while hidden, so Layout can reserve exactly that much
 * bottom padding on <main> without either component needing to know the
 * other's state directly.
 */
function StickyCta() {
  const [visible, setVisible] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_Y);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!visible) {
      root.style.setProperty("--sticky-cta-h", "0px");
      return undefined;
    }
    const updateHeight = () => {
      if (barRef.current) {
        root.style.setProperty("--sticky-cta-h", `${barRef.current.offsetHeight}px`);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      root.style.setProperty("--sticky-cta-h", "0px");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-line bg-surface p-3 pb-[calc(0.75rem+var(--safe-bottom))] shadow-md md:hidden"
    >
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
