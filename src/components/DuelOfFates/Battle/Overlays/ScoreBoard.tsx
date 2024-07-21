import { Dispatch, SetStateAction, useContext } from 'react';
import { Overlay } from '@/DuelOfFates/Battle/Overlays/Overlays';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { GameContext } from '~/context/GameContext';

type OwnProps = { show: boolean; setShow: Dispatch<SetStateAction<Overlay>> };

const ScoreBoard = ({ show }: OwnProps) => {
  const {
    staticGameData: {
      data: { player1UserName, player2UserName }
    },
    dynamicGameData: {
      data: { player1Hp, player2Hp, battleTurn, battleStage }
    },
    localPlayer: { data: localPlayer }
  } = useContext(GameContext);
  const { canFullBoard, playerBoardMax, playerBoardMin } =
    useDimensionsContext();

  return (
    <div
      className="-translate-y-1/2 absolute bg-gray-700 duration-500 gap-8 grid grid-rows-[1fr_1fr_auto] items-center justify-around px-24 py-8 rounded shadow-md text-white transition-all"
      style={{
        right: show ? 8 : `-100%`,
        top: canFullBoard ? playerBoardMax : playerBoardMin
      }}
    >
      <div className="flex flex-col items-center">
        <div>
          {localPlayer === 'player1' ? player2UserName : player1UserName}
        </div>
        <div className="bg-red-900 flex font-bold h-36 items-center justify-center rounded-full text-black w-36">
          {localPlayer === 'player1' ? player2Hp : player1Hp}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          {localPlayer === 'player1' ? player1UserName : player2UserName}
        </div>
        <div className="bg-red-900 flex font-bold h-36 items-center justify-center rounded-full text-black w-36">
          {localPlayer === 'player1' ? player1Hp : player2Hp}
        </div>
      </div>
      <div className="flex gap-12 h-fit">
        <div className="flex items-center">
          <p>Turn:</p>{' '}
          {battleTurn === 'player1' ? player1UserName : player2UserName}
        </div>
        <div className="flex items-center">
          <p>Stage:</p> {battleStage}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
