import { Server, Socket } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import DuelingCard from '~/constants/DuelingCard';
import { BoardMessages } from './boardHandlers';
import { GameMessages } from '../gameHandlers/gameHandlers';
import { GameRoom } from '../room';
import advanceGameStage from '../utils/advanceStage';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(
    BoardMessages.Draw,
    (roomId: string, drawPlayer: Players, drawFrom: 'main' | 'foundation') => {
      const room = rooms[roomId];
      if (room) {
        const { playerOneBoard, playerTwoBoard } = room;
        const boardToUpdate =
          drawPlayer === 'playerOne' ? playerOneBoard : playerTwoBoard;

        if (drawFrom === 'main') {
          const cardsNeeded = 7 - boardToUpdate.hand.length;
          if (boardToUpdate.mainDeck.length >= cardsNeeded) {
            const cards = boardToUpdate.mainDeck.slice(0, cardsNeeded);
            boardToUpdate.mainDeck = boardToUpdate.mainDeck.slice(cardsNeeded);
            boardToUpdate.hand.push(...cards);
          }
        } else if (
          drawFrom === 'foundation' &&
          boardToUpdate.foundationDeck.length > 0
        ) {
          const card = boardToUpdate.foundationDeck.shift();
          boardToUpdate.hand.push(card as DuelingCard); //check above ensures that array has a card
        }

        io.to(roomId).emit(BoardMessages.Update, {
          playerOneBoard: room.playerOneBoard,
          playerTwoBoard: room.playerTwoBoard
        });

        advanceGameStage(room);

        io.to(roomId).emit(GameMessages.AdvanceCompete, {
          battleTurn: room.battleTurn,
          battleStage: room.battleStage
        });
      }
    }
  );
};
