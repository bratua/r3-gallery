import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as API from 'API_Pixabay/API_Pixabay';
import Box from 'components/Box';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { ImageLoader } from 'components/Loader';
export class ImageGallery extends PureComponent {
  static propTypes = { searchQuery: PropTypes.string };

  state = {
    pictures: [],
    picturesCount: 0,
    page: 1,
    progress: 'idle',
    showModal: false,
    pictureAlt: '',
    pictureLargeUrl: '',
    scrollToId: null,
    errorMessage: null,
    imagesLeft: null,
    imagesInQuery: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    // console.log('upp start');
    if (this.state.page !== prevState.page) {
      await this.getPictures();
      await this.scrollNextPage();
      await this.showStats();

      // this.onLoad();
    }
    // console.log('upp end');

    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ pictures: [], page: 1 });
      await this.getPictures();
      this.showStats();
    }
  }

  showStats = async () => {
    setTimeout(() => {
      let totalPages = Math.ceil(this.state.imagesInQuery / 12);
      let pagesLeft = totalPages - this.state.page;

      if (this.state.pictures.length > 0) {
        toast.success(
          `Найдено:
          изображений: ${this.state.imagesInQuery};
          страниц: ${totalPages};
          страниц осталось: ${pagesLeft};
          вы на: ${this.state.page} странице;`,
          {
            position: 'top-right',
          }
        );
      }
    }, 0);
  };

  scrollNextPage = async () => {
    setTimeout(() => {
      const target = this.state.scrollToId;
      const targetItem = document.getElementById(`${target}`);
      targetItem.scrollIntoView();
    }, 0);
  };

  onNext = () => {
    this.setState(prev => ({
      page: prev.page + 1,
      imagesLeft: prev.imagesInQuery - this.state.page * 12,
    }));
  };

  getPictures = async () => {
    let pictures = [];
    let statsQuery = null;
    try {
      this.setState({ progress: 'loading' });
      const apiResponse = await API.getQueryPicture(
        this.props.searchQuery,
        this.state.page
      );
      pictures = apiResponse.hits;
      statsQuery = apiResponse.stats;
      if (pictures.length === 0) {
        // console.log('No images!');
        throw new Error(
          `${this.props.searchQuery} Картинок по зпросу не найдено!`
        );
      }
    } catch (error) {
      // console.log('catch ', error.message);
      toast.error(error.message, {
        position: 'top-right',
      });
      this.setState({
        errorMessage: error.message,
        progress: 'idle',
      });
      return;
    }

    this.setState(prevProps => ({
      pictures: [...prevProps.pictures, ...pictures],
      scrollToId: pictures[0].id,
      picturesCount: pictures.length,
      imagesInQuery: statsQuery,
    }));
  };

  onPreview = (url, alt) => {
    this.setState({ pictureAlt: alt, pictureLargeUrl: url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onLoad = () => {
    setTimeout(() => {
      if (this.state.picturesCount === 0) {
        this.setState({ progress: 'loaded' });
      }
    }, 0);
  };

  onLoadImgCheck = loadStatus => {
    // console.log(loadStatus);
    if (loadStatus) {
      this.setState(prevProps => ({
        picturesCount: prevProps.picturesCount - 1,
      }));
      this.onLoad();
      return;
    }
  };

  render() {
    const { pictures, pictureLargeUrl, pictureAlt, showModal, progress } =
      this.state;

    if (progress === 'idle') {
      return (
        <Box
          display="flex"
          textAlign="centercd"
          flexDirection="column"
          height="900px"
          alignItems="center"
          justifyContent="center"
          fontSize="100px"
        >
          <h3>Pixabay Search Pictures Machine</h3>
          <p>by LSP</p>
        </Box>
      );
    }

    return (
      <Box>
        {showModal && (
          <Modal
            url={pictureLargeUrl}
            alt={pictureAlt}
            close={this.toggleModal}
          >
            <ImageLoader />
          </Modal>
        )}

        {/* {progress === 'loading' && <InfinitLoader />} */}

        <ul className="ImageGallery" id="imageGallery">
          {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              imgUrl={webformatURL}
              largeImageURL={largeImageURL}
              imgId={id}
              tags={tags}
              onPreview={this.onPreview}
              onLoad={this.onLoadImgCheck}
            />
          ))}
        </ul>

        {progress === 'loaded' && (
          <Button
            type="button"
            className="Button"
            disabled={
              this.state.pictures.length < 12 ||
              this.state.pictures.length % 12 !== 0
            }
            onClick={this.onNext}
          >
            Next
          </Button>
        )}
      </Box>
    );
  }
}
