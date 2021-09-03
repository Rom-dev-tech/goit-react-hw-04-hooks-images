import { memo, useState } from 'react';
import { useSearch } from './SearchContext';
import '../Searchbar/Searchbar.scss';

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { onChangeQuery, cleareImages } = useSearch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      onChangeQuery(searchQuery.trim());
      return;
    }

    onChangeQuery(searchQuery);
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

export default memo(Searchbar);
