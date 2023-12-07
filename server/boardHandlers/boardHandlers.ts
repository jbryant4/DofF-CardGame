import { Server, Socket } from 'socket.io';
import placeHandler from './placeHandler';
import { GameRoom } from '../room';

export enum BoardMessages {
  BoardSetUp = 'board-setup',
  Update = 'board-update',
  Place = 'place-card'
}

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  placeHandler(socket, rooms, io);
  //drawHandler
  //attackHandler
  //discardHandler
  //shuffleHandler
  //peakHandler
};
