import _ from 'lodash';
import { Server } from 'socket.io';
import { BoardMessages } from './boardHandlers';
import { DuelingCard } from '../../src/contracts/card';
import { GameRoom } from '../room';
//TODO Replace this giant array of abjects with an api call
// eslint-disable-next-line
import devDuelingCards from '../utils/devDuelingCards';
import shuffleDeck from '../utils/shuffleDeck';

const makeDuelingDeck = (
  cardIds: string[]
): { foundationDeck: DuelingCard[]; mainDeck: DuelingCard[] } => {
  const deck = shuffleDeck(
    devDuelingCards.filter(card => cardIds.includes(card.id))
  );

  return {
    foundationDeck: deck.filter(card => card.type === 'foundation'),
    mainDeck: deck.filter(card => card.type !== 'foundation')
  };
};

export default (io: Server, room: GameRoom, roomId: string) => {
  const {
    player1: {
      deck: { cards: player1CardIds }
    },
    player2: {
      deck: { cards: player2CardIds }
    }
  } = room;

  const { foundationDeck: player1FoundationDeck, mainDeck: player1MainDeck } =
    makeDuelingDeck(Object.values(player1CardIds).flat());
  const { foundationDeck: player2FoundationDeck, mainDeck: player2MainDeck } =
    makeDuelingDeck(Object.values(player2CardIds).flat());

  // Update playerOneBoard properties
  room.playerOneBoard.hand = [
    ..._.cloneDeep(player1MainDeck.slice(0, 5)),
    ..._.cloneDeep(player1FoundationDeck.slice(0, 2))
  ];
  room.playerOneBoard.foundationDeck = _.cloneDeep(
    player1FoundationDeck.slice(2)
  ); // Rest of foundation cards
  room.playerOneBoard.mainDeck = _.cloneDeep(player1MainDeck.slice(5)); // Rest of main deck cards

  // Update playerTwoBoard properties
  room.playerTwoBoard.hand = [
    ..._.cloneDeep(player2MainDeck.slice(0, 5)),
    ..._.cloneDeep(player2FoundationDeck.slice(0, 2))
  ];
  room.playerTwoBoard.foundationDeck = _.cloneDeep(
    player2FoundationDeck.slice(2)
  ); // Rest of foundation cards
  room.playerTwoBoard.mainDeck = _.cloneDeep(player2MainDeck.slice(5));

  room.gameState = 'Battle';

  io.to(roomId).emit(BoardMessages.BoardSetUp, {
    playerOneBoard: room.playerOneBoard,
    playerTwoBoard: room.playerTwoBoard,
    gameState: room.gameState
  });
};
