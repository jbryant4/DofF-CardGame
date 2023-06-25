import { useState } from 'react';
import { CardDocument, LessonType } from '~/models/Card';
import { Container, Wrapper } from './Lesson.styles';

type OwnProps = {
  lesson?: LessonType;
  setCardValues: React.Dispatch<React.SetStateAction<Partial<CardDocument>>>;
};

const Lesson = ({ lesson }: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container>
      <Wrapper>Lesson</Wrapper>
      <div>PUT LESSON HERE</div>
    </Container>
  );
};

export default Lesson;
