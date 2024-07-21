import classNames from 'classnames';
import { useContext } from 'react';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { BoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { GameContext } from '~/context/GameContext';
import useHandleDrawFromDeck from '~/hooks/BoardHooks/useDrawCards';

const Decks = () => {
  const {
    localPlayer: { data: localPlayer },
    // advanceBattleStage,
    dynamicGameData: {
      data: { battleTurn, battleStage }
    }
  } = useContext(GameContext);

  const viewDecks = localPlayer === battleTurn && battleStage === 'draw';
  const { localBoard } = useContext(BoardContext);
  const { mainDeck, foundationDeck, hand } = localBoard;
  const { handCardWidth } = useDimensionsContext();

  const handleDrawFromDeck = useHandleDrawFromDeck();

  const handleReshuffle = () => {
    // TODO firebase functionality
  };

  return (
    <div
      id="decks"
      className={classNames(
        'absolute bg-red-200 duration-[800ms] ease-in-out flex gap-28 left-64 pb-16 pt-8 px-20 top-[0] transition-all z-[2]',
        {
          '-translate-y-[100%]': viewDecks
        }
      )}
    >
      <div className="flex flex-col flex-grow gap-8 items-center">
        <div>Main Deck</div>
        {mainDeck.length > 0 && (
          <img
            width={handCardWidth}
            className="h-full object-cover rounded"
            alt="card-back"
            src="/card-back.png"
          />
        )}
        <ActionBtn
          disabled={mainDeck.length === 0 || hand.length >= 7}
          onClick={() => handleDrawFromDeck('main')}
        >
          Fill Deck
        </ActionBtn>
      </div>
      <div className="flex flex-col flex-grow gap-8 items-center">
        <div>Foundation Deck</div>
        {foundationDeck.length > 0 && (
          <img
            width={handCardWidth}
            className="h-full object-cover rounded"
            alt="card-back"
            src="/card-back.png"
          />
        )}
        <ActionBtn
          disabled={foundationDeck.length === 0 || hand.length >= 7}
          onClick={() => handleDrawFromDeck('foundation')}
        >
          Draw Foundation
        </ActionBtn>
      </div>

      <div className="flex flex-col flex-grow gap-8 items-center">
        <div>-1 Hp</div>
        <ActionBtn disabled={false} onClick={() => handleReshuffle()}>
          fresh cards{' '}
        </ActionBtn>
      </div>
    </div>
  );
};

export default Decks;
