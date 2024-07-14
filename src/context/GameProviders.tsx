import React from 'react';
import { DimensionsProvider } from '~/context/DimensionsContext';
import { BoardProvider } from './BoardContext';
import { GameProvider } from './GameContext';

type OwnProps = {
  children: React.ReactNode;
};
const GameProviders = ({ children }: OwnProps) => {
  return (
    <DimensionsProvider>
      <GameProvider>
        <BoardProvider>{children}</BoardProvider>
      </GameProvider>
    </DimensionsProvider>
  );
};

export default GameProviders;
