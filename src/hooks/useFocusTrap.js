import { useEffect } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab/Shift+Tab focus inside `ref.current` while `active`, and moves
 * focus into it as soon as it becomes active. Does not restore focus on
 * deactivation — that's the caller's responsibility (see Modal, which
 * restores focus to the element that triggered it).
 *
 * @param {React.RefObject<HTMLElement>} ref
 * @param {boolean} active
 */
function useFocusTrap(ref, active) {
  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return;

    const getFocusable = () =>
      Array.from(node.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );

    const initial = getFocusable()[0];
    (initial || node).focus();

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", handleKeyDown);
    return () => node.removeEventListener("keydown", handleKeyDown);
  }, [active, ref]);
}

export default useFocusTrap;
