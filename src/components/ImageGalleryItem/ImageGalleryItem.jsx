import React from 'react';
import PropTypes from 'prop-types';
import '../ImageGalleryItem/ImageGalleryItem.scss';
import defaultImage from '../../images/default.jpg';

const ImageGalleryItem = ({
  openModal,
  webformatURL = defaultImage,
  largeImageURL,
  tags,
}) => {
  return (
    <>
      <li className="gallery__item">
        <img
          onClick={(evt) =>
            openModal(evt.target.dataset.source, evt.target.alt)
          }
          src={webformatURL}
          alt={tags}
          data-source={largeImageURL}
          className="gallery__image"
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
