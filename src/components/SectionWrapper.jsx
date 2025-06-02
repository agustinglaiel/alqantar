function SectionWrapper({ children, className }) {
  return (
    <section className={`py-12 px-4 ${className}`}>
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </section>
  );
}

export default SectionWrapper;