import { useContext } from 'react';
import BattleField from '@/DuelOfFates/Battle';
import Stats from '@/DuelOfFates/Stats';
import RockPaperScissors from '@/RockPaperScissors';
import { GameContext } from '~/context/GameContext';
import createComponent from '~/utils/styles/createComponent';
import LoadingPage from './LoadingPage';

const getGameStateComponent = (state: string) => {
  switch (state) {
    case 'Lobby':
      return <RockPaperScissors />;
    // TODO Need Loading PageHere
    case 'SetUp':
      return <LoadingPage />;
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

const DuelOfFates = () => {
  const { gameState } = useContext(GameContext);
  const ComponentToRender = getGameStateComponent(gameState);

  return <Container>{ComponentToRender}</Container>;
};

export default DuelOfFates;
