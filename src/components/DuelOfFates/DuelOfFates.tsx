import { useContext } from 'react';
import BattleField from '@/DuelOfFates/Battle';
import Stats from '@/DuelOfFates/Stats';
import RockPaperScissors from '@/RockPaperScissors';
import { GameContext } from '~/context/GameContext';
import createComponent from '~/utils/styles/createComponent';
import Lobby from './Lobby';

const getGameStateComponent = (state: string) => {
  switch (state) {
    case 'Lobby':
      return <RockPaperScissors />;
    case 'AdminLobby':
      return <Lobby />;
    case 'Battle':
      return <BattleField />;
    case 'Stats':
      return <Stats />;
    default:
      return <div>Invalid game state</div>;
  }
};

const Container = createComponent('div', {
  className: 'w-full h-full overflow-hidden'
});

type OwnProps = {
  isAdmin?: boolean;
};

const DuelOfFates = ({ isAdmin = false }: OwnProps) => {
  const { gameState } = useContext(GameContext);
  const ComponentToRender = getGameStateComponent(
    isAdmin ? 'AdminLobby' : gameState
  );

  return <Container>{ComponentToRender}</Container>;
};

export default DuelOfFates;
