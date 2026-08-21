import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * The header goes into "media" mode only while an element marked
 * data-header-over="media" (a photo hero) is under the header's own strip
 * of the viewport; otherwise it's "solid". There is no route list to
 * maintain: a page with no such element is always solid, and a new hero
 * only needs the attribute, not an entry here.
 *
 * @param {import("react").RefObject<HTMLElement>} headerRef
 * @returns {"media"|"solid"}
 */
function useHeaderTheme(headerRef) {
  const [mode, setMode] = useState("solid");
  const location = useLocation();

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return undefined;

    const intersecting = new Set();
    let observer = null;

    const connect = () => {
      observer?.disconnect();
      intersecting.clear();

      const targets = document.querySelectorAll('[data-header-over="media"]');
      if (targets.length === 0) {
        setMode("solid");
        return;
      }

      const bottomMargin = Math.max(window.innerHeight - headerEl.offsetHeight, 0);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          });
          setMode(intersecting.size > 0 ? "media" : "solid");
        },
        { rootMargin: `0px 0px -${bottomMargin}px 0px`, threshold: 0 }
      );
      targets.forEach((target) => observer.observe(target));
    };

    connect();
    window.addEventListener("resize", connect);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", connect);
    };
  }, [headerRef, location.pathname]);

  return mode;
}

export default useHeaderTheme;
