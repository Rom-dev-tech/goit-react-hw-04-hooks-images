import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../ImageGallery';
import imageAPI from '../../services/images-api';
import Button from '../Button';
import Loading from '../Loader';
import Modal from '../Modal';
import Notification from '../Notification';
import AboutAppInfo from '../AboutAppInfo';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImagesView = ({ searchQuery, toggleClearPage }) => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [isClickButtonLoadMore, setIsClickButtonLoadMore] = useState(false);

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const pageIncrement = () => setPage((state) => state + 1);

  const toggleModal = () => setShowModal(!showModal);

  const closeModal = () => {
    toggleModal();
    setModalImage('');
    setModalImageAlt('');
  };

  const openModal = (url, alt) => {
    toggleModal();
    setModalImage(url);
    setModalImageAlt(alt);
  };

  useEffect(() => {
    setStatus(Status.IDLE);
  }, [toggleClearPage]);

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }

    setStatus(Status.PENDING);
    setPage(1);
    setIsClickButtonLoadMore(false);

    if (searchQuery === '') {
      setTimeout(() => {
        setError({ message: 'Ops, empty. Please enter something...' });
        setStatus(Status.REJECTED);
      }, 500);
      return;
    }

    imageAPI(searchQuery, 1)
      .then((images) => {
        setImages(images);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    setStatus(Status.PENDING);
    setIsClickButtonLoadMore(true);

    imageAPI(searchQuery, page)
      .then((images) => {
        setImages((state) => [...state, ...images]);
        setStatus(Status.RESOLVED);
        scroll();
      })
      .catch((error) => {
        setImages([]);
        setError({ message: 'Sorry, no more pictures ...' });
        setStatus(Status.REJECTED);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); //!

  if (status === 'idle') {
    return <AboutAppInfo />;
  }

  if (status === 'pending') {
    return (
      <>
        {isClickButtonLoadMore && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        <Loading />
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Notification message={error.message} />
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery images={images} openModal={openModal} />
        {images.length >= 12 ? <Button page={pageIncrement} /> : null}
        {showModal && (
          <Modal
            closeModal={closeModal}
            modalImage={modalImage}
            modalImageAlt={modalImageAlt}
          />
        )}
      </>
    );
  }
};

ImagesView.propTypes = {
  searchQuery: PropTypes.string,
  toggleClearPage: PropTypes.bool.isRequired,
};

export default ImagesView;
