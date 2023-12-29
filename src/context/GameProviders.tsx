import React from 'react';
import { DimensionsProvider } from '~/context/DimensionsContext';
import { SocketProvider } from '~/context/SocketContext';
import { BoardProvider } from './BoardContext';
import { GameProvider } from './GameContext';

type OwnProps = {
  children: React.ReactNode;
};
const GameProviders = ({ children }: OwnProps) => {
  return (
    <DimensionsProvider>
      <SocketProvider>
        <GameProvider>
          <BoardProvider>{children}</BoardProvider>
        </GameProvider>
      </SocketProvider>
    </DimensionsProvider>
  );
};

export default GameProviders;
