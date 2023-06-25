import React, { useState } from 'react';
// import MediaLinksForm from './MediaLinksForm';
// import QuickNotesForm from './QuickNotesForm';
// import QuestionsForm from './QuestionsForm';
import BlueBtn from '@/Global/BlueBtn';
import { CardDocument, Question } from '~/models/Card';
import LessonForm from './LessonForm';

type OwnProps = {
  mediaLinks: string[] | undefined;
  quickNotes: string[] | undefined;
  quiz: Question[] | undefined;
  setCardValues: React.Dispatch<React.SetStateAction<Partial<CardDocument>>>;
};
const LessonData = ({
  mediaLinks = [],
  quickNotes = [],
  setCardValues,
  quiz = []
}: OwnProps) => {
  const [activeForm, setActiveForm] = useState<
    'quickNotes' | 'mediaLinks' | 'questions'
  >('quickNotes');

  return (
    <div className="max-w-md">
      <div className="border-b-[4px] border-blue-600 border-solid flex gap-8 justify-between mb-4 pb-8">
        <BlueBtn
          onClick={() => setActiveForm('mediaLinks')}
          active={activeForm === 'mediaLinks'}
        >
          MediaLinks
        </BlueBtn>
        <BlueBtn
          onClick={() => setActiveForm('quickNotes')}
          active={activeForm === 'quickNotes'}
        >
          QuickNotes
        </BlueBtn>
        <BlueBtn
          active={activeForm === 'questions'}
          onClick={() => setActiveForm('questions')}
        >
          Questions
        </BlueBtn>
      </div>

      {activeForm === 'mediaLinks' && (
        <LessonForm
          stringArray={mediaLinks}
          setCardValues={setCardValues}
          isMediaLinks={true}
        />
      )}

      {activeForm === 'quickNotes' && (
        <LessonForm
          stringArray={quickNotes}
          setCardValues={setCardValues}
          isMediaLinks={false}
        />
      )}

      {/*{activeForm === 'questions' && (*/}
      {/*  <QuestionsForm quiestions={quiz} setCardValues={setCardValues} />*/}
      {/*)}*/}
    </div>
  );
};

export default LessonData;
