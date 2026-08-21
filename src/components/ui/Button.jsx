import { Link } from "react-router-dom";

const VARIANT_CLASSES = {
  primary: "bg-accent-600 text-white hover:bg-accent-700",
  // A touch deeper than primary — for a second solid CTA sitting right next
  // to a primary one (hero), so the two read as distinct without a border.
  "primary-deep": "bg-accent-700 text-white hover:bg-accent-600",
  // ring-inset, not border: a real border grows the box by 2px beyond
  // min-height, which throws off buttons meant to match a sibling's height
  // exactly (e.g. the ficha's two aside CTAs).
  secondary: "ring-1 ring-inset ring-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white",
  ghost: "text-ink-900 hover:bg-surface-alt",
  // Header CTA on the solid (accent-700) bar — white pill instead of another
  // green on green.
  invert: "bg-white text-accent-700 hover:bg-white/90",
  // White text on --whatsapp (#25D366) is ~2:1 contrast — fails WCAG AA.
  // ink-900 on the same green is ~8.75:1, so it stays legible without
  // touching the brand-green token itself.
  whatsapp: "bg-whatsapp text-ink-900 hover:brightness-95",
};

const SIZE_CLASSES = {
  sm: "min-h-[var(--tap-min)] px-4 py-2 text-caption",
  md: "min-h-[var(--tap-min)] px-5 py-2.5 text-body",
  lg: "min-h-[var(--tap-min)] px-6 py-3 text-body-l",
};

/**
 * Base button used across the site. Pill-shaped (`--radius-full`), four
 * variants × three sizes. Renders a `<button>` by default, a react-router
 * `<Link>` when `to` is passed, or a plain `<a>` when `href` is passed —
 * same look, whichever DOM element the destination calls for.
 *
 * @param {"primary"|"primary-deep"|"secondary"|"ghost"|"whatsapp"|"invert"} [variant="primary"]
 * @param {"sm"|"md"|"lg"} [size="md"]
 * @param {string} [to] - react-router destination; renders a `<Link>`
 * @param {string} [href] - external/plain destination; renders an `<a>`
 * @param {string} [className]
 */
function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-fast ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
