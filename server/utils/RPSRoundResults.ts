import { Players } from '~/constants/common/gameTypes';
import { MiniGame } from '../room';

export default function RPSRoundResults(miniGame: MiniGame): Players {
  // Your logic to determine the winner based on player selections
  // Customize this based on your actual mini-game rules
  const { playerOneSelection, playerTwoSelection } = miniGame;

  // Example logic for Rock, Paper, Scissors
  if (
    (playerOneSelection === 'rock' && playerTwoSelection === 'scissors') ||
    (playerOneSelection === 'scissors' && playerTwoSelection === 'paper') ||
    (playerOneSelection === 'paper' && playerTwoSelection === 'rock')
  ) {
    return 'playerOne';
  } else if (playerOneSelection !== playerTwoSelection) {
    return 'playerTwo';
  } else {
    // It's a tie
    return '';
  }
}
