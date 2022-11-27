export const ImageGalleryItem = ({
  imgUrl,
  tags,
  largeImageURL,
  onPreview,
  imgId,
}) => {
  return (
    <li
      className="GalleryItem"
      id={imgId}
      onClick={() => onPreview(largeImageURL, tags)}
    >
      <img className="ImageGalleryItem-image" src={imgUrl} alt={tags} />
    </li>
  );
};
