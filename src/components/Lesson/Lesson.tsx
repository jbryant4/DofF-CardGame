import { useState } from 'react';
import { Container, Wrapper } from './Lesson.styles';

type OwnProps = {
  description?: string;
};

const Lesson = ({ description }: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container>
      <Wrapper>Lesson</Wrapper>
      <div>{description}</div>
    </Container>
  );
};

export default Lesson;
