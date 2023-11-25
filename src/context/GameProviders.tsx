import React from 'react';
import { SocketProvider } from '~/context/SocketContext';
import { BoardProvider } from './BoardContext';
import { GameProvider } from './GameContext';

type OwnProps = {
  children: React.ReactNode;
  gameId: string | string[];
};
const GameProviders = ({ children, gameId }: OwnProps) => {
  if (typeof gameId !== 'string') {
    // Handle the unexpected case, perhaps return an error component or redirect the user.
    return <div>Invalid game Id: {gameId}</div>;
  }

  return (
    <SocketProvider>
      <GameProvider gameId={gameId}>
        <BoardProvider>{children}</BoardProvider>
      </GameProvider>
    </SocketProvider>
  );
};

export default GameProviders;
