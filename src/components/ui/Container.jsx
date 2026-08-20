/**
 * Centers content and caps its width at `--content-max`, with responsive
 * horizontal gutters (`--gutter`). Replaces the repeated
 * `mx-auto max-w-screen-xl px-4`.
 *
 * @param {string} [className]
 */
function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-content px-[var(--gutter)] ${className}`}>
      {children}
    </div>
  );
}

export default Container;
