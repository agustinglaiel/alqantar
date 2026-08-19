function Button({ children, type = 'button', onClick, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;