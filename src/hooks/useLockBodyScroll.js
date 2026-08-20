import { useEffect } from "react";

/**
 * Locks page scroll while `active` is true, restoring the previous
 * `body` overflow value on cleanup.
 *
 * @param {boolean} active
 */
function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}

export default useLockBodyScroll;
