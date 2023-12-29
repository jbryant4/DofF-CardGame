import ResourceCard from '@/DuelOfFates/Battle/ResourceCard';
import { useBoardContext } from '~/context/BoardContext';

type OwnProps = {
  isEnemy?: boolean;
};

const Resources = ({ isEnemy = false }: OwnProps) => {
  const { localBoard, enemyBoard } = useBoardContext();

  const { resources } = isEnemy ? enemyBoard : localBoard;

  return (
    <div className="bg-amber-50 flex-grow p-8">
      <div className="h-full relative w-full">
        <ResourceCard card={resources[0]} isTopCard isEnemy={isEnemy} />
        <ResourceCard card={resources[1]} isEnemy={isEnemy} />
      </div>
    </div>
  );
};

export default Resources;
