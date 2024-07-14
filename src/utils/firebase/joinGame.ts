import { ref, update, get } from 'firebase/database';
import { rtdb } from '@firebaseUiConfig';
import { Duelist, GameState, RTgame } from '@shared/gameTypes';
import { Result, ResultStatus } from '@shared/resultType';

export default async function joinGame(
  player: Duelist,
  gameId: string
): Promise<Result<string>> {
  const gameRef = ref(rtdb, 'games/' + gameId);
  const playerRef = ref(rtdb, 'players/' + player.id);

  try {
    // Check if the game exists and can be joined
    const gameSnapshot = await get(gameRef);
    if (!gameSnapshot.exists()) {
      return {
        status: ResultStatus.ProcessingError,
        errorMessage: 'Game does not exist'
      };
    }

    if (gameSnapshot.val().player2Id) {
      return {
        status: ResultStatus.ProcessingError,
        errorMessage: 'Game is already full'
      };
    }

    // Prepare game update data
    const gameData: Partial<RTgame> = {
      gameState: GameState.Lobby,
      player2Id: player.id,
      player2UserName: player.userName,
      player2Deck: player.deck,
      player2Active: true
    };

    // Update game with second player details
    await update(gameRef, gameData);

    // Link player to the game
    await update(playerRef, { currentGameId: gameId });

    return { status: ResultStatus.Succeeded, content: gameId };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return {
      status: ResultStatus.ProcessingError,
      errorMessage: errorMessage
    };
  }
}
