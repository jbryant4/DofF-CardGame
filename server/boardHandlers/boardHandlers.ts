import { Server, Socket } from 'socket.io';
import setUpHandler from './setUpHandler';
import { GameRoom } from '../room';

export enum BoardMessages {
  BoardSetUp = 'board-setup'
}

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  //drawHandler
  //placeHandler
  //attackHandler
  //discardHandler
  //shuffleHandler
  //peakHandler
};
