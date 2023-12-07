import classnames from 'classnames';
import { useEffect, useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import { Circle } from '@/RockPaperScissors/RPS.styles';
import { Players } from '~/constants/common/gameTypes';
import { useGameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { PreGameMessages } from '../../../server/preGameHandlers/preGameHandlers';

const RockPaperScissors = () => {
  const [prevResult, setPrevResult] = useState('');
  const [waitingResults, setWaiting] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [roundResult, setRoundResult] = useState<Players[]>([]);
  const socket = useSocket();
  const { localPlayer, roomId } = useGameContext();

  const handleTimerEnd = () => {
    if (!socket) return;
    // Handle logic when the timer reaches zero
    // You can send the selected option to the socket here
    setWaiting(true);
    socket.emit(
      PreGameMessages.PlayerSelection,
      roomId,
      localPlayer,
      selectedOption
    );
    setSelectedOption('');
  };

  useEffect(() => {
    if (!socket) return;

    // Handle the mini-game result
    socket.on(PreGameMessages.RPSResult, (result: Players | 'tie') => {
      setPrevResult(result);
      if (result !== 'tie') {
        setRoundResult(prev => [...prev, result]);
      }

      setWaiting(false);
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off(PreGameMessages.RPSResult);
    };
  }, [socket]);

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
