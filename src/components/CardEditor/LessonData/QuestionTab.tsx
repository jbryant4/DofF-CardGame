import { Disclosure } from '@headlessui/react';
import BlueBtn from '@/Global/BlueBtn';
import { Question } from '~/contracts/card';

type OwnProps = {
  question: Question;
  key?: string;
  removeQuestion: () => void;
};

const QuestionTab = ({
  question: { prompt, options, answer },
  key = '',
  removeQuestion
}: OwnProps) => {
  return (
    <div key={key} className="pt-16 px-4 w-full">
      <div className="bg-white mx-auto p-2 rounded-2xl w-full">
        <Disclosure>
          <>
            <Disclosure.Button className="bg-blue-100 flex focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-purple-500 focus:outline-none hover:bg-blue-200 justify-between px-4 py-8 rounded-lg text-left text-purple-900 text-sm w-full">
              <span>{prompt}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="bg-white pb-8 pt-12 px-8 rounded text-blue-500 text-left">
              {options.map((option, index) => {
                const isAnswer = answer === option || answer.includes(option);

                return (
                  <div key={index} className={isAnswer ? 'font-bold' : ''}>
                    {index + 1}) {option}
                  </div>
                );
              })}
              <BlueBtn onClick={removeQuestion} className="mx-auto">
                Delete
              </BlueBtn>
            </Disclosure.Panel>
          </>
        </Disclosure>
      </div>
    </div>
  );
};

export default QuestionTab;
