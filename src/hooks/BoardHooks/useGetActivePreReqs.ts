import React, { useCallback, useEffect } from 'react';
import { Foundation, PreReq } from '@shared/cardTypes';
import { PlayerField } from '@shared/gameTypes';

type OwnProps = {
  playerBoard: PlayerField;
  setActivePreReqs: React.Dispatch<React.SetStateAction<PreReq[]>>;
};

const armyPreReqs: PreReq[] = ['1a', '2a', '3a'];
const championPreReqs: PreReq[] = ['1c', '2c'];

const useGetActivePreReqs = ({ playerBoard, setActivePreReqs }: OwnProps) => {
  const { army, champions, foundations } = playerBoard;

  const getActivePreReqs = useCallback(() => {
    let newActivePreReqs: PreReq[] = [];

    // Army
    const armyFaceUpCards = Object.values(army).filter(
      card => card && card.faceUp
    );
    newActivePreReqs.push(
      ...armyFaceUpCards.map((_, index) => armyPreReqs[index])
    );

    // Champions
    const championFaceUpCards = Object.values(champions).filter(
      card => card && card.faceUp
    );
    newActivePreReqs.push(
      ...championFaceUpCards.map((_, index) => championPreReqs[index])
    );

    // Foundations
    let foundationArray: Foundation[] = [];
    Object.values(foundations).map(
      card =>
        card &&
        card.faceUp &&
        card.foundation &&
        foundationArray.push(card.foundation[0])
    );

    newActivePreReqs = [...newActivePreReqs, ...foundationArray];

    setActivePreReqs(newActivePreReqs);
  }, [army, champions, foundations, setActivePreReqs]);

  useEffect(() => {
    getActivePreReqs();
  }, [getActivePreReqs]);

  // Return the callback
  return getActivePreReqs;
};

export default useGetActivePreReqs;
