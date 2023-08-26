import { useContext } from 'react';
import BattleField from '@/DuelOfFates/Battle';
import Stats from '@/DuelOfFates/Stats';
import { GameContext } from '~/context/GameContext';
import createComponent from '~/utils/styles/createComponent';
import Lobby from './Lobby';

const getGameStateComponent = (state: string) => {
  switch (state) {
    case 'Lobby':
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
const DuelOfFates = () => {
  const { gameState } = useContext(GameContext);
  const ComponentToRender = getGameStateComponent(gameState);

  return <Container>{ComponentToRender}</Container>;
};

export default DuelOfFates;
