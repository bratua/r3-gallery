import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { InfinitySpin } from 'react-loader-spinner';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends PureComponent {
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

  render() {
    const { url, alt, children } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          {children}
          <img src={url} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
