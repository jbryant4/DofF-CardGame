import { Server } from 'socket.io';
import { Players } from '~/constants/common/gameTypes';
import { GameMessages } from '../gameHandlers/gameHandlers';
import { GameRoom } from '../room';

export default function handlePlayerDamage(
  room: GameRoom,
  playerTakingDamage: Players,
  damageTaken: number,
  roomId: string,
  io: Server
) {
  const { player1, player2 } = room;

  const playerToUpdate = playerTakingDamage === 'playerOne' ? player1 : player2;

  playerToUpdate.hitPoints = playerToUpdate.hitPoints - damageTaken;

  if (playerToUpdate.hitPoints === 0) {
    io.to(roomId).emit(GameMessages.GameOver, {
      winner: playerTakingDamage === 'playerOne' ? player2 : player1
    });
  } else {
    io.to(roomId).emit(GameMessages.HealthUpdate, {
      player1Health: player1.hitPoints,
      player2Health: player2.hitPoints
    });
  }
}
