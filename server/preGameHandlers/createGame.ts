import { Socket } from 'socket.io';
import { Duelist } from '~/constants/common/gameTypes';
import { PreGameMessages } from './preGameHandlers';
import defaultRoom, { GameRoom } from '../room';
import generateUniqueRoomId from '../utils/generateUniqueRoomId';

export default (socket: Socket, rooms: Record<string, GameRoom>) => {
  socket.on(PreGameMessages.NewRoom, (duelist: Duelist) => {
    // Create a new game room and store it in the 'rooms' object
    const roomId = generateUniqueRoomId();
    const room = (rooms[roomId] = defaultRoom);
    room.player1 = { ...duelist, active: false };

    socket.join(roomId);
    // Notify the player that the game has been created with roomId
    socket.emit(PreGameMessages.RoomCreated, { roomId });
  });
};
