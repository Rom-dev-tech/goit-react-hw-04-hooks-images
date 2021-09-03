import React, { useContext, useState } from 'react';

const SearchContex = React.createContext();

export const useSearch = () => {
  return useContext(SearchContex);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [isClickButtonLoadMore, setIsClickButtonLoadMore] = useState(false);
  const [togglePage, setTogglePage] = useState(false);

  const onChangeQuery = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setIsClickButtonLoadMore(false);
  };

  const pageIncrement = () => {
    setPage((state) => state + 1);
    setIsClickButtonLoadMore(true);
  };

  const cleareImages = () => setTogglePage(!togglePage);

  return (
    <SearchContex.Provider
      value={{
        searchQuery,
        page,
        isClickButtonLoadMore,
        togglePage,
        onChangeQuery,
        pageIncrement,
        cleareImages,
      }}
    >
      {children}
    </SearchContex.Provider>
  );
};
