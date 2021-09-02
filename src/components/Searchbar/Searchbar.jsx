import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Searchbar/Searchbar.scss';

const Searchbar = ({ onSubmit, cleareImages }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      onSubmit(searchQuery.trim());
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className="searchbar">
      <form className="searchform" onSubmit={handleSubmit}>
        <button type="submit" className="searchform__button">
          <span className="searchform__button--label">Search</span>
        </button>

        <input
          id="anchor"
          className="searchform__input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>

      <button
        className="clear__button"
        type="button"
        onClick={cleareImages}
      ></button>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  cleareImages: PropTypes.func.isRequired,
};

export default Searchbar;
