import classnames from 'classnames';
import { useEffect, useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import { Circle } from '@/RockPaperScissors/RPS.styles';
import { Players } from '@shared/gameTypes';
import { useGameContext } from '~/context/GameContext';

const RockPaperScissors = () => {
  const [prevResult, setPrevResult] = useState('');
  const [waitingResults, setWaiting] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [roundResult, setRoundResult] = useState<Players[]>([]);
  const { localPlayer, roomId } = useGameContext();

  const handleTimerEnd = () => {
    // Handle logic when the timer reaches zero
    // You can send the selected option to the socket here
    setWaiting(true);
    //TODO firebase functionality
    setSelectedOption('');
  };

  useEffect(() => {
    // Handle the mini-game result
    //TODO firebase functionality
  }, []);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col gap-24 items-center mt-36">
      <div>Welcome {localPlayer}</div>
      {prevResult && <div>Round Result was {prevResult}</div>}
      <div className="flex gap-24">
        <Circle
          className={classnames(
            { 'bg-green-900': roundResult[0] === localPlayer },
            { 'bg-red-900': roundResult[0] && roundResult[0] !== localPlayer },
            { 'bg-blue-900': !roundResult[0] }
          )}
        />
        <Circle
          className={classnames(
            { 'bg-green-900': roundResult[1] === localPlayer },
            { 'bg-red-900': roundResult[1] && roundResult[1] !== localPlayer },
            { 'bg-blue-900': !roundResult[1] }
          )}
        />
        <Circle
          className={classnames(
            { 'bg-green-900': roundResult[2] === localPlayer },
            { 'bg-red-900': roundResult[2] && roundResult[2] !== localPlayer },
            { 'bg-blue-900': !roundResult[2] }
          )}
        />
      </div>
      <div className="flex flex-col gap-24 items-center">
        {/* Buttons for rock, paper, and scissors */}
        <BlueBtn
          active={selectedOption === 'rock'}
          onClick={() => handleOptionSelect('rock')}
        >
          Rock
        </BlueBtn>
        <BlueBtn
          active={selectedOption === 'paper'}
          onClick={() => handleOptionSelect('paper')}
        >
          Paper
        </BlueBtn>
        <BlueBtn
          active={selectedOption === 'scissors'}
          onClick={() => handleOptionSelect('scissors')}
        >
          Scissors
        </BlueBtn>
      </div>

      <div>
        {waitingResults ? (
          'Waiting for Other Player'
        ) : (
          <button disabled={!selectedOption} onClick={handleTimerEnd}>
            {!selectedOption ? 'Select Option' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissors;
