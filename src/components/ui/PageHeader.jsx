import Overline from "./Overline";

/**
 * Standard page title block: optional overline, an `<h1>`, and a short
 * description ("bajada").
 *
 * @param {string} [overline]
 * @param {string} title
 * @param {string} [description]
 * @param {string} [className]
 */
function PageHeader({ overline, title, description, className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      {overline && <Overline className="mb-3">{overline}</Overline>}
      <h1 className="font-display text-display-l text-ink-900">{title}</h1>
      {description && (
        <p className="mx-auto mt-4 max-w-prose text-body-l text-ink-700">
          {description}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
