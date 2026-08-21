import { Link } from "react-router-dom";

const VARIANT_CLASSES = {
  invert: "text-white/70 hover:bg-white/10 hover:text-white",
  surface: "bg-surface/90 text-ink-900 shadow-sm hover:bg-surface",
};

/**
 * Icon-only control with a guaranteed `--tap-min` (44px) touch target,
 * regardless of the icon's own size (D19). Renders a `<button>` by default,
 * a react-router `<Link>` when `to` is passed, or a plain `<a>` when `href`
 * is passed.
 *
 * @param {"invert"|"surface"} [variant="invert"]
 * @param {string} [to] - react-router destination; renders a `<Link>`
 * @param {string} [href] - external/plain destination; renders an `<a>`
 * @param {string} [className]
 */
function IconButton({ variant = "invert", to, href, className = "", children, ...props }) {
  const classes = `inline-flex size-[var(--tap-min)] shrink-0 items-center justify-center rounded-full transition-colors duration-fast ${VARIANT_CLASSES[variant]} ${className}`;

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

export default IconButton;
