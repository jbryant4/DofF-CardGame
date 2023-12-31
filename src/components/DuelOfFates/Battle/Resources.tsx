import ResourceCard from '@/DuelOfFates/Battle/ResourceCard';
import { useBoardContext } from '~/context/BoardContext';
import { useDimensionsContext } from '~/context/DimensionsContext';

type OwnProps = {
  isEnemy?: boolean;
};

const Resources = ({ isEnemy = false }: OwnProps) => {
  const { localBoard, enemyBoard } = useBoardContext();
  const { cardHeight } = useDimensionsContext();

  const { resources } = isEnemy ? enemyBoard : localBoard;

  return (
    <div className="bg-amber-50 p-8">
      <div className="relative w-full" style={{ height: cardHeight }}>
        <ResourceCard card={resources[0]} isTopCard isEnemy={isEnemy} />
        <ResourceCard card={resources[1]} isEnemy={isEnemy} />
      </div>
    </div>
  );
};

export default Resources;
