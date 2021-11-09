import React from 'react';
import Loader from 'react-loader-spinner';
import style from '../Loader/Loader.module.css';

const PageLoader = () => (
  <div className={style.loader}>
    <Loader
      type="Hearts"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={15000} />
  </div>
);

export default PageLoader;