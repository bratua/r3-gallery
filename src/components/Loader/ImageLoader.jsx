import { OvalLoader } from 'components/Loader';

export const ImageLoader = () => {
  return (
    <>
      <div className="ImageWall"></div>
      {/* <OvalLoader className="ImageLoader" /> */}
      <div className="ImageLoader">
        <OvalLoader />
      </div>
    </>
  );
};
