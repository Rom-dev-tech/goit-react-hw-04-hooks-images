import React from 'react';
import '../Loader/Loader.scss';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loading = () => {
  return (
    <Loader
      className="loader"
      type="Circles"
      color="#303f9f"
      height={100}
      width={100}
      // timeout={500}
    />
  );
};

export default Loading;
