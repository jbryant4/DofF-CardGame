import DuelingCard from '~/constants/DuelingCard';

function shuffleDeck(deck: DuelingCard[]): DuelingCard[] {
  let shuffled = [...deck]; // Clone the deck to avoid modifying the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }

  return shuffled;
}

export default shuffleDeck;
