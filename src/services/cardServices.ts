import { CardDocument } from '~/models/Card';

export const fetchCards = async (): Promise<CardDocument[]> => {
  const res = await fetch('/api/cards');
  if (!res.ok) {
    throw new Error(`Failed to fetch cards: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();

  return data as CardDocument[];
};

export const newCard = async cardData => {
  try {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error creating card:', error);
    throw new Error('Failed to create card');
  }
};

export const updateCard = async cardData => {
  try {
    const response = await fetch(`/api/cards`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error updating card:', error);
    throw new Error('Failed to update card');
  }
};
