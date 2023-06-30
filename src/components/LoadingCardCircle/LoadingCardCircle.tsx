import { useState } from 'react';
import styles from './CardCircle.module.css';

const LoadingCardCircle = () => {
  const cards = Array.from({ length: 6 }, (_, i) => i + 1); // Creates an array [1, 2, 3, 4, 5, 6]

  return (
    <div className={styles.loader}>
      {cards.map(i => (
        <div key={i} className={`${styles.card} ${styles[`card${i}`]}`}></div>
      ))}
    </div>
  );
};

export default LoadingCardCircle;
