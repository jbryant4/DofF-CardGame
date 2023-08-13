import { useState } from 'react';
import { Container, Wrapper } from './Stats.styles';

type OwnProps = {};

const Stats = ({}: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container>
      <Wrapper>Stats</Wrapper>
    </Container>
  );
};

export default Stats;
