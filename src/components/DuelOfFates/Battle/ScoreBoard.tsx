import { useContext } from 'react';
import { GameContext } from '~/context/GameContext';

type OwnProps = {};

const ScoreBoard = ({}: OwnProps) => {
  const {
    playerOne: { userName: pOneUserName, hitPoints: pOneHitPoints },
    playerTwo: { userName: pTwoUserName, hitPoints: pTwoHitPoints },
    battleTurn,
    battleStage,
    localPlayer
  } = useContext(GameContext);

  return (
    <div className="absolute bg-gray-700 bottom-1/2 gap-8 grid grid-rows-[1fr_1fr_auto] items-center justify-around px-24 py-8 right-8 rounded shadow-md text-white translate-y-1/2">
      <div className="flex flex-col items-center">
        <div>{localPlayer === 'playerOne' ? pTwoUserName : pOneUserName}</div>
        <div className="bg-red-900 flex font-bold h-36 items-center justify-center rounded-full text-black w-36">
          {localPlayer === 'playerOne' ? pTwoHitPoints : pOneHitPoints}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>{localPlayer === 'playerOne' ? pOneUserName : pTwoUserName}</div>
        <div className="bg-red-900 flex font-bold h-36 items-center justify-center rounded-full text-black w-36">
          {localPlayer === 'playerOne' ? pOneHitPoints : pTwoHitPoints}
        </div>
      </div>
      <div className="flex gap-12 h-fit">
        <div className="flex items-center">
          <p>Turn:</p>{' '}
          {battleTurn === 'playerOne' ? pOneUserName : pTwoUserName}
        </div>
        <div className="flex items-center">
          <p>Stage:</p> {battleStage}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
