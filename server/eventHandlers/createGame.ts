import { Socket } from 'socket.io';
import { Duelist } from '~/constants/common/gameTypes';
import defaultRoom, { GameRoom } from '../room';

function generateUniqueRoomId(length: number = 6): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomId += characters.charAt(randomIndex);
  }

  return roomId;
}

export default (socket: Socket, rooms: Record<string, GameRoom>) => {
  socket.on('create-game', (data: Duelist) => {
    // Create a new game room and store it in the 'rooms' object
    const roomId = generateUniqueRoomId();
    rooms[roomId] = {
      ...defaultRoom,
      player1: { ...data, active: false }
    };

    // Notify the player that the game has been created with roomId
    socket.emit('game-created', { roomId });
  });
};
