import { Server, Socket } from 'socket.io';
import advanceStageHandler from './advanceStageHandler';
import { GameRoom } from '../room';
export enum GameMessages {
  AdvanceStage = 'advance-stage',
  AdvanceCompete = 'advance-complete'
}

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  advanceStageHandler(socket, rooms, io);
  //attackHandler
  //discardHandler
  //shuffleHandler
  //peakHandler
};
