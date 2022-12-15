import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [url, setUrl] = useState('');

  const handleOpenModal = url => {
    setUrl(url);
  };

  const handleCloseModal = () => {
    setUrl('');
  };

  return (
    <>
      <li
        className={css.gallery__item}
        onClick={() => handleOpenModal(largeImageURL)}
      >
        <img src={webformatURL} alt="images" width="300" />
      </li>
      {url !== '' && <Modal url={url} handleCloseModal={handleCloseModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
