import { useState } from 'react';
import CardLayout from '@/DuelOfFates/Battle/CardLayout';
import styles from './BattleField.module.css';
import { Container, Wrapper } from './BattleField.styles';

type OwnProps = {};

const BattleField = ({}: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <>
      <Container className="bg-green-50 grid grid-rows-[1fr_1fr] h-full overflow-hidden w-full">
        <CardLayout isEnemy={true} />
        <CardLayout />
      </Container>
    </>
  );
};

export default BattleField;
