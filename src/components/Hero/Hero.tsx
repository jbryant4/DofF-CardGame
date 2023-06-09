import { useState } from 'react';
import { CardDocument } from '~/models/Card';
import { Container, Wrapper } from './Hero.styles';

type OwnProps = {
  card: CardDocument;
};

const Hero = ({ card }: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container className="relative w-full">
      <img src={card.blankUrl} className="mx-auto object-fill opacity-70" />
      <Wrapper className="absolute bottom-0 text-center text-green-600 w-full">
        {card.title}
      </Wrapper>
    </Container>
  );
};

export default Hero;
