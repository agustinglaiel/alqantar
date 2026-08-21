/**
 * Applies the fixed header's height as top padding, once, so pages don't
 * each hardcode `pt-32`/`pt-40`. Pass `offset={false}` for pages where the
 * header is meant to overlay the content instead of pushing it down (e.g.
 * the home hero, which sits behind a transparent header).
 *
 * @param {boolean} [offset=true]
 * @param {string} [className]
 */
function Page({ children, offset = true, className = "" }) {
  return (
    <div className={`${offset ? "pt-[calc(var(--header-h)+var(--safe-top))]" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default Page;
