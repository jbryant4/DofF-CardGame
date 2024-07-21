import { useContext, useEffect } from 'react';
import BattleField from '@/DuelOfFates/Battle';
import Stats from '@/DuelOfFates/Stats';
import RockPaperScissors from '@/RockPaperScissors';
import ModalEnum from '~/constants/modalEnum';
import { GameContext } from '~/context/GameContext';
import { ModalContext } from '~/context/ModalContext';
import createComponent from '~/utils/styles/createComponent';
import LoadingPage from './LoadingPage';

const getGameStateComponent = (state: string) => {
  switch (state) {
    case 'PreLobby':
      return <div>Waiting on challenger</div>;
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
  const {
    staticGameData: {
      data: { player1Id, player2Id }
    },
    dynamicGameData: {
      data: { gameState, player1Active, player2Active }
    }
  } = useContext(GameContext);
  const { setOpenModal } = useContext(ModalContext);
  const ComponentToRender = getGameStateComponent(gameState);

  useEffect(() => {
    const playersLoaded = Boolean(player1Id && player2Id);
    const playersActive = Boolean(player1Active && player2Active);

    if (playersLoaded) {
      setOpenModal(playersActive ? ModalEnum.None : ModalEnum.PlayersActive);
    }
  }, [player1Active, player1Id, player2Active, player2Id, setOpenModal]);

  return <Container>{ComponentToRender}</Container>;
};

export default DuelOfFates;
