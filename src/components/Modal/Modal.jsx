import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Loading from '../Loader';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalImage: PropTypes.string.isRequired,
    modalImageAlt: PropTypes.string.isRequired,
  };

  state = {
    isLoading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (evt) => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  isLoadingStop = () => {
    this.setState({ isLoading: false });
  };

  onLoadClick = (href) => {
    const FileSaver = require('file-saver');
    FileSaver.saveAs(href, 'image.jpg');
    this.props.closeModal();
  };

  render() {
    const isLoading = this.state.isLoading;
    return createPortal(
      <div className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          {isLoading && <Loading />}
          <div className="image__wrapper">
            <img
              onLoad={this.isLoadingStop}
              className="modal__image"
              src={this.props.modalImage}
              alt={this.props.modalImageAlt}
            />

            <button
              className="downloade__button"
              type="button"
              onClick={() => this.onLoadClick(this.props.modalImage)}
            ></button>
          </div>
        </div>
      </div>,
      modalRoot
    );
  }
}
