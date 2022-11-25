import Box from 'components/Box';
import { PureComponent } from 'react';
import { SearchBar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import * as API from 'API_Pixabay/API_Pixabay';
import { Modal } from 'components/Modal';

export class App extends PureComponent {
  state = {
    searchQuery: '',
    page: 1,
    pictures: [],
    showModal: false,
    pictureAlt: '',
    pictureLargeUrl: '',
    progress: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.getPictures();
    }
  }

  onSearch = query => {
    if (query === this.state.searchQuery) {
      return;
    }
    this.setState({ searchQuery: query, page: 1, pictures: [] });
  };

  onNext = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  getPictures = async () => {
    const pictures = await API.getQueryPicture(
      this.state.searchQuery,
      this.state.page
    );
    // this.setState({ pictures });
    console.log(pictures);
    this.setState(prevProps => ({
      pictures: [...prevProps.pictures, ...pictures],
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

  render() {
    const { pictureLargeUrl, pictureAlt, showModal } = this.state;
    return (
      <Box className="App">
        <SearchBar onSubmit={this.onSearch} />
        <ImageGallery
          pictures={this.state.pictures}
          onPreview={this.onPreview}
        />
        <button
          type="button"
          className="Button"
          disabled={this.state.pictures.length < 12}
          onClick={this.onNext}
        >
          <span className="button-label">Next</span>
        </button>

        {showModal && (
          <Modal
            url={pictureLargeUrl}
            alt={pictureAlt}
            close={this.toggleModal}
          ></Modal>
        )}
      </Box>
    );
  }
}
