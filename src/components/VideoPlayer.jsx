function VideoPlayer({ src, title }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <iframe
        className="w-full h-48"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {title && <p className="p-4 text-gray-700">{title}</p>}
    </div>
  );
}

export default VideoPlayer;