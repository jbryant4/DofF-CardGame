import { Socket, Server } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import DuelingCard from '~/constants/DuelingCard';
import { BoardMessages } from './boardHandlers';
import { GameRoom } from '../room';
import updateBoardSection from '../utils/placeCardUtils';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(
    BoardMessages.Place,
    (roomId: string, player: Players, card: DuelingCard) => {
      const room = rooms[roomId];
      if (room) {
        const { playerOneBoard, playerTwoBoard } = room;
        const boardToUpdate =
          player === 'playerOne' ? playerOneBoard : playerTwoBoard;

        const updatedHand = boardToUpdate.hand.filter(
          handCard => handCard.id !== card.id
        );

        // Update the board after removing from the hand
        const updatedBoard = updateBoardSection(
          { ...boardToUpdate, hand: updatedHand },
          card
        );

        if (player === 'playerOne') {
          room.playerOneBoard = updatedBoard;
        } else {
          room.playerTwoBoard = updatedBoard;
        }

        io.to(roomId).emit(BoardMessages.Update, {
          playerOneBoard: room.playerOneBoard,
          playerTwoBoard: room.playerTwoBoard
        });
      }
    }
  );
};
