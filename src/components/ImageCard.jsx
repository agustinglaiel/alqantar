function ImageCard({ src, alt, caption }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={src} alt={alt} className="w-full h-48 object-cover" />
      {caption && <p className="p-4 text-gray-700">{caption}</p>}
    </div>
  );
}

export default ImageCard;