import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ handleCloseModal, url }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      handleCloseModal();
    }
  };

  const handleOverlayClose = event => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }

    return;
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClose}>
      <div className={css.modal}>
        <img src={url} alt="big" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Modal;
