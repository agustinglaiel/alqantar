/**
 * Small uppercase label (letter-spaced) used above headings. Combines the
 * `.overline` CSS utility (letter-spacing + uppercase, in tokens.css) with
 * the `text-overline` Tailwind size utility.
 *
 * @param {string} [className]
 */
function Overline({ children, className = "" }) {
  return (
    <p className={`text-overline font-semibold text-accent-600 overline ${className}`}>
      {children}
    </p>
  );
}

export default Overline;
