import { useEffect, useRef, useState } from "react";

/**
 * Tracks scroll direction to drive show/hide-on-scroll UI (header, sticky
 * asides). Ignores deltas smaller than `threshold` so trackpad micro-scrolls
 * don't cause flicker, and stays visible for the first `minY` pixels so the
 * UI doesn't hide before the user has scrolled meaningfully.
 *
 * @param {number} [threshold=8] - minimum scroll delta (px) before flipping direction
 * @param {number} [minY=100] - stays visible while scrollY is below this
 * @returns {boolean} true if the element should be visible (scrolling up, or near the top)
 */
function useScrollDirection({ threshold = 8, minY = 100 } = {}) {
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < minY) {
        setVisible(true);
        lastYRef.current = currentY;
        return;
      }

      const delta = currentY - lastYRef.current;
      if (Math.abs(delta) < threshold) return;

      setVisible(delta < 0);
      lastYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, minY]);

  return visible;
}

export default useScrollDirection;
