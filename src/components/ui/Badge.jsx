/**
 * Small pill label for tags/status ("Próximamente", counts, etc).
 *
 * @param {string} [className]
 */
function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-caption font-medium text-accent-700 ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
