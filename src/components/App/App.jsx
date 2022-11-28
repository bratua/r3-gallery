import Box from 'components/Box';
import { PureComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

export class App extends PureComponent {
  state = { searchQuery: '' };

  componentDidMount() {
    this.setState({ searchQuery: '' });
  }

  onSearch = query => {
    if (query === this.state.searchQuery) {
      return;
    }
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <Box className="App">
        <SearchBar onSubmit={this.onSearch} />

        <ImageGallery searchQuery={this.state.searchQuery} />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Box>
    );
  }
}
