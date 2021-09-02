import { useState } from 'react';
import Searchbar from './components/Searchbar';
import ImagesView from './components/ImagesView';
import './App.scss';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [togglePage, setTogglePage] = useState(false);

  const getSearchQuerry = (searchQuery) => setSearchQuery(searchQuery);

  const cleareImages = () => setTogglePage(!togglePage);

  return (
    <div className="app">
      <Searchbar onSubmit={getSearchQuerry} cleareImages={cleareImages} />
      <ImagesView searchQuery={searchQuery} toggleClearPage={togglePage} />
    </div>
  );
};

export default App;
