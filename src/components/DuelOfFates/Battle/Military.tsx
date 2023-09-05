import { Fragment, useState } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import DuelingCard from '~/constants/DuelingCard';
import card from '~/models/Card';

type OwnProps = {
  army: (DuelingCard | null)[];
  champions: (DuelingCard | null)[];
};

const Military = ({ army, champions }: OwnProps) => {
  const [value, setValue] = useState();
  const cardWidth = innerWidth / 8 - 10;

  return (
    <div
      className={`${styles.military} grid grid-cols-6 justify-items-center py-8`}
    >
      {champions.map((champ, index) =>
        champ ? (
          <Fragment key={`champ ${index}`}>
            <img
              src={champ.blankUrl}
              style={{ width: cardWidth, height: cardWidth * (4 / 3) }}
            />
          </Fragment>
        ) : (
          <div
            className="bg-cyan-300 border border-black"
            key={`slot ${index}`}
            style={{ width: cardWidth, height: cardWidth * (4 / 3) }}
          >
            {' '}
            champ slot {index}
          </div>
        )
      )}

      {army.map((soldier, index) =>
        soldier ? (
          <Fragment key={`champ ${index}`}>
            <img
              className="self-end"
              src={soldier.blankUrl}
              style={{ width: cardWidth, height: cardWidth * (4 / 3) }}
            />
          </Fragment>
        ) : (
          <div
            className="bg-cyan-200 border border-black self-end"
            key={`slot ${index}`}
            style={{ width: cardWidth, height: cardWidth * (4 / 3) }}
          >
            {' '}
            army slot {index}
          </div>
        )
      )}
    </div>
  );
};

export default Military;
