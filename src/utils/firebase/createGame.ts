import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { rtdb } from '@firebaseUiConfig';
import {
  convertDeckToCardArray,
  defaultRpsGame,
  defaultRTgameDynamic,
  defaultRTGameStatic,
  Duelist,
  RTgameDynamic,
  RTgameStatic
} from '@shared/gameTypes';
import { Result, ResultStatus } from '@shared/resultType';

export default async function createGame(
  player: Duelist
): Promise<Result<string>> {
  const gameId = uuidv4();

  const staticData: RTgameStatic = {
    ...defaultRTGameStatic,
    player1Id: player.id,
    player1UserName: player.userName,
    player1Deck: convertDeckToCardArray(player.deck.cards)
  };
  const dynamicData: RTgameDynamic = {
    ...defaultRTgameDynamic,
    player1Active: true
  };

  try {
    //create static game state
    await set(ref(rtdb, `games/${gameId}/static`), staticData);
    //create dynamic game state
    await set(ref(rtdb, `games/${gameId}/dynamic`), dynamicData);
    // create user
    await set(ref(rtdb, 'players/' + player.id), { currentGameId: gameId });
    // create rps game
    await set(ref(rtdb, 'rpsGames/' + gameId), { ...defaultRpsGame });

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
