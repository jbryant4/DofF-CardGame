import { Server, Socket } from 'socket.io';
import attackHandler from './attackHandler';
import drawHandler from './drawHandler';
import flipHandler from './flipHandler';
import placeHandler from './placeHandler';
import respiteHandler from './respiteHandler';
import shuffleHandler from './shuffleHandler';
import stanceSwitchHandler from './stanceSwitchHandler';
import { GameRoom } from '../room';

export enum BoardMessages {
  Attack = 'card-attack',
  BoardSetUp = 'board-setup',
  Update = 'board-update',
  Place = 'place-card',
  Flip = 'flip-card',
  Switch = 'switch-stance',
  Draw = 'draw',
  Respite = 'respite-discard',
  Reshuffle = 'reshuffle'
}

export default (
  socket: Socket,
  rooms: Record<string, GameRoom>,
  io: Server
) => {
  placeHandler(socket, rooms, io);
  flipHandler(socket, rooms, io);
  stanceSwitchHandler(socket, rooms, io);
  attackHandler(socket, rooms, io);
  drawHandler(socket, rooms, io);
  respiteHandler(socket, rooms, io);
  shuffleHandler(socket, rooms, io);
  //peakHandler
};
