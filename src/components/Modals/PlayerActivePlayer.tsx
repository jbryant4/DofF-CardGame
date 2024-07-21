import { Dialog } from '@headlessui/react';
import { useContext } from 'react';
import { GameContext } from '~/context/GameContext';

export default function PlayerActivePlayer() {
  const {
    staticGameData: {
      data: { player1UserName, player2UserName }
    },
    dynamicGameData: {
      data: { player1Active, player2Active }
    }
  } = useContext(GameContext);

  return (
    <Dialog.Panel className="bg-white flex flex-col gap-16 h-[400px] mx-auto w-[400px]">
      <Dialog.Title className="font-bold shadow shadow-black text-24 text-center w-full">
        Not All Players Connected
      </Dialog.Title>
      <Dialog.Description className="flex flex-col gap-24 px-20">
        <div className="flex gap-16">
          {player1UserName} active : {player1Active}
        </div>
        <div className="flex gap-16">
          {player2UserName} active : {player2Active}
        </div>
      </Dialog.Description>
    </Dialog.Panel>
  );
}
