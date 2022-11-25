import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends PureComponent {
  componentDidMount() {
    console.log('modal mount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    console.log('modal update');
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
    const { url, alt } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={url} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
