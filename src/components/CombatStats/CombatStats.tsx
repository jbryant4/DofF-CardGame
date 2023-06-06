import { useState } from 'react';
import ShieldIcon from '~/icons/ShieldIcon';
import { Container, Wrapper } from './CombatStats.styles';

type OwnProps = {};

const CombatStats = ({}: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container>
      <Wrapper>CombatStats</Wrapper>
      <ShieldIcon />
    </Container>
  );
};

export default CombatStats;
