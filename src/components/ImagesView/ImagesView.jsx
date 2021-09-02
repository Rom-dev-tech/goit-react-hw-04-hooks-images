import { Component } from 'react';
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

//Props - searchQuery = // = toggleClearPage

class ImagesView extends Component {
  state = {
    page: 1,
    images: [],
    showModal: false,
    modalImage: '',
    modalImageAlt: '',
    error: null,
    status: Status.IDLE,
    isClickButtonLoadMore: false,
  };

  scroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  pageIncrement = () =>
    this.setState((prevState) => ({ page: prevState.page + 1 }));

  closeModal = () => {
    this.toggleModal();

    this.setState(({ modalImage }) => ({
      modalImage: '',
      modalImageAlt: '',
    }));
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  openModal = (url, alt) => {
    this.toggleModal();

    this.setState(({ modalImage }) => ({
      modalImage: url,
      modalImageAlt: alt,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuerry = prevProps.searchQuery;
    const nextSearchQuerry = this.props.searchQuery;
    const prevToggleClearStartPage = prevProps.toggleClearPage;
    const nextToggleClearStartPage = this.props.toggleClearPage;
    const prevPage = prevState.page;
    const nextpage = this.state.page;
    const prevImages = prevState.images;
    const prevmodalImage = prevState.modalImage;
    const nextmodalImage = this.state.modalImage;
    const prevShowModal = prevState.showModal;
    const nextshowModal = this.state.showModal;

    if (prevToggleClearStartPage !== nextToggleClearStartPage) {
      this.setState({ status: Status.IDLE });
    }

    if (prevmodalImage !== nextmodalImage) {
      return;
    }

    if (prevSearchQuerry !== nextSearchQuerry) {
      this.setState({
        status: Status.PENDING,
        page: 1,
        isClickButtonLoadMore: false,
      });

      if (nextSearchQuerry === '') {
        setTimeout(() => {
          this.setState({
            error: {
              message: 'Ops, empty. Please enter something...',
            },
            status: Status.REJECTED,
          });
        }, 500);
        return;
      }

      imageAPI(nextSearchQuerry, 1)
        .then((images) => this.setState({ images, status: Status.RESOLVED }))
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }

    if (nextpage === 1) {
      return;
    }

    if (prevPage !== nextpage) {
      this.setState({ status: Status.PENDING, isClickButtonLoadMore: true });

      imageAPI(prevSearchQuerry, nextpage)
        .then((images) => {
          this.setState({
            images: [...prevImages, ...images],
            status: Status.RESOLVED,
          });
        })
        .catch((error) =>
          this.setState({
            images: [],
            error: {
              message: 'Sorry, no more pictures ...',
              status: Status.REJECTED,
            },
          })
        );
    }

    if (!prevShowModal && !nextshowModal) {
      this.scroll();
    }
  }

  render() {
    const {
      images,
      showModal,
      modalImage,
      modalImageAlt,
      error,
      status,
      isClickButtonLoadMore,
    } = this.state;

    if (status === 'idle') {
      return <AboutAppInfo />;
    }

    if (status === 'pending') {
      return (
        <>
          {isClickButtonLoadMore && (
            <ImageGallery images={images} openModal={this.openModal} />
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
          <ImageGallery images={images} openModal={this.openModal} />
          {images.length >= 12 ? <Button page={this.pageIncrement} /> : null}
          {showModal && (
            <Modal
              closeModal={this.closeModal}
              modalImage={modalImage}
              modalImageAlt={modalImageAlt}
            />
          )}
        </>
      );
    }
  }
}

export default ImagesView;
