import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item: { tags, webformatURL }, id, onModal }) => {
  return (
    <li
      className={css.gallery_item}
      onClick={() => {
        onModal(id);
      }}
    >
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
