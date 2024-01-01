import { Dispatch, SetStateAction, useState } from 'react';
import EnemyHand from '@/DuelOfFates/Battle/Overlays/EnemyHand';
import GraveYard from '@/DuelOfFates/Battle/Overlays/GraveYard';
import ScoreBoard from '@/DuelOfFates/Battle/Overlays/ScoreBoard';

export enum Overlay {
  EnemyHand,
  GraveYard,
  None,
  ScoreBoard
}

type OwnProps = {
  overlayToShow: Overlay;
  setOverlay: Dispatch<SetStateAction<Overlay>>;
};

export default function Overlays({ overlayToShow, setOverlay }: OwnProps) {
  return (
    <>
      <GraveYard
        show={overlayToShow === Overlay.GraveYard}
        setShow={setOverlay}
      />
      <ScoreBoard
        show={overlayToShow === Overlay.ScoreBoard}
        setShow={setOverlay}
      />
      <EnemyHand
        show={overlayToShow === Overlay.EnemyHand}
        setShow={setOverlay}
      />
    </>
  );
}
