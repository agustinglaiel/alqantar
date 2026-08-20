import ProgressiveImage from "../ProgressiveImage";

/**
 * Tile for image/video grids (gallery, ficha thumbnails). Merges the old
 * MediaCard/LazyMediaCard, which differed only in a fixed size and whether
 * the image scaled on hover — both are props now.
 *
 * @param {string} [sizeClassName="h-52 w-full"] - size utility classes
 * @param {boolean} [scaleOnHover=false] - zoom the image slightly on hover
 * @param {"cover"|"contain"} [imageFit="cover"]
 */
function MediaTile({
  src,
  type = "image",
  alt,
  onClick,
  className = "",
  sizeClassName = "h-52 w-full",
  imageFit = "cover",
  sizes = "100vw",
  scaleOnHover = false,
}) {
  const isVideo = type.toLowerCase() === "video";
  // Renders as a real <button> when clickable, so the tile is reachable and
  // activatable by keyboard — before this was a <div onClick>, invisible to
  // Tab/Enter/Space.
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-label={onClick ? alt || "Ver imagen ampliada" : undefined}
      className={`group relative block cursor-pointer overflow-hidden rounded-md shadow-sm ${sizeClassName} ${className}`}
    >
      <div className="absolute size-full">
        {isVideo ? (
          <div className="flex size-full items-center justify-center bg-ink-900">
            <svg className="size-16 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        ) : (
          <ProgressiveImage
            src={src}
            alt={alt}
            fit={imageFit}
            sizes={sizes}
            className="size-full"
            imgClassName={`${scaleOnHover ? "transition-transform duration-base group-hover:scale-105" : ""} ${
              imageFit === "contain" ? "p-1" : ""
            }`}
          />
        )}
      </div>

      {/* Overlay con ícono de zoom */}
      <div className="bg-ink-900/0 group-hover:bg-ink-900/20 absolute inset-0 flex items-center justify-center transition-colors duration-base">
        <svg
          className="size-8 text-white opacity-0 transition-opacity duration-base group-hover:opacity-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </div>
    </Tag>
  );
}

export default MediaTile;
