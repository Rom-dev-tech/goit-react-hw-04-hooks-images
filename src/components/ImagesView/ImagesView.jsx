import { memo, useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery';
import imageAPI from '../../services/images-api';
import Button from '../Button';
import Loading from '../Loader';
import Modal from '../Modal';
import Notification from '../Notification';
import AboutAppInfo from '../AboutAppInfo';
import { useSearch } from '../Searchbar/SearchContext';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImagesView = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const {
    searchQuery,
    page,
    pageIncrement,
    isClickButtonLoadMore,
    togglePage,
  } = useSearch();

  useEffect(() => {
    setStatus(Status.IDLE);
  }, [togglePage]);

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }

    setStatus(Status.PENDING);

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

    imageAPI(searchQuery, page)
      .then((images) => {
        setImages((state) => [...state, ...images]);
        setStatus(Status.RESOLVED);
        scroll();
      })
      .catch((error) => {
        setError({ message: 'Sorry, no more pictures ...' });
        setStatus(Status.REJECTED);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); //!

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

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

export default memo(ImagesView);
