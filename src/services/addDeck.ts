import { Deck } from '~/models/Collector';

export default async function addDeck(deck: Deck) {
  try {
    const response = await fetch(`/api/collector/new-deck`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deck)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to update card: ${error}`);
  }
}
