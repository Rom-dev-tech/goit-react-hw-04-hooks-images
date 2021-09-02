import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImagesView from './components/ImagesView';
import './App.scss';

class App extends Component {
  state = {
    searchQuery: null,
    togglePage: false,
  };

  getSearchQuerry = (searchQuery, clearPage) =>
    this.setState({ searchQuery: searchQuery, clearPage: clearPage });

  cleareImages = () => {
    this.setState(({ togglePage }) => ({
      togglePage: !togglePage,
    }));
  };

  render() {
    const { searchQuery, togglePage } = this.state;
    return (
      <div className="app">
        <Searchbar
          onSubmit={this.getSearchQuerry}
          cleareImages={this.cleareImages}
        />
        <ImagesView searchQuery={searchQuery} toggleClearPage={togglePage} />
      </div>
    );
  }
}

export default App;
