import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import imageAPI from './services/images-api';
import Button from './components/Button';
import Loading from './components/Loader';
import Modal from './components/Modal';
import Notification from './components/Notification';
import AboutAppInfo from './components/AboutAppInfo';
import './App.scss';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchQuery: null,
    page: 1,
    images: [],
    showModal: false,
    modalImage: '',
    modalImageAlt: '',
    error: null,
    status: Status.IDLE,
  };

  scroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuerry = prevState.searchQuery;
    const nextSearchQuerry = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextpage = this.state.page;
    const prevImages = prevState.images;
    const prevmodalImage = prevState.modalImage;
    const nextmodalImage = this.state.modalImage;
    const prevShowModal = prevState.showModal;
    const nextshowModal = this.state.showModal;

    if (prevmodalImage !== nextmodalImage) {
      return;
    }

    if (prevSearchQuerry !== nextSearchQuerry) {
      this.setState({ status: Status.PENDING, images: [] });

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

      imageAPI(nextSearchQuerry, nextpage)
        .then((images) => this.setState({ images, status: Status.RESOLVED }))
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }

    if (nextpage === 1) {
      return;
    }

    if (prevPage !== nextpage) {
      this.setState({ status: Status.PENDING });

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

  getSearchQuerry = (searchQuery) => this.setState({ searchQuery });

  pageIncrement = () =>
    this.setState((prevState) => ({ page: prevState.page + 1 }));

  resetPage = () => this.setState({ page: 1 });

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  openModal = (url, alt) => {
    this.toggleModal();

    this.setState(({ modalImage }) => ({
      modalImage: url,
      modalImageAlt: alt,
    }));
  };

  closeModal = () => {
    this.toggleModal();

    this.setState(({ modalImage }) => ({
      modalImage: '',
      modalImageAlt: '',
    }));
  };

  cleareImages = () => {
    this.setState({ images: [], status: Status.IDLE });
  };

  render() {
    const { images, showModal, modalImage, modalImageAlt, error, status } =
      this.state;

    if (status === 'idle') {
      return (
        <>
          <Searchbar
            onSubmit={this.getSearchQuerry}
            resetPage={this.resetPage}
            cleareImages={this.cleareImages}
          />
          <AboutAppInfo />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <div className="app">
            <Searchbar
              onSubmit={this.getSearchQuerry}
              resetPage={this.resetPage}
              cleareImages={this.cleareImages}
            />
            <ImageGallery images={images} openModal={this.openModal} />
            <Loading />
          </div>
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar
            onSubmit={this.getSearchQuerry}
            resetPage={this.resetPage}
            cleareImages={this.cleareImages}
          />
          <Notification message={error.message} />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <div className="app">
            <Searchbar
              onSubmit={this.getSearchQuerry}
              resetPage={this.resetPage}
              cleareImages={this.cleareImages}
            />

            <ImageGallery images={images} openModal={this.openModal} />
            {images.length >= 12 ? <Button page={this.pageIncrement} /> : null}
            {showModal && (
              <Modal
                closeModal={this.closeModal}
                modalImage={modalImage}
                modalImageAlt={modalImageAlt}
              />
            )}
          </div>
        </>
      );
    }
  }
}

export default App;
