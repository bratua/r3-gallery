import { OvalLoader } from 'components/Loader';
import { PureComponent } from 'react';
import Box from 'components/Box';

// export const ImageGalleryItem = ({
//   imgUrl,
//   tags,
//   largeImageURL,
//   onPreview,
//   imgId,
//   onLoad,
// }) => {
//   return (
//     <li
//       className="GalleryItem"
//       id={imgId}
//       onClick={() => onPreview(largeImageURL, tags)}
//     >
//       <img
//         className="ImageGalleryItem-image"
//         src={imgUrl}
//         alt={tags}
//         onLoad={onLoad}
//       />
//     </li>
//   );
// };

export class ImageGalleryItem extends PureComponent {
  state = {
    loaded: false,
  };

  checkImgLoad = event => {
    if (event.type === 'load') {
      this.setState({ loaded: true });
      this.props.onLoad(true);
    }
  };

  render() {
    const { imgUrl, tags, largeImageURL, onPreview, imgId } = this.props;

    return (
      <li
        className="GalleryItem"
        id={imgId}
        onClick={() => onPreview(largeImageURL, tags)}
      >
        <Box className="ImageWraper">
          {!this.state.loaded && (
            <>
              <div className="ImageWall"></div>
              <div className="ImageLoader">
                <OvalLoader />
              </div>
            </>
          )}
          <img
            className="ImageGalleryItem-image"
            src={imgUrl}
            alt={tags}
            onLoad={this.checkImgLoad}
          />
        </Box>
      </li>
    );
  }
}
