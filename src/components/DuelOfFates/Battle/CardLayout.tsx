import { useContext } from 'react';
import ControlCenter from '@/DuelOfFates/Battle/ControlCenter';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import styles from './BattleField.module.css';

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
  console.log(boardToRender);
  const {
    hand,
    mainDeck,
    foundationDeck,
    board: { army, foundations, champions, resources },
    graveyard
  } = boardToRender;
  const graveYardsToShow =
    graveyard.slice(0, 3).length > 0 ? graveyard.slice(0, 3) : [];
  const mainDeckToShow =
    mainDeck.slice(0, 5).length > 0 ? mainDeck.slice(0, 5) : [];
  const foundationDeckToShow =
    foundationDeck.slice(0, 2).length > 0 ? foundationDeck.slice(0, 2) : [];

  console.log(isLocalPlayerOne, foundationDeck, mainDeckToShow);

  return isEnemy ? (
    <div className="font-bold mx-auto text-36 text-green-900">
      hi keep it simple{' '}
    </div>
  ) : (
    <div className={styles.layout}>
      <div className={styles.resource}>resource</div>
      <div className={styles.leftFoundation}>left Foundation</div>
      <div className={styles.military}>military</div>
      <div className={styles.rightFoundation}>right Foundation</div>
      <ControlCenter
        hand={hand}
        graveyard={graveYardsToShow}
        mainDeck={mainDeckToShow}
        foundationDeck={foundationDeckToShow}
      />
    </div>
  );
};

export default CardLayout;
