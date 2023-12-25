import classNames from 'classnames';
import { Fragment, useContext, useEffect, useState } from 'react';
import DuelCard from '@/DuelOfFates/Battle/DuelCard';
import BlueBtn from '@/Global/BlueBtn';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import DuelingCard from '~/constants/DuelingCard';
import { BoardContext } from '~/context/BoardContext';
import { GameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { BoardMessages } from '../../../../server/boardHandlers/boardHandlers';
import { GameMessages } from '../../../../server/gameHandlers/gameHandlers';

type OwnProps = {
  cardWidth: number;
};

const Decks = ({ cardWidth }: OwnProps) => {
  const socket = useSocket();
  const [showUi, setShowUi] = useState(false);
  const { localPlayer, roomId, advanceBattleStage, battleTurn, battleStage } =
    useContext(GameContext);

  const viewDecks = localPlayer === battleTurn && battleStage === 'draw';
  const { playerOneDraw, playerTwoDraw, localBoard } = useContext(BoardContext);
  const { mainDeck, foundationDeck, hand } = localBoard;
  const mainDeckToShow =
    mainDeck.slice(0, 5).length > 0 ? mainDeck.slice(0, 5) : [];
  const foundationDeckToShow =
    foundationDeck.slice(0, 2).length > 0 ? foundationDeck.slice(0, 2) : [];

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
        'absolute bg-red-200 duration-[800ms] ease-in-out flex gap-28 pb-16 pt-8 px-20 right-0 top-[0] transition-all z-[1]',
        {
          '-translate-y-[100%]': showUi
        }
      )}
    >
      <div className="flex flex-col flex-grow items-center">
        <div>Main Deck</div>
        {mainDeckToShow.map((card, index) => (
          <Fragment key={card.id}>
            <DuelCard
              duelingCard={card}
              location="main-deck"
              layout={'pile'}
              cardWidth={cardWidth}
              index={index}
            />
          </Fragment>
        ))}
        <ActionBtn
          disabled={mainDeckToShow.length === 0}
          onClick={() => handleDeckClick('main')}
        >
          Fill Deck
        </ActionBtn>
      </div>
      <div className="flex flex-col flex-grow items-center">
        <div>Foundation Deck</div>
        {foundationDeckToShow.map((card, index) => (
          <Fragment key={card.id}>
            <DuelCard
              duelingCard={card}
              location="foundation-deck"
              layout={'pile'}
              cardWidth={cardWidth}
              index={index}
            />
          </Fragment>
        ))}
        <ActionBtn
          disabled={foundationDeckToShow.length === 0}
          onClick={() => handleDeckClick('foundation')}
        >
          Draw Foundation
        </ActionBtn>
      </div>
    </div>
  );
};

export default Decks;
