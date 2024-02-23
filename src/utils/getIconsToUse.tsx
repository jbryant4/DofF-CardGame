import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { PreReq } from '~/contracts/card';

//Dynamic Import all Foundation Icons
const EarthIcon = dynamic(() => import('~/icons/EarthFoundationIcon'));
const OceanIcon = dynamic(() => import('~/icons/OceanFoundationIcon'));
const DesertIcon = dynamic(() => import('~/icons/DesertFoundationIcon'));

const OneArmyIcon = dynamic(() => import('~/icons/OneArmyIcon'));
const TwoArmyIcon = dynamic(() => import('~/icons/TwoArmyIcon'));
const ThreeArmyIcon = dynamic(() => import('~/icons/ThreeArmyIcon'));

const OneChampIcon = dynamic(() => import('~/icons/OneChampionIcon'));
const TwoChampIcon = dynamic(() => import('~/icons/TwoChampionIcon'));

export const getIconToUse = (preReq: PreReq | undefined, cardWidth: number) => {
  if (!preReq) return null;

  switch (preReq.toLocaleLowerCase()) {
    case 'earth':
      return <EarthIcon size={cardWidth / 3.5} />;
    case 'ocean':
      return <OceanIcon size={cardWidth / 3.5} />;
    case 'desert':
      return <DesertIcon size={cardWidth / 3.5} />;
    case '1a':
      return <OneArmyIcon size={cardWidth / 4.1} />;
    case '2a':
      return <TwoArmyIcon size={cardWidth / 4.1} />;
    case '3a':
      return <ThreeArmyIcon size={cardWidth / 3.5} />;
    case '1c':
      return <OneChampIcon size={cardWidth / 4} />;
    case '2c':
      return <TwoChampIcon size={cardWidth / 3} />;
    default:
      return null;
  }
};

const useGetIconsToUse = (preReqs: PreReq[], cardWidth: number) => {
  return useMemo(() => {
    return {
      IconOne: getIconToUse(preReqs[0], cardWidth),
      IconTwo: getIconToUse(preReqs[1], cardWidth),
      IconThree: getIconToUse(preReqs[2], cardWidth),
      IconFour: getIconToUse(preReqs[3], cardWidth),
      IconFive: getIconToUse(preReqs[4], cardWidth)
    };
  }, [cardWidth, preReqs]);
};
export default useGetIconsToUse;
