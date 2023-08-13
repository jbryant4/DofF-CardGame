// pages/index.js

import { useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';

export default function Home() {
  const [gameId, setGameId] = useState('');

  const handleJoinGame = () => {
    console.log(`Joining game: ${gameId}`);
  };

  const handleCreateGame = () => {
    const id = Math.floor(Math.random() * 10000); // just for example, replace with a better ID generator
    console.log(`Created game: ${id}`);
  };

  const handleAdminGame = () => {
    const id = Math.floor(Math.random() * 10000); // just for example, replace with a better ID generator
    console.log(`Admin game: ${id}`);
    window.location.href = `/game/${id}`;
  };

  return (
    <div className="flex flex-col gap-24 h-full items-center justify-center w-full">
      <h1>Welcome to the Game</h1>
      <input
        type="text"
        value={gameId}
        onChange={e => setGameId(e.target.value)}
        placeholder="Enter game ID"
      />
      <BlueBtn onClick={handleJoinGame}>Join Game</BlueBtn>
      <BlueBtn onClick={handleCreateGame}>Create Game</BlueBtn>
      <BlueBtn onClick={handleAdminGame}>Admin Game</BlueBtn>
    </div>
  );
}
