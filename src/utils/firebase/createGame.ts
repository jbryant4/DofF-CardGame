import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { rtdb } from '@firebaseUiConfig';
import { defaultRTGame, Duelist, GameState, RTgame } from '@shared/gameTypes';
import { Result, ResultStatus } from '@shared/resultType';

export default async function createGame(
  player: Duelist
): Promise<Result<string>> {
  const gameId = uuidv4();

  const gameData: RTgame = {
    ...defaultRTGame,
    player1Id: player.id,
    player1UserName: player.userName,
    player1Deck: player.deck,
    player1Active: true
  };

  try {
    //create game
    await set(ref(rtdb, 'games/' + gameId), gameData);
    // create user
    await set(ref(rtdb, 'players/' + player.id), { currentGameId: gameId });

    return {
      status: ResultStatus.Succeeded,
      content: gameId
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return {
      status: ResultStatus.ProcessingError,
      errorMessage: errorMessage
    };
  }
}
