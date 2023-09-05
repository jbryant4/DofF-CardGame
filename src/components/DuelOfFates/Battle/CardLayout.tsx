import { Fragment, useContext } from 'react';
import ControlCenter from '@/DuelOfFates/Battle/ControlCenter';
import Military from '@/DuelOfFates/Battle/Military';
import ResourceCards from '@/DuelOfFates/Battle/ResourceCards';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import styles from './BattleField.module.css';
import FoundationCards from './FoundationCard';

type OwnProps = { isEnemy?: boolean };

const CardLayout = ({ isEnemy = false }: OwnProps) => {
  const { localPlayer } = useContext(GameContext);
  const isLocalPlayerOne = localPlayer === 'playerOne';
  const { playerOneBoard, playerTwoBoard } = useContext(BoardContext);
  const boardToUse = () => {
    switch (true) {
      case isLocalPlayerOne && isEnemy:
        return playerTwoBoard;
      default:
        return playerOneBoard;
    }
  };

  const boardToRender = boardToUse();
  const {
    hand,
    mainDeck,
    foundationDeck,
    army,
    foundations,
    champions,
    resources,
    graveyard
  } = boardToRender;
  const graveYardsToShow =
    graveyard.slice(0, 3).length > 0 ? graveyard.slice(0, 3) : [];
  const mainDeckToShow =
    mainDeck.slice(0, 5).length > 0 ? mainDeck.slice(0, 5) : [];
  const foundationDeckToShow =
    foundationDeck.slice(0, 2).length > 0 ? foundationDeck.slice(0, 2) : [];

  return isEnemy ? (
    <div className={styles.enemyLayout}>
      <ResourceCards cards={resources} />
      <FoundationCards cards={foundations} />
      <Military champions={champions} army={army} />
      <ControlCenter
        graveyard={graveYardsToShow}
        hand={hand}
        foundationDeck={[]}
        mainDeck={[]}
        enemyBoard={isEnemy}
      />
    </div>
  ) : (
    <div className={styles.layout}>
      <ResourceCards cards={resources} />
      <FoundationCards cards={foundations} />
      <Military champions={champions} army={army} />
      <ControlCenter
        hand={hand}
        graveyard={graveYardsToShow}
        mainDeck={mainDeckToShow}
        foundationDeck={foundationDeckToShow}
        enemyBoard={isEnemy}
      />
    </div>
  );
};

export default CardLayout;
