import css from './Modal.module.css';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ handleCloseModal, url }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  const handleOverlayClose = useCallback(
    event => {
      if (event.target === event.currentTarget) {
        handleCloseModal();
      }
      return;
    },
    [handleCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
