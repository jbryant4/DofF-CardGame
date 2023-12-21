import { Server, Socket } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import DuelingCard from '~/constants/DuelingCard';
import { BoardMessages } from './boardHandlers';
import { GameRoom } from '../room';
import { getBoardKey } from '../utils/getBoardKey';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(
    BoardMessages.Flip,
    (roomId: string, player: Players, cardType: string, cardId: string) => {
      const room = rooms[roomId];
      if (room) {
        const { playerOneBoard, playerTwoBoard } = room;
        const boardToUpdate =
          player === 'playerOne' ? playerOneBoard : playerTwoBoard;

        const boardKey = getBoardKey(cardType);
        // @ts-ignore
        boardToUpdate[boardKey] = boardToUpdate[boardKey].map(
          (card: DuelingCard | null) =>
            card && card.id === cardId ? { ...card, faceUp: true } : card
        );

        io.to(roomId).emit(BoardMessages.Update, {
          playerOneBoard: room.playerOneBoard,
          playerTwoBoard: room.playerTwoBoard
        });
      }
    }
  );
};
