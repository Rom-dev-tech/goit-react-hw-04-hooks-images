import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Loading from '../Loader';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, modalImage, modalImageAlt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleKeyDown = useCallback(
    (evt) => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  const isLoadingStop = () => {
    setIsLoading(false);
  };

  const onLoadClick = (href) => {
    const FileSaver = require('file-saver');
    FileSaver.saveAs(href, 'image.jpg');
    closeModal();
  };

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        {isLoading && <Loading />}
        <div className="image__wrapper">
          <img
            onLoad={isLoadingStop}
            className="modal__image"
            src={modalImage}
            alt={modalImageAlt}
          />

          <button
            className="downloade__button"
            type="button"
            onClick={() => onLoadClick(modalImage)}
          ></button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
  modalImageAlt: PropTypes.string.isRequired,
};

export default Modal;
