import { Server, Socket } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import { BoardMessages } from './boardHandlers';
import { GameRoom } from '../room';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(
    BoardMessages.Attack,
    (
      roomId: string,
      attackingPlayer: Players,
      attackingId: string,
      attackedId: string,
      champAttack: boolean
    ) => {
      const room = rooms[roomId];
      if (room) {
        const { playerOneBoard, playerTwoBoard } = room;

        const attackingBoard =
          attackingPlayer === 'playerOne' ? playerOneBoard : playerTwoBoard;
        const attackedBoard =
          attackingPlayer === 'playerOne' ? playerTwoBoard : playerOneBoard;

        const attackingCard =
          attackingBoard[champAttack ? 'champions' : 'army'].find(
            c => c?.id === attackingId
          ) ?? null;
        const attackedCard =
          attackedBoard[champAttack ? 'champions' : 'army'].find(
            c => c?.id === attackedId
          ) ?? null;

        if (!attackingCard || !attackedCard) {
          return;
        }

        let damage =
          attackedCard.position === 'attack'
            ? //@ts-ignore
              attackingCard.atk - attackedCard.atk
            : //@ts-ignore
              attackingCard.atk - attackedCard.def;

        if (
          damage < 0 ||
          (attackedCard.position === 'defense' && damage <= 0)
        ) {
          //@ts-ignore
          attackingCard.hp -= 1;
          //@ts-ignore
          attackedCard.hp -= 1;
        } else if (damage === 0) {
          //@ts-ignore
          attackedCard.hp -= 1;
        } else {
          //@ts-ignore
          attackedCard.hp -= damage;
        }

        const boardKeyToUpdate = champAttack ? 'champions' : 'army';

        attackingBoard[boardKeyToUpdate] = attackingBoard[boardKeyToUpdate].map(
          card => (card?.id === attackingId ? attackingCard : card)
        );

        attackedBoard[boardKeyToUpdate] = attackedBoard[boardKeyToUpdate].map(
          card => (card?.id === attackedId ? attackedCard : card)
        );

        io.to(roomId).emit(BoardMessages.Update, {
          playerOneBoard: room.playerOneBoard,
          playerTwoBoard: room.playerTwoBoard
        });
      }
    }
  );
};
