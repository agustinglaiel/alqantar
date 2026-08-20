import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/images/logo.webp";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
          <img src={logo} alt="Alqantar" className="h-12 w-auto" />
          <h3 className="text-xl font-semibold text-gray-800">Algo salió mal.</h3>
          <p className="text-gray-600">
            {this.state.error?.message || "Ocurrió un error inesperado."}
          </p>
          <Link
            to="/"
            className="mt-2 rounded-full bg-gray-800 px-6 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
          >
            Volver al inicio
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
