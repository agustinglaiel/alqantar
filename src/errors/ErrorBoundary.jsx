import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-500 py-8">
          <h3>Algo salió mal.</h3>
          <p>{this.state.error?.message || "Error desconocido."}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
