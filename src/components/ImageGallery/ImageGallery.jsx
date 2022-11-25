import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ pictures, onPreview }) => {
  return (
    <ul className="ImageGallery">
      {pictures.map(pic => (
        <ImageGalleryItem
          key={pic.id}
          imgUrl={pic.webformatURL}
          largeImageURL={pic.largeImageURL}
          imgId={pic.id}
          tags={pic.tags}
          onPreview={onPreview}
        />
      ))}
    </ul>
  );
};
