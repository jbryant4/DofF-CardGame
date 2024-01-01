import classNames from 'classnames';
import { useContext } from 'react';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { BoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { BoardMessages } from '../../../../server/boardHandlers/boardHandlers';

const Decks = () => {
  const socket = useSocket();
  const { localPlayer, roomId, advanceBattleStage, battleTurn, battleStage } =
    useContext(GameContext);

  const viewDecks = localPlayer === battleTurn && battleStage === 'draw';
  const { playerOneDraw, playerTwoDraw, localBoard } = useContext(BoardContext);
  const { mainDeck, foundationDeck, hand } = localBoard;
  const { handCardWidth } = useDimensionsContext();

  const deckToDrawFrom =
    localPlayer === 'playerOne' ? playerOneDraw : playerTwoDraw;

  const handleDeckClick = (fromDeck: 'foundation' | 'main') => {
    if (socket) {
      socket.emit(BoardMessages.Draw, roomId, localPlayer, fromDeck);
    } else {
      if (fromDeck === 'main') {
        deckToDrawFrom(7 - hand.length, 0);
      } else {
        deckToDrawFrom(0, 1);
      }
      advanceBattleStage();

      return;
    }
  };

  const handleReshuffle = () => {
    // TODO make local hook of this socket message for testing locally
    if (!socket) {
      console.log('no socket connected');

      return;
    }
    socket.emit(BoardMessages.Reshuffle, roomId, localPlayer);
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
          onClick={() => handleDeckClick('main')}
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
          onClick={() => handleDeckClick('foundation')}
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
