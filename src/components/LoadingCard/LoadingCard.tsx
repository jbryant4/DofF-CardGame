import styles from './LoadingCard.module.css';
type OwnProps = {};

const LoadingCard = ({}: OwnProps) => (
  <div className={styles['loading-card']}>
    <div className={styles.card}></div>
  </div>
);

export default LoadingCard;
