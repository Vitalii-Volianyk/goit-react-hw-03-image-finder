import css from './ImageGallery.module.css';
import { Component } from 'react';

class ImageGallery extends Component {
  render() {
    return <ul className={css.gallery}></ul>;
  }
}
export default ImageGallery;
