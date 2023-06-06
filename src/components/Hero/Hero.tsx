import { useState } from 'react';
import { CardDocument } from '~/models/Card';
import { Container, Wrapper } from './Hero.styles';

type OwnProps = {
  card: CardDocument;
};

const Hero = ({ card }: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container className="bg-white h-[40vh] relative w-full">
      <img
        src={card.blankUrl}
        className="h-full object-fill opacity-70 w-full"
      />
      <Wrapper className="absolute bottom-0 text-center text-green-600 w-full">
        {card.title}
      </Wrapper>
    </Container>
  );
};

export default Hero;
