import { Socket, Server } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import { PreGameMessages } from './preGameHandlers';
import setUpHandler from '../boardHandlers/setUpHandler';
import { GameRoom } from '../room';
import RPSRoundResults from '../utils/RPSRoundResults';

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  socket.on(
    PreGameMessages.PlayerSelection,
    (roomId: string, player: Players, selection: string) => {
      const room = rooms[roomId];
      if (room) {
        if (player === 'playerOne') {
          room.miniGame.playerOneSelection = selection;
        } else {
          room.miniGame.playerTwoSelection = selection;
        }

        if (
          room.miniGame.playerOneSelection &&
          room.miniGame.playerTwoSelection
        ) {
          // Determine the winner and update room state
          const winner = RPSRoundResults(room.miniGame);

          // Emit the result to the room
          io.to(roomId).emit(
            PreGameMessages.RPSResult,
            winner ? winner : 'tie'
          );

          if (winner) {
            room.miniGame.winner.push(winner);
          }

          // Check if either player has won the maximum number of rounds
          const playerOneWins = room.miniGame.winner.filter(
            w => w === 'playerOne'
          ).length;
          const playerTwoWins = room.miniGame.winner.filter(
            w => w === 'playerTwo'
          ).length;

          // Set up the board
          if (playerOneWins === 2 || playerTwoWins === 2) {
            // Determine the overall winner and emit an event to start the duel
            const overallWinner =
              playerOneWins === 2 ? 'playerOne' : 'playerTwo';

            room.battleTurn = overallWinner;
            room.gameState = 'SetUp';
            room.battleStage = 'plan';

            io.to(roomId).emit(PreGameMessages.StartDuel, room);
            setUpHandler(io, room, roomId);
          }

          // Reset player selections for the next round
          room.miniGame.playerOneSelection = '';
          room.miniGame.playerTwoSelection = '';
        }
      }
    }
  );
};
