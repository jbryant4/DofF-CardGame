import { onValue } from '@firebase/database';
import classnames from 'classnames';
import { off, ref, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import { ActionBtn } from '@/Modals/BattleCardModal/BattleCardModal.styles';
import { Circle } from '@/RockPaperScissors/RPS.styles';
import { rtdb } from '@firebaseUiConfig';
import { Players, PlayerSelection } from '@shared/gameTypes';
import { useGameContext } from '~/context/GameContext';

const RockPaperScissors = () => {
  const [prevResult, setPrevResult] = useState('');
  const [waitingResults, setWaiting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PlayerSelection | null>(
    null
  );
  const [roundResult, setRoundResult] = useState<Players[]>([]);
  const {
    localPlayer: { data: localPlayer },
    roomId
  } = useGameContext();

  useEffect(() => {
    const roundWinnerRef = ref(rtdb, `rpsGames/${roomId}/roundWinner`);

    const handleRoundWinnerChange = (snapshot: { val: () => any }) => {
      const roundWinner = snapshot.val();
      if (roundWinner) {
        setPrevResult(roundWinner);
        if (roundWinner !== 'tie') {
          setRoundResult(prevState => [roundWinner, ...prevState]);
        }
        setWaiting(false);
      }
    };

    onValue(roundWinnerRef, handleRoundWinnerChange);

    return () => {
      off(roundWinnerRef, 'value', handleRoundWinnerChange);
    };
  }, [roomId]);

  async function handleSelectionSubmit() {
    // Handle logic when the timer reaches zero
    // You can send the selected option to the socket here
    console.log(localPlayer);
    setWaiting(true);
    await set(
      ref(rtdb, `rpsGames/${roomId}/${localPlayer}Choice`),
      selectedOption
    );
    setSelectedOption(null);
  }

  const handleOptionSelect = (option: PlayerSelection) => {
    setSelectedOption(option);
  };

  return localPlayer ? (
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
          <ActionBtn disabled={!selectedOption} onClick={handleSelectionSubmit}>
            {!selectedOption ? 'Select Option' : 'Submit'}
          </ActionBtn>
        )}
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default RockPaperScissors;
