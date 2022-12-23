import { PropTypes } from 'prop-types';
import css from './styles.module.css';
export default function StatisticsItem({ data }) {
  return (
    <li className={css.item}>
      <span className={css.label}>{data.label}</span>
      <span className={css.percentage}>{data.percentage}%</span>
    </li>
  );
}
StatisticsItem.propTypes = {
  data: PropTypes.object,
};
