function VideoPlayer({ src, title }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <iframe
        className="h-48 w-full"
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