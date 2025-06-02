function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-screen-lg mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Alqantar. Todos los derechos reservados.</p>
        <div className="mt-2">
          <a href="https://twitter.com" target="_blank" className="text-blue-400 hover:text-blue-600 mx-2">Twitter</a>
          <a href="https://instagram.com" target="_blank" className="text-blue-400 hover:text-blue-600 mx-2">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;