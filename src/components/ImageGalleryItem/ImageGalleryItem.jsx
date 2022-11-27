export const ImageGalleryItem = ({
  imgUrl,
  tags,
  largeImageURL,
  onPreview,
  imgId,
  onLoad,
}) => {
  return (
    <li
      className="GalleryItem"
      id={imgId}
      onClick={() => onPreview(largeImageURL, tags)}
    >
      <img
        className="ImageGalleryItem-image"
        src={imgUrl}
        alt={tags}
        onLoad={onLoad}
      />
    </li>
  );
};
