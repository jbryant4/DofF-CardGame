import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import { PreReq } from '~/models/Card';

//Dynamic Import all Foundation Icons
const EarthIcon = dynamic(() => import('./EarthFoundationIcon'));
const OceanIcon = dynamic(() => import('./OceanFoundationIcon'));
const DesertIcon = dynamic(() => import('./DesertFoundationIcon'));

const OneArmyIcon = dynamic(() => import('./OneArmyIcon'));
const TwoArmyIcon = dynamic(() => import('./TwoArmyIcon'));
const ThreeArmyIcon = dynamic(() => import('./ThreeArmyIcon'));

const OneChampIcon = dynamic(() => import('./OneChampionIcon'));
const TwoChampIcon = dynamic(() => import('./TwoChampionIcon'));

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };
type OwnProps = IconProps & { preReq: PreReq };

const getIconToUse = (preReq: PreReq) => {
  switch (preReq.toLocaleLowerCase()) {
    case 'earth':
      return <EarthIcon size={51} x={24} y={24} />;
    case 'ocean':
      return <OceanIcon size={51} x={24} y={24} />;
    case 'desert':
      return <DesertIcon size={51} x={24} y={24} />;
    case '1a':
      return <OneArmyIcon size={35} x={32} y={32} />;
    case '2a':
      return <TwoArmyIcon size={37} x={32} y={32} />;
    case '3a':
      return <ThreeArmyIcon size={48} x={26} y={24} />;
    case '1c':
      return <OneChampIcon size={40} x={30} y={29} />;
    case '2c':
      return <TwoChampIcon size={51} x={24} y={24} />;
    default:
      return <EarthIcon size={55} />;
  }
};

const PreReqIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ preReq, ...props }, ref) => {
    const IconToUse = getIconToUse(preReq);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={75}
        height={75}
        {...props}
        ref={ref}
        version="1.1"
        viewBox="0 0 100 100"
        className="my-[-25px]"
      >
        <path d="m22.117 50c0-11.535 6.8047-21.715 17.375-26.047v-2.293h21.016v2.293c10.57 4.332 17.375 14.512 17.375 26.047s-6.8047 21.715-17.375 26.047v2.293h-21.016v-2.293c-10.57-4.332-17.375-14.512-17.375-26.047z" />
        {IconToUse && IconToUse}
      </svg>
    );
  }
);

export default PreReqIcon;
