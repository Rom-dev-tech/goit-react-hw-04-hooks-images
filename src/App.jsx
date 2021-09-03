import React from 'react';
import Searchbar from './components/Searchbar';
import ImagesView from './components/ImagesView';
import { SearchProvider } from './components/Searchbar/SearchContext';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <SearchProvider>
        <Searchbar />
        <ImagesView />
      </SearchProvider>
    </div>
  );
};

export default App;
