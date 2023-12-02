import { Server } from 'socket.io';
import { GameRoom } from '../room';

//TODO Replace this giant array of abjects with an api call
// eslint-disable-next-line
import devDuelingCards from '../utils/devDuelingCards';

export default (io: Server, room: GameRoom, roomId: string) => {
  console.log(room);

  // const hand: DuelingCard[] = [
  //   ...mainDeck.slice(0, 5),
  //   ...foundationDeck.slice(0, 2)
  // ];
  //
  // Update playerOneBoard properties
  // room.playerTwoBoard.foundationDeck = foundationDeck.slice(2); // Rest of foundation cards
  // room.playerTwoBoard.mainDeck = mainDeck.slice(5); // Rest of main deck cards
  // room.playerTwoBoard.hand = hand;
  //
  // const hand: DuelingCard[] = [
  //   ...mainDeck.slice(0, 5),
  //   ...foundationDeck.slice(0, 2)
  // ];
  //
  // Update playerOneBoard properties
  // room.playerOneBoard.foundationDeck = foundationDeck.slice(2); // Rest of foundation cards
  // room.playerOneBoard.mainDeck = mainDeck.slice(5); // Rest of main deck cards
  // room.playerOneBoard.hand = hand;
};
