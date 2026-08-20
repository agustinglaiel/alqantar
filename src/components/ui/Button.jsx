import { Link } from "react-router-dom";

const VARIANT_CLASSES = {
  primary: "bg-accent-600 text-white hover:bg-accent-700",
  secondary: "border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white",
  ghost: "text-ink-900 hover:bg-surface-alt",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-caption",
  md: "px-5 py-2.5 text-body",
  lg: "px-6 py-3 text-body-l",
};

/**
 * Base button used across the site. Pill-shaped (`--radius-full`), four
 * variants × three sizes. Renders a `<button>` by default, a react-router
 * `<Link>` when `to` is passed, or a plain `<a>` when `href` is passed —
 * same look, whichever DOM element the destination calls for.
 *
 * @param {"primary"|"secondary"|"ghost"|"whatsapp"} [variant="primary"]
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
