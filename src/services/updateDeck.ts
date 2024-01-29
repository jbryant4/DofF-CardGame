import { CollectorDocument, Deck } from '~/models/Collector';

export default async function updateDeck(deck: Deck) {
  try {
    const response = await fetch(`/api/collector/edit-deck`, {
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
