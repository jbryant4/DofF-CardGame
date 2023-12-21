import { Server, Socket } from 'socket.io';
import cardType from '~/constants/CardType';
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
    BoardMessages.Switch,
    (
      roomId: string,
      player: Players,
      cardId: string,
      inAttackStance: boolean,
      isChamp: boolean
    ) => {
      const room = rooms[roomId];
      if (room) {
        const { playerOneBoard, playerTwoBoard } = room;
        const boardToUpdate =
          player === 'playerOne' ? playerOneBoard : playerTwoBoard;

        const boardKey = isChamp ? 'champions' : 'army';
        //@ts-ignore
        boardToUpdate[boardKey] = boardToUpdate[boardKey].map(
          (card: DuelingCard | null) =>
            card && card.id === cardId
              ? { ...card, position: inAttackStance ? 'defense' : 'attack' }
              : card
        );

        io.to(roomId).emit(BoardMessages.Update, {
          playerOneBoard: room.playerOneBoard,
          playerTwoBoard: room.playerTwoBoard
        });
      }
    }
  );
};
