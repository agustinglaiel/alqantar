const BG_CLASSES = {
  surface: "bg-surface",
  "surface-alt": "bg-surface-alt",
};

/**
 * Vertical rhythm wrapper for page sections, using `--section-y` for
 * top/bottom padding. Optional background tone.
 *
 * @param {"surface"|"surface-alt"} [bg]
 * @param {string} [className]
 */
function Section({ children, bg, className = "", id }) {
  return (
    <section
      id={id}
      className={`py-[var(--section-y)] ${bg ? BG_CLASSES[bg] : ""} ${className}`}
    >
      {children}
    </section>
  );
}

export default Section;
