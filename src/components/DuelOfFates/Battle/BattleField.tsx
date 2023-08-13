import { useState } from 'react';
import { Container, Wrapper } from './BattleField.styles';

type OwnProps = {};

const BattleField = ({}: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container>
      <Wrapper>BattleField</Wrapper>
    </Container>
  );
};

export default BattleField;
