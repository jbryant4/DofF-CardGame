import { Dispatch, SetStateAction, useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import { Card, Question } from '~/contracts/card';
import QuestionTab from './QuestionTab';

type OwnProps = {
  questions: Question[];
  setCardValues: Dispatch<SetStateAction<Card>>;
};

const QuestionForm = ({ questions, setCardValues }: OwnProps) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const enableBtn =
    newOptions.filter((_, index) => selectedOptions.includes(index)).length !==
    0;
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedSelectedOptions = [...selectedOptions];
    if (updatedSelectedOptions.includes(index)) {
      // If the option is already selected, remove it from the array
      updatedSelectedOptions.splice(updatedSelectedOptions.indexOf(index), 1);
    } else {
      // If the option is not selected, add it to the array
      updatedSelectedOptions.push(index);
    }
    setSelectedOptions(updatedSelectedOptions);
  };

  const setState = (array: Question[]) => {
    setCardValues(prevState => ({
      ...prevState,
      quiz: array
    }));
  };
  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setState(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (newQuestion && newOptions.length >= 2) {
      const answer = newOptions.filter((_, index) =>
        selectedOptions.includes(index)
      );

      const question = {
        prompt: newQuestion,
        options: newOptions.filter(option => option !== ''),
        answer: answer
      };
      console.log(question);
      const updatedQuestions = [...questions, question];

      setState(updatedQuestions);
      setNewQuestion('');
      setNewOptions(['', '', '', '']);
    }
  };

  return (
    <>
      <div className="border-blue-800 border-solid border-y-[4px] my-12 p-12 space-y-12">
        <div>
          <textarea
            className="w-full"
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            placeholder="Enter a new question"
          />
        </div>
        <div className="flex flex-col gap-8 w-full">
          {newOptions.map((option, index) => (
            <div className="flex gap-8 w-full" key={index}>
              <input
                className="border border-black border-solid p-4 w-full"
                type="text"
                value={option}
                onChange={e => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <input
                type="checkbox"
                checked={selectedOptions.includes(index)}
                onChange={() => handleCheckboxChange(index)}
                disabled={option.trim().length === 0}
              />
            </div>
          ))}
        </div>
        <BlueBtn
          disabled={!enableBtn}
          active={false}
          onClick={handleAddQuestion}
        >
          {enableBtn ? 'Add' : 'answer must be present'}
        </BlueBtn>
      </div>
      <div className="h-[250px] overflow-auto">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionTab
              key={question.prompt}
              removeQuestion={() => handleRemoveQuestion(index)}
              question={question}
            />
          ))
        ) : (
          <div>Currently have no Data</div>
        )}
      </div>
    </>
  );
};

export default QuestionForm;
