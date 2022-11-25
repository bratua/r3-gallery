import { InfinitySpin } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Modal } from 'components/Modal';

export const Loader = () => {
  return (
    <Modal>
      <InfinitySpin width="200" color="#4fa94d" />
    </Modal>
  );
};
