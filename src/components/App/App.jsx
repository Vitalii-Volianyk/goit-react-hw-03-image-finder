import { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
import SearchBar from 'components/SearchBar';
import css from './App.module.css';

class App extends Component {
  state = {
    searchParam: null,
  };
  handleSubmit = search => {
    this.setState({ searchParam: search });
  };
  render() {
    const { searchParam } = this.state;
    return (
      <div className={css.App}>
        <ImageGallery searchParam={searchParam} />
        <SearchBar onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
