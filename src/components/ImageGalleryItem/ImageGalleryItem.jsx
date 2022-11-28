import { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Box from 'components/Box';
import { ImageLoader } from 'components/Loader';

export class ImageGalleryItem extends PureComponent {
  static propType = {
    imgUrl: PropTypes.string,
    largeImageURL: PropTypes.string,
    imgId: PropTypes.string,
    tags: PropTypes.string,
    onPreview: PropTypes.func,
    onLoad: PropTypes.func,
  };

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
          {!this.state.loaded && <ImageLoader />}
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
