import { get, ref, update } from 'firebase/database';
import { rtdb } from '@firebaseUiConfig';
import {
  convertDeckToCardArray,
  Duelist,
  GameState,
  RTgameDynamic,
  RTgameStatic
} from '@shared/gameTypes';
import { Result, ResultStatus } from '@shared/resultType';

export default async function joinGame(
  player: Duelist,
  gameId: string
): Promise<Result<string>> {
  const staticRef = ref(rtdb, `games/${gameId}/static`);
  const dynamicRef = ref(rtdb, `games/${gameId}/dynamic`);
  const playerRef = ref(rtdb, 'players/' + player.id);

  try {
    // Check if the game exists and can be joined
    const staticSnapshot = await get(staticRef);
    if (!staticSnapshot.exists()) {
      return {
        status: ResultStatus.ProcessingError,
        errorMessage: 'Game does not exist.'
      };
    }

    const staticData = staticSnapshot.val() as RTgameStatic;
    if (staticData.player2Id) {
      return {
        status: ResultStatus.ProcessingError,
        errorMessage: 'Game is already full'
      };
    }

    const updatedStaticData: Partial<RTgameStatic> = {
      player2Id: player.id,
      player2UserName: player.userName,
      player2Deck: convertDeckToCardArray(player.deck.cards)
    };

    const updatedDynamicData: Partial<RTgameDynamic> = {
      player2Active: true,
      gameState: GameState.Lobby
    };

    // Update static game data with second player details
    await update(staticRef, updatedStaticData);
    // Update dynamic game data with second player details
    await update(dynamicRef, updatedDynamicData);
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
