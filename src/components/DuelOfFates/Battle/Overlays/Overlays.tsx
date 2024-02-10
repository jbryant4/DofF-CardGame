import { Dispatch, SetStateAction } from 'react';
import EnemyHand from '@/DuelOfFates/Battle/Overlays/EnemyHand';
import GraveYard from '@/DuelOfFates/Battle/Overlays/GraveYard';
import ScoreBoard from '@/DuelOfFates/Battle/Overlays/ScoreBoard';

export enum Overlay {
  EnemyHandOverlay,
  GraveYardOverlay,
  None,
  ScoreBoardOverlay
}

type OwnProps = {
  overlayToShow: Overlay;
  setOverlay: Dispatch<SetStateAction<Overlay>>;
};

export default function Overlays({ overlayToShow, setOverlay }: OwnProps) {
  return (
    <>
      <GraveYard
        show={overlayToShow === Overlay.GraveYardOverlay}
        setShow={setOverlay}
      />
      <ScoreBoard
        show={overlayToShow === Overlay.ScoreBoardOverlay}
        setShow={setOverlay}
      />
      <EnemyHand
        show={overlayToShow === Overlay.EnemyHandOverlay}
        setShow={setOverlay}
      />
    </>
  );
}
