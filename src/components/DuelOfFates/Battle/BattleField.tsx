import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { useState } from 'react';
import CardLayout from '@/DuelOfFates/Battle/CardLayout';
import ScoreBoard from '@/DuelOfFates/Battle/ScoreBoard';
import styles from './BattleField.module.css';
import { Container, Wrapper } from './BattleField.styles';

type OwnProps = {};

const BattleField = ({}: OwnProps) => {
  const [value, setValue] = useState();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = event => {
    // Handle drag end event
  };

  const handleDragStart = event => {
    console.log(event);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Container className="bg-green-50 grid grid-rows-[1fr_10vh_50vh] h-full overflow-hidden w-full">
        <CardLayout isEnemy={true} />
        <ScoreBoard />
        <CardLayout />
      </Container>
    </DndContext>
  );
};

export default BattleField;
