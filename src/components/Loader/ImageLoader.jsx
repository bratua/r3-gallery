import { OvalLoader } from 'components/Loader';

export const ImageLoader = () => {
  return (
    <>
      <div className="ImageWall"></div>
      <div className="ImageLoader">
        <OvalLoader />
      </div>
    </>
  );
};
