import { PropTypes } from 'prop-types';
import css from './styles.module.css';
export default function FriendListItem({ status, avatar, name }) {
  return (
    <li className={css.friendList__item}>
      <span className={status ? css.active : css.inactive}></span>
      <img
        className={css.friendList__avatar}
        src={avatar}
        alt="User avatar"
        width="48"
      />
      <p className={css.name}>{name}</p>
    </li>
  );
}
FriendListItem.propTypes = {
  status: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
};
