import Box from 'components/Box';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { PureComponent } from 'react';
import * as API from 'API_Pixabay/API_Pixabay';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';

export class ImageGallery extends PureComponent {
  state = {
    pictures: [],
    page: 1,
    progress: 'idle',
    showModal: false,
    pictureAlt: '',
    pictureLargeUrl: '',
  };

  componentDidMount() {
    this.setState({
      pictures: [],
      page: 1,
      progress: 'idle',
      showModal: false,
      pictureAlt: '',
      pictureLargeUrl: '',
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.getPictures();
    }
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ pictures: [], page: 1 });
      this.getPictures();
    }
  }

  onNext = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  getPictures = async () => {
    this.setState({ progress: 'loading' });
    // const pictures = await API.getQueryPicture(
    //   this.props.searchQuery,
    //   this.state.page
    // );
    // this.setState(prevProps => ({
    //   pictures: [...prevProps.pictures, ...pictures],
    // }));

    setTimeout(async () => {
      const pictures = await API.getQueryPicture(
        this.props.searchQuery,
        this.state.page
      );
      this.setState(prevProps => ({
        pictures: [...prevProps.pictures, ...pictures],
        progress: 'loaded',
      }));
    }, 1000);
  };

  onPreview = (url, alt) => {
    // console.log(url, alt);
    this.setState({ pictureAlt: alt, pictureLargeUrl: url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { pictures, pictureLargeUrl, pictureAlt, showModal, progress } =
      this.state;

    return (
      <Box>
        {showModal && (
          <Modal
            url={pictureLargeUrl}
            alt={pictureAlt}
            close={this.toggleModal}
          ></Modal>
        )}

        {progress === 'loading' && <Loader />}

        <ul className="ImageGallery">
          {pictures.map(pic => (
            <ImageGalleryItem
              key={pic.id}
              imgUrl={pic.webformatURL}
              largeImageURL={pic.largeImageURL}
              imgId={pic.id}
              tags={pic.tags}
              onPreview={this.onPreview}
            />
          ))}
        </ul>
        <button
          type="button"
          className="Button"
          disabled={this.state.pictures.length < 12}
          onClick={this.onNext}
        >
          <span>Next</span>
        </button>
      </Box>
    );

    // if (progress === 'idle') {
    //   return;
    // }

    // if (progress === 'loading') {
    //   return <Loader />;
    // }

    // if (progress === 'loaded') {
    //   return (
    //     <Box>
    //       {showModal && (
    //         <Modal
    //           url={pictureLargeUrl}
    //           alt={pictureAlt}
    //           close={this.toggleModal}
    //         ></Modal>
    //       )}

    //       <ul className="ImageGallery">
    //         {pictures.map(pic => (
    //           <ImageGalleryItem
    //             key={pic.id}
    //             imgUrl={pic.webformatURL}
    //             largeImageURL={pic.largeImageURL}
    //             imgId={pic.id}
    //             tags={pic.tags}
    //             onPreview={this.onPreview}
    //           />
    //         ))}
    //       </ul>
    //       <button
    //         type="button"
    //         className="Button"
    //         disabled={this.state.pictures.length < 12}
    //         onClick={this.onNext}
    //       >
    //         <span className="button-label">Next</span>
    //       </button>
    //     </Box>
    // );
  }
}
