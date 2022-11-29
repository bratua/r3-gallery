import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
// import { InfinitySpin } from 'react-loader-spinner';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends PureComponent {
  static propTypes = {
    close: PropTypes.func,
    url: PropTypes.string,
    alt: PropTypes.string,
  };
  state = {
    imgLoaded: false,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.close();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.close();
    }
  };

  onLoad = e => {
    if (e.type === 'load') {
      this.setState(({ imgLoaded }) => ({
        imgLoaded: !imgLoaded,
      }));
    }
  };

  render() {
    const { url, alt, children } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          {!this.state.imgLoaded && children}
          <img src={url} alt={alt} onLoad={this.onLoad} />
        </div>
      </div>,
      modalRoot
    );
  }
}
