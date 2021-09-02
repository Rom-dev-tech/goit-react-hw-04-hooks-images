import { Component } from 'react';
import PropTypes from 'prop-types';
import '../Searchbar/Searchbar.scss';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    cleareImages: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };

  handleSearchChange = (event) => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      this.props.onSubmit(this.state.searchQuery.trim());
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchform" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchform__button">
            <span className="searchform__button--label">Search</span>
          </button>

          <input
            id="anchor"
            className="searchform__input"
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>

        <button
          className="clear__button"
          type="button"
          onClick={this.props.cleareImages}
        ></button>
      </header>
    );
  }
}

export default Searchbar;
