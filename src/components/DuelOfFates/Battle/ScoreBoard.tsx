import { useContext, useState } from 'react';
import { GameContext } from '~/context/GameContext';

type OwnProps = {};

const ScoreBoard = ({}: OwnProps) => {
  const {
    playerOne: { userName: pOneUserName, hitPoints: pOneHitPoints },
    playerTwo: { userName: pTwoUserName, hitPoints: pTwoHitPoints },
    battleTurn,
    battleStage
  } = useContext(GameContext);

  return (
    <div className="bg-gray-700 flex items-center justify-around text-white">
      <div className="flex flex-col items-center">
        <div>{pOneUserName}</div>
        <div className="bg-red-900 flex font-bold h-36 items-center justify-center rounded-full text-black w-36">
          {pOneHitPoints}
        </div>
      </div>
      <div>
        Turn: {battleTurn === 'playerOne' ? pOneUserName : pTwoUserName}
      </div>
      <div>Stage: {battleStage}</div>
      <div className="flex flex-col items-center">
        <div>{pTwoUserName}</div>
        <div className="bg-red-900 flex font-bold h-36 items-center justify-center rounded-full text-black w-36">
          {pTwoHitPoints}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
