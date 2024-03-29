import dynamic from 'next/dynamic';
import React, { forwardRef } from 'react';
import { Foundation } from '~/contracts/card';

const EarthIcon = dynamic(() => import('./EarthFoundationIcon'));
const OceanIcon = dynamic(() => import('./OceanFoundationIcon'));
const DesertIcon = dynamic(() => import('./DesertFoundationIcon'));

const OneArmyIcon = dynamic(() => import('./OneArmyIcon'));
const ResourceIcon = dynamic(() => import('./ResourceIcon'));

const ScholarIcon = dynamic(() => import('./ScholarIcon'));
const FighterIcon = dynamic(() => import('./FighterIcon'));
const RevolutionistIcon = dynamic(() => import('./RevolutionistIcon'));
const DivineIcon = dynamic(() => import('./DivineIcon'));
const NobilityIcon = dynamic(() => import('./NobleIcon'));
const ExplorerIcon = dynamic(() => import('./ExplorerIcon'));

const getIconToUse = (icon: string) => {
  switch (icon.toLowerCase()) {
    case 'earth':
      return <EarthIcon size={70} x={15} y={15} />;
    case 'ocean':
      return <OceanIcon size={70} x={15} y={15} />;
    case 'desert':
      return <DesertIcon size={70} x={15} y={15} />;
    case 'army':
      return <OneArmyIcon size={56} x={21} y={21} />;
    case 'resource':
      return <ResourceIcon size={95} x={3} y={-4} fill="grey" />;
    case 'scholar':
      return <ScholarIcon size={65} x={18} y={17} />;
    case 'fighter':
      return <FighterIcon size={75} x={15} y={11} />;
    case 'revolutionist':
      return <RevolutionistIcon size={60} x={22} y={22} />;
    case 'divine':
      return <DivineIcon size={65} x={20} y={20} />;
    case 'nobility':
      return <NobilityIcon size={60} x={20} y={20} />;
    case 'explorer':
      return <ExplorerIcon size={70} x={15} y={10} />;
    default:
      return null;
  }
};

type OwnProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  icon?: string;
  foundation?: Foundation[];
  canPlace: boolean;
};

export const getStrokeToUse = (canPlace: boolean, foundation: Foundation) => {
  switch (true) {
    case foundation === 'desert':
      return canPlace ? 'stroke-desert' : 'stroke-desert-light';
    case foundation === 'ocean':
      return canPlace ? 'stroke-ocean' : 'stroke-ocean-light';
    case foundation === 'earth':
      return canPlace ? 'stroke-earth' : 'stroke-earth-light';
    default:
      return 'stroke-red';
  }
};

const Hex = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 100, icon, foundation, canPlace, ...props }, ref) => {
    if (!icon) return null;

    const iconToUse = getIconToUse(icon);
    const strokeToUse =
      foundation && foundation.length > 0
        ? getStrokeToUse(canPlace, foundation[0])
        : 'stroke-black';

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        {...props}
        ref={ref}
        viewBox="0 0 100 100"
        className={`${strokeToUse} `}
      >
        <path
          d="M 5 30 L 50 5 L 95 30 L 95 70 L 50 95 L 5 70 Z"
          strokeWidth="2"
        />

        {iconToUse}
      </svg>
    );
  }
);

export default Hex;
