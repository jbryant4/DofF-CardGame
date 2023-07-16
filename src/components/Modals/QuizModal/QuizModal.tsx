import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Dispatch, useContext, useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import ModalEnum from '~/constants/modalEnum';
import { CardContext } from '~/context/CardContext';
import { ModalContext } from '~/context/ModalContext';

type OwnProps = {
  confirmClose: boolean;
  setConfirm: Dispatch<boolean>;
};
const QuizModal = ({ confirmClose, setConfirm }: OwnProps) => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { getCard } = useContext(CardContext);
  let card = getCard(id);
  const { title = '', quiz = [] } = card;
  const { setOpenModal } = useContext(ModalContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswer] = useState(0);

  const currentQuestion = quiz[currentQuestionIndex];
  console.log(selectedOptions);
  const handleOptionSelect = (option: string, isMultiAnswer: boolean) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter(selectedOption => selectedOption !== option)
      );
    } else {
      setSelectedOptions(
        isMultiAnswer ? [...selectedOptions, option] : [option]
      );
    }
  };

  const handleNextQuestion = () => {
    // Validate answer and perform necessary actions
    const isCorrectAnswer = Array.isArray(currentQuestion.answer)
      ? selectedOptions.length === currentQuestion.answer.length &&
        selectedOptions.every(selectedOption =>
          currentQuestion.answer.includes(selectedOption)
        )
      : selectedOptions[0] === currentQuestion.answer;

    if (isCorrectAnswer) {
      setCorrectAnswer(prevState => prevState + 1);
    }

    // Go to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOptions([]);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white flex flex-col gap-12 items-center">
        <Transition
          show={confirmClose}
          enter="transition-height duration-500"
          enterFrom="h-0"
          enterTo="h-full"
          leave="transition-height duration-500"
          leaveFrom="h-full"
          leaveTo="h-0"
        >
          <div className="py-12">
            <div>Are you sure you want to leave?</div>
            <div className="flex gap-12 justify-center">
              <BlueBtn onClick={() => setConfirm(false)}>no</BlueBtn>
              <BlueBtn onClick={() => setOpenModal(ModalEnum.None)}>
                yes
              </BlueBtn>
            </div>
          </div>
        </Transition>
      </div>
      <Dialog.Panel className="bg-white flex flex-col mx-auto w-[400px]">
        {card ? (
          <>
            <Dialog.Title
              as="div"
              className="flex-shrink-0 font-bold shadow shadow-black text-24 text-center w-full"
            >
              Unlocking: {title}{' '}
              <span className="font-normal text-12">
                ({currentQuestionIndex + 1}/{quiz.length})
              </span>
            </Dialog.Title>

            <Dialog.Description
              as="div"
              className="bg-green-100 flex min-h-[400px] px-20"
            >
              {currentQuestion && currentQuestionIndex <= quiz.length ? (
                <div className="flex flex-col flex-grow gap-16 h-full py-20 w-full">
                  <div className="bg-blue-200 font-medium px-4 py-8 rounded tex text-18 text-center w-full">
                    {currentQuestion.prompt}
                  </div>
                  <ul className="flex flex-col flex-grow gap-12">
                    {currentQuestion.options.map((option, index) => {
                      const isMultiAnswer =
                        Array.isArray(currentQuestion.answer) &&
                        currentQuestion.answer.length > 1;

                      return (
                        <li key={index}>
                          <label className="bg-gray-300 capitalize flex gap-16 hover:bg-gray-600 hover:text-white px-8 py-4 rounded-full text-14">
                            <input
                              type={isMultiAnswer ? 'checkbox' : 'radio'}
                              value={option}
                              checked={selectedOptions.includes(option)}
                              onChange={() =>
                                handleOptionSelect(option, isMultiAnswer)
                              }
                            />
                            {option}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <BlueBtn
                    className="font-bold self-end text-center w-1/3"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </BlueBtn>
                </div>
              ) : (
                <div>
                  score card {correctAnswers} out of {quiz.length}
                  <BlueBtn onClick={() => setOpenModal(ModalEnum.None)}>
                    Close
                  </BlueBtn>
                </div>
              )}
            </Dialog.Description>
          </>
        ) : (
          <BlueBtn onClick={() => setOpenModal(ModalEnum.None)}>
            missing card data
          </BlueBtn>
        )}
      </Dialog.Panel>
    </div>
  );
};

export default QuizModal;
