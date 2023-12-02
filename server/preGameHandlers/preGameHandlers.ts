import { Socket, Server } from 'socket.io';
import createGameHandler from './createGame';
import joinGameHandler from './joinGame';
import miniGameHandlers from './miniGameHandlers';
import playerReadyHandler from './playerReady';
import { GameRoom } from '../room';

export enum PreGameMessages {
  NewRoom = 'create-game-room',
  RoomCreated = 'room-created',
  JoinRoom = 'joining-room',
  JoinFailed = 'join-room-failed',
  JoinSuccess = 'join-success',
  PlayerReady = 'player-ready',
  RPSShoot = 'rps-start',
  RPSResult = 'rps-result',
  PlayerSelection = 'player-selection',
  StartDuel = 'start-duel'
}

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  createGameHandler(socket, rooms);
  joinGameHandler(socket, rooms);
  playerReadyHandler(socket, rooms, io);
  miniGameHandlers(socket, rooms, io);
};
