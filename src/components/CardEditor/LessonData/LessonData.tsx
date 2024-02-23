import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAdminCardContext } from '@/CardEditor/AdminCardContext';
import BlueBtn from '@/Global/BlueBtn';
import { Card, Question } from '~/contracts/card';
import LessonForm from './LessonForm';
import QuestionForm from './QuestionForm';

export default function LessonData() {
  const { cardValues, setCardValues } = useAdminCardContext();
  const {
    lesson: { mediaLinks, quickNotes },
    quiz
  } = cardValues;
  const [activeForm, setActiveForm] = useState<
    'quickNotes' | 'mediaLinks' | 'questions' | null
  >(null);

  useEffect(() => {
    setActiveForm(null);
  }, [cardValues]);

  return (
    <div className="border border-solid h-fit overflow-y-auto p-12 w-[400px]">
      <div className="font-bold mb-24 text-24">Lesson Data</div>
      <div className="flex gap-8 justify-between mb-4 pb-8">
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

      {activeForm === 'questions' && (
        <QuestionForm questions={quiz} setCardValues={setCardValues} />
      )}
    </div>
  );
}
