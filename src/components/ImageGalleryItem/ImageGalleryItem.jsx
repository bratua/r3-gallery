export const ImageGalleryItem = ({
  imgUrl,
  tags,
  largeImageURL,
  onPreview,
}) => {
  return (
    <li className="GalleryItem" onClick={() => onPreview(largeImageURL, tags)}>
      <img className="ImageGalleryItem-image" src={imgUrl} alt={tags} />
    </li>
  );
};
