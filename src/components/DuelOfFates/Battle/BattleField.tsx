import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import CardLayout from '@/DuelOfFates/Battle/CardLayout';
import ScoreBoard from '@/DuelOfFates/Battle/ScoreBoard';
import { Container } from './BattleField.styles';

type OwnProps = {};

const BattleField = ({}: OwnProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    console.log(event);
  };

  const handleDragStart = (event: any) => {
    console.log(event);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Container>
        <CardLayout isEnemy={true} />
        <ScoreBoard />
        <CardLayout />
      </Container>
    </DndContext>
  );
};

export default BattleField;
