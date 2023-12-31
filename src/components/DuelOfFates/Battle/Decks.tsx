import classNames from 'classnames';
import { Fragment, useContext, useEffect, useState } from 'react';
import FinalCard from '@/FinalCard';
import BlueBtn from '@/Global/BlueBtn';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { BoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { BoardMessages } from '../../../../server/boardHandlers/boardHandlers';
import { GameMessages } from '../../../../server/gameHandlers/gameHandlers';

type OwnProps = {};

const Decks = ({}: OwnProps) => {
  const socket = useSocket();
  const [showUi, setShowUi] = useState(false);
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

  useEffect(() => {
    if (hand.length >= 7 && viewDecks) {
      if (socket) {
        socket.emit(GameMessages.AdvanceStage, roomId);
      } else {
        advanceBattleStage();
      }

      return;
    } else if (viewDecks) {
      setShowUi(true);
    } else {
      setShowUi(false);
    }
  }, [advanceBattleStage, hand.length, roomId, socket, viewDecks]);

  return (
    <div
      id="decks"
      className={classNames(
        'absolute bg-red-200 duration-[800ms] ease-in-out flex gap-28 left-64 pb-16 pt-8 px-20 top-[0] transition-all z-1',
        {
          '-translate-y-[100%]': showUi
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
          disabled={mainDeck.length === 0}
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
          disabled={foundationDeck.length === 0}
          onClick={() => handleDeckClick('foundation')}
        >
          Draw Foundation
        </ActionBtn>
      </div>

      <div className="flex flex-col flex-grow gap-8 items-center">
        <div>-1 Hp</div>
        <ActionBtn disabled={false}>fresh cards </ActionBtn>
      </div>
    </div>
  );
};

export default Decks;
