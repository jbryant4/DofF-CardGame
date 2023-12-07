import CardLayout from '@/DuelOfFates/Battle/CardLayout';
import ScoreBoard from '@/DuelOfFates/Battle/ScoreBoard';
import { Container } from './BattleField.styles';

type OwnProps = {};

const BattleField = ({}: OwnProps) => {
  return (
    <Container>
      <CardLayout isEnemy={true} />
      <ScoreBoard />
      <CardLayout />
    </Container>
  );
};

export default BattleField;
