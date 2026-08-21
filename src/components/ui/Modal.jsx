import { useEffect, useLayoutEffect, useRef } from "react";
import useFocusTrap from "../../hooks/useFocusTrap";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

/**
 * Accessible modal shell: `role="dialog"`, `aria-modal`, focus trap, Escape
 * to close, body scroll lock, and restores focus to whatever triggered it
 * once it closes.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} [ariaLabel]
 * @param {string} [className] - classes for the dialog panel
 */
function Modal({ isOpen, onClose, children, ariaLabel, className = "" }) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  // Capture the trigger before useFocusTrap moves focus into the dialog:
  // layout effects run before passive effects, so this always wins the race.
  useLayoutEffect(() => {
    if (isOpen) triggerRef.current = document.activeElement;
  }, [isOpen]);

  useFocusTrap(dialogRef, isOpen);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus?.();
      triggerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain">
      <div
        className="absolute inset-0 bg-ink-900/80"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`relative outline-none ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
