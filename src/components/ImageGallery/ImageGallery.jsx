import Box from 'components/Box';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { PureComponent } from 'react';
import * as API from 'API_Pixabay/API_Pixabay';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';

export class ImageGallery extends PureComponent {
  state = {
    pictures: [],
    picturesCount: 0,
    page: 1,
    progress: 'idle',
    showModal: false,
    pictureAlt: '',
    pictureLargeUrl: '',
    scrollToId: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      await this.getPictures();
      await this.scrollNextPage();
      // this.onLoad();
    }
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ pictures: [], page: 1 });
      await this.getPictures();
    }
  }

  scrollNextPage = async () => {
    setTimeout(() => {
      const target = this.state.scrollToId;
      const targetItem = document.getElementById(`${target}`);
      console.log('target', target);
      console.log('targetItem', targetItem);
      targetItem.scrollIntoView();
    }, 0);
  };

  onNext = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  getPictures = async () => {
    this.setState({ progress: 'loading' });
    const pictures = await API.getQueryPicture(
      this.props.searchQuery,
      this.state.page
    );
    console.log(pictures);

    this.setState(prevProps => ({
      pictures: [...prevProps.pictures, ...pictures],
      // progress: 'loaded',
      scrollToId: pictures[0].id,
      picturesCount: pictures.length,
    }));
  };

  onPreview = (url, alt) => {
    // console.log(url, alt);
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
    }, 20);
  };

  onLoadImgCheck = async loadStatus => {
    if (loadStatus.type === 'load') {
      this.setState(prevProps => ({
        picturesCount: prevProps.picturesCount - 1,
      }));
      this.onLoad();
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
          ></Modal>
        )}

        {progress === 'loading' && <Loader />}

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
            disabled={this.state.pictures.length < 12}
            onClick={this.onNext}
          >
            Next
          </Button>
        )}
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
