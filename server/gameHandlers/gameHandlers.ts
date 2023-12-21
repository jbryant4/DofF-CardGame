import { Server, Socket } from 'socket.io';
import advanceStageHandler from './advanceStageHandler';
import directHitHandler from './directHitHandler';
import { GameRoom } from '../room';

export enum GameMessages {
  AdvanceStage = 'advance-stage',
  AdvanceCompete = 'advance-complete',
  DirectHit = 'direct-hit',
  GameOver = 'game-over',
  HealthUpdate = 'health-update'
}

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  advanceStageHandler(socket, rooms, io);
  directHitHandler(socket, rooms, io);
  //attackHandler
  //discardHandler
  //shuffleHandler
  //peakHandler
};
