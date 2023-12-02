import { useRouter } from 'next/router';
import { useState } from 'react';
import { Duelist } from '~/constants/common/gameTypes';
import { Africa, Americas } from '~/constants/starterDecks';
import { useGameContext } from '~/context/GameContext';
import { useSocket } from '~/context/SocketContext';
import { PreGameMessages } from '../../../server/preGameHandlers/preGameHandlers';

export default function Home() {
  const [name, setName] = useState('');
  const [deck, setDeck] = useState('');
  const [gameId, setGameId] = useState('');
  const socket = useSocket();
  const router = useRouter();
  const { setLocalPLayer, updatePlayerTwo, updatePlayerOne } = useGameContext();
  const deckToUse = deck === 'Africa' ? Africa : Americas;
  const duelist: Duelist = {
    id: name,
    userName: name,
    deck: deckToUse,
    hitPoints: 10
  };

  const handleJoinGame = () => {
    if (!socket) {
      console.error('no socket connection');

      return;
    }

    // Emit a 'join-game' event to the server with the provided game ID
    socket.emit(PreGameMessages.JoinRoom, gameId, duelist);

    // Handle the response from the server
    socket.on(PreGameMessages.JoinFailed, error => {
      // Handle the error scenario, e.g., display an error message
      console.log(`Join game failed: ${error}`);
    });

    socket.on(PreGameMessages.JoinSuccess, () => {
      updatePlayerTwo({ ...duelist });
      setLocalPLayer('playerTwo');

      router
        .push(`/game/${gameId}`)
        .catch(err => console.log('Navigation Error /game join function'));
    });
  };

  const handleCreateGame = () => {
    if (!socket) {
      console.error('no socket connection');

      return;
    }

    socket.emit(PreGameMessages.NewRoom, duelist);

    socket.on(PreGameMessages.RoomCreated, data => {
      updatePlayerOne({ ...duelist });

      setLocalPLayer('playerOne');
      const roomId = data.roomId;
      console.log(`Game created with ID: ${roomId}`);

      router
        .push(`/game/${roomId}`)
        .catch(err =>
          console.log('Navigation Error /game create function', err)
        );
    });
  };

  const functionToUse =
    gameId.trim().length > 0 ? handleJoinGame : handleCreateGame;

  return (
    <div className="flex flex-col gap-24 h-full items-center justify-center w-full">
      <h1>Duel of Fats</h1>
      <h2>Lobby </h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          functionToUse();
        }}
      >
        <div>
          <label htmlFor="name-select">Select Name:</label>
          <select id="name-select" onChange={e => setName(e.target.value)}>
            <option value="">Select Name</option>
            <option value="Architect">Architect</option>
            <option value="Historian">Historian</option>
          </select>
        </div>

        <div>
          <label htmlFor="deck-select">Select Deck:</label>
          <select id="deck-select" onChange={e => setDeck(e.target.value)}>
            <option value="">Select Deck</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
          </select>
        </div>

        <div>
          <label htmlFor="game-id">Game ID:</label>
          <input
            type="text"
            id="game-id"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={e => setGameId(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" disabled={!deck || !name}>
            {gameId.trim().length > 0 ? 'Join Game' : 'Create Game'}
          </button>
        </div>
      </form>
    </div>
  );
}
