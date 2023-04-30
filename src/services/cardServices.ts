import { CardDocument } from '~/models/Card';

export const fetchCards = async (): Promise<CardDocument[]> => {
  const res = await fetch('/api/cards');
  if (!res.ok) {
    throw new Error(`Failed to fetch cards: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();

  return data as CardDocument[];
};
