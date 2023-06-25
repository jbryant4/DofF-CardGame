import React, { useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import { Question } from '~/models/Card';

const QuestionsForm = ({ questions, setCardValues }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newAnswer, setNewAnswer] = useState('');
  const enableBtn =
    newOptions.every(option => option.length > 0) &&
    newOptions.includes(newAnswer);
  console.log(enableBtn);
  const setState = (array: Question[]) => {
    setCardValues(prevState => ({
      ...prevState,
      quiz: array
    }));
  };

  const handleAddQuestion = () => {
    if (newQuestion && newOptions.length >= 2 && newAnswer) {
      const updatedQuestions = [
        ...questions,
        { prompt: newQuestion, options: newOptions, answer: newAnswer }
      ];
      setState(updatedQuestions);
      setNewQuestion('');
      setNewOptions(['', '', '', '']);
      setNewAnswer('');
    }
  };

  const handleRemoveQuestion = index => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setState(updatedQuestions);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  return (
    <div>
      <div className="border-blue-800 border-solid border-y-[4px] my-12 p-12 space-y-12">
        <div>
          <textarea
            className="w-full"
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            placeholder="Enter a new question"
          />
        </div>
        <div className="flex flex-wrap w-full">
          {newOptions.map((option, index) => (
            <input
              className="border border border-black border-solid p-4 w-2/4"
              key={index}
              type="text"
              value={option}
              onChange={e => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              style={{ flexBasis: '50%' }}
            />
          ))}
        </div>
        <div>
          <input
            className="border border border-black border-solid p-4 w-2/4"
            type="text"
            value={newAnswer}
            onChange={e => setNewAnswer(e.target.value)}
            placeholder="Enter the answer"
          />
        </div>
        <BlueBtn
          disabled={!enableBtn}
          active={false}
          onClick={handleAddQuestion}
        >
          {enableBtn ? 'Add' : 'answer must be 1 of 4 options'}
        </BlueBtn>
      </div>
      <div className="h-[450px] overflow-auto">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div className="border border-gray-300 flex gap-4 items-center justify-between my-8 p-4 rounded">
              <div key={index} className="flex flex-col">
                <div className="flex">
                  <div className="flex-shrink-0 w-fit">{index}).</div>
                  <div className="break-all flex-grow px-8">
                    {question.prompt}
                  </div>
                </div>
                <div className="flex gap-8 justify-center">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`py-2 break-all flex-grow ${
                        option === question.answer
                          ? 'font-bold text-blue-800'
                          : ''
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              <BlueBtn onClick={() => handleRemoveQuestion(index)}>
                Delete
              </BlueBtn>
            </div>
          ))
        ) : (
          <div>Currently have no Data</div>
        )}
      </div>
    </div>
  );
};

export default QuestionsForm;
