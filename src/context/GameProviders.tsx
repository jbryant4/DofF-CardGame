import React from 'react';
import { SocketProvider } from '~/context/SocketContext';
import { BoardProvider } from './BoardContext';
import { GameProvider } from './GameContext';

type OwnProps = {
  children: React.ReactNode;
};
const GameProviders = ({ children }: OwnProps) => {
  return (
    <SocketProvider>
      <GameProvider>
        <BoardProvider>{children}</BoardProvider>
      </GameProvider>
    </SocketProvider>
  );
};

export default GameProviders;
