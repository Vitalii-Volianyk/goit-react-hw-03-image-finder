import { fetchImage } from 'services/api';
import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Loader from 'components/Loader';
import css from './ImageGallery.module.css';

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVE: 'resolve',
  REJECT: 'reject',
};
class ImageGallery extends Component {
  state = {
    imageList: null,
    errorMessage: null,
    curStatus: status.IDLE,
    currentPage: 1,
    showModal: false,
    id: null,
    totalHits: 0,
  };
  toggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
      };
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchParam !== this.props.searchParam) {
      this.setState({ curStatus: status.PENDING, currentPage: 1 });
      fetchImage(this.props.searchParam)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return new Error('Image not found.Try again');
        })
        .then(response => {
          this.setState({ curStatus: status.RESOLVE });
          this.setState({
            imageList: response.hits,
            totalHits: response.totalHits,
          });
        })
        .catch(error => {
          this.setState({ curStatus: status.REJECT });
        });
    }
    if (prevState.currentPage < this.state.currentPage) {
      //this.setState({ curStatus: status.PENDING });
      fetchImage(this.props.searchParam, this.state.currentPage)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return new Error('Image not found.Try again');
        })
        .then(response => {
          this.setState({ curStatus: status.RESOLVE });
          this.setState(({ imageList, totalHits }) => {
            return {
              imageList: [...imageList, ...response.hits],
            };
          });
        })
        .catch(error => {
          this.setState({ curStatus: status.REJECT });
        });
    }
  }
  showModal = id => {
    this.setState({ showModal: true, id });
  };
  handleLoadMore = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };
  render() {
    const {
      curStatus,
      errorMessage,
      imageList,
      showModal,
      id,
      currentPage,
      totalHits,
    } = this.state;
    if (curStatus === status.IDLE) {
      return <p>Search image...</p>;
    }
    if (curStatus === status.PENDING) {
      return <Loader />;
    }
    if (curStatus === status.RESOLVE) {
      const classes =
        `${css.gallery}` + `${showModal ? ' ' + css.no_scroll : ''}`;
      return (
        <>
          <ul className={classes}>
            {imageList.map((el, index) => (
              <ImageGalleryItem
                key={el.id}
                onModal={this.showModal}
                id={index}
                item={el}
              />
            ))}
            {totalHits > currentPage * 12 && (
              <li>
                <Button onLoadMore={this.handleLoadMore} />
              </li>
            )}
          </ul>
          {showModal && (
            <Modal item={imageList[id]} onClose={this.toggleModal} />
          )}
        </>
      );
    }
    if (curStatus === status.REJECT) {
      return <p>{errorMessage}</p>;
    }
  }
}
export default ImageGallery;
