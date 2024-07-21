import { GameState, PlayerSelection, RPSGame } from '../../shared/gameTypes';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// Helper function to determine the winner
function determineWinner(
  choice1: PlayerSelection,
  choice2: PlayerSelection
): RPSGame['roundWinner'] {
  const rules = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  if (choice1 === choice2) return 'tie';

  return rules[choice1] === choice2 ? 'player1' : 'player2';
}

// Cloud Function triggered by updates to rockPaperScissors choices
export const updateRPSGame = functions.database
  .ref('/rpsGames/{gameId}')
  .onUpdate(async (change, context) => {
    const afterData = change.after.val() as RPSGame;

    if (afterData.player1Choice && afterData.player2Choice) {
      const winner = determineWinner(
        afterData.player1Choice,
        afterData.player2Choice
      );
      const updates: RPSGame = {
        ...afterData,
        player1Choice: null, // Reset choices
        player2Choice: null,
        roundWinner: winner
      };

      // Update scores based on the winner
      if (winner !== 'tie') {
        updates[winner === 'player1' ? 'player1Score' : 'player2Score'] =
          updates[winner === 'player1' ? 'player1Score' : 'player2Score'] + 1;
      }

      // Apply updates to the RPS game state
      await change.after.ref.update(updates);

      // Check for overall winner and update main game state if needed
      const updatedGameData = (
        await change.after.ref.once('value')
      ).val() as RPSGame;
      if (
        updatedGameData.player1Score >= 2 ||
        updatedGameData.player2Score >= 2
      ) {
        const mainGameRef = admin
          .database()
          .ref(`games/${context.params.gameId}/dynamic`);
        await mainGameRef.update({
          gameState: GameState.SetUp,
          battleTurn: updatedGameData.player1Score >= 2 ? 'player1' : 'player2'
        });
      }
    }

    return null;
  });
