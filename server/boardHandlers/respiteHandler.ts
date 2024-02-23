import { Server, Socket } from 'socket.io';
import { PlayerField, Players } from '~/constants/common/gameTypes';
import { BoardMessages } from './boardHandlers';
import { GameRoom } from '../room';
import advanceGameStage from '../utils/advanceStage';
import handlePlayerDamage from '../utils/handlePlayerDamage';

type FieldKeys = 'champions' | 'army' | 'resources';

function processBoardField(board: PlayerField, removeRecourse: boolean) {
  let championCount = 0;
  const fieldsToCheck: FieldKeys[] = ['champions', 'army', 'resources'];

  fieldsToCheck.forEach(field => {
    for (let i = 0; i < board[field].length; i++) {
      const card = board[field][i];

      if (card) {
        // Check if the card is a resource and face up, or if it's a card with health less than or equal to zero
        if (
          (field === 'resources' && card.faceUp && removeRecourse) ||
          (card.hp !== undefined && card.hp <= 0)
        ) {
          // Increment champion count if the card is a champion
          if (field === 'champions') {
            championCount++;
          }

          // Move the card to the graveyard and replace it with null on the board
          board.graveyard.push(card);
          board[field][i] = null;
        }
      }
    }
  });

  return championCount;
}

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(
    BoardMessages.Respite,
    (roomId: string, playerCallingRespite: Players) => {
      const room = rooms[roomId];
      if (room) {
        const { playerOneBoard, playerTwoBoard } = room;

        const playerOneChampionCount = processBoardField(
          playerOneBoard,
          playerCallingRespite === 'playerOne'
        );
        const playerTwoChampionCount = processBoardField(
          playerTwoBoard,
          playerCallingRespite === 'playerTwo'
        );

        if (playerOneChampionCount > 0) {
          handlePlayerDamage(
            room,
            'playerOne',
            playerOneChampionCount,
            roomId,
            io
          );
        }

        if (playerTwoChampionCount > 0) {
          handlePlayerDamage(
            room,
            'playerTwo',
            playerTwoChampionCount,
            roomId,
            io
          );
        }

        advanceGameStage(room, roomId, io, 'respiteHandler');

        io.to(roomId).emit(BoardMessages.Update, {
          playerOneBoard: room.playerOneBoard,
          playerTwoBoard: room.playerTwoBoard
        });
      }
    }
  );
};
