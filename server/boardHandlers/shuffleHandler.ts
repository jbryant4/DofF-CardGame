import { Server, Socket } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import { BoardMessages } from './boardHandlers';
import { GameRoom } from '../room';
import advanceGameStage from '../utils/advanceStage';
import handlePlayerDamage from '../utils/handlePlayerDamage';
import ShuffleDeck from '../utils/shuffleDeck';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(
    BoardMessages.Reshuffle,
    (roomId: string, playerShuffling: Players) => {
      const room = rooms[roomId];
      if (room) {
        const boardToUpdate =
          playerShuffling === 'playerOne'
            ? room.playerOneBoard
            : room.playerTwoBoard;

        const { hand, foundationDeck, mainDeck, graveyard } = boardToUpdate;

        // Combine all decks into one
        const combinedDeck = [
          ...hand,
          ...foundationDeck,
          ...mainDeck,
          ...graveyard
        ];

        // Shuffle the combined deck
        const shuffledDeck = ShuffleDeck(combinedDeck);

        // Filter out foundation and main deck cards
        boardToUpdate.foundationDeck = shuffledDeck.filter(
          card => card.type === 'foundation'
        );
        boardToUpdate.mainDeck = shuffledDeck.filter(
          card => card.type !== 'foundation'
        );

        // Clear the graveyard
        boardToUpdate.graveyard = [];

        // Select the first 5 cards from the main deck and the first 2 cards from the foundation deck for the hand
        boardToUpdate.hand = [
          ...boardToUpdate.mainDeck.slice(0, 5),
          ...boardToUpdate.foundationDeck.slice(0, 2)
        ];

        // Update the mainDeck and foundationDeck by removing the cards now in the hand
        boardToUpdate.mainDeck = boardToUpdate.mainDeck.slice(5);
        boardToUpdate.foundationDeck = boardToUpdate.foundationDeck.slice(2);

        io.to(roomId).emit(BoardMessages.Update, {
          playerOneBoard: room.playerOneBoard,
          playerTwoBoard: room.playerTwoBoard
        });

        handlePlayerDamage(room, playerShuffling, 1, roomId, io);
        advanceGameStage(room, roomId, io, 'shuffle handler');
      }
    }
  );
};
