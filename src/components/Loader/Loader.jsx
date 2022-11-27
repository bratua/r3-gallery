import { InfinitySpin, Oval } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Modal } from 'components/Modal';

export const InfinitLoader = () => {
  return (
    <Modal>
      <InfinitySpin width="200" color="#4fa94d" />
    </Modal>
  );
};

export const OvalLoader = () => {
  return (
    <Oval
      height={40}
      width={40}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={3}
      strokeWidthSecondary={5}
    />
  );
};
