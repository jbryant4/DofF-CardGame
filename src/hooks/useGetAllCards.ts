import { useEffect, useState } from 'react';
import { CardDocument } from '~/models/Card';
import { fetchCards } from '~/services/cardServices';

type GetAllCardsResult = {
  cards: CardDocument[];
  isLoading: boolean;
  error: Error | null;
};

const useGetAllCards = (): GetAllCardsResult => {
  const [cards, setCards] = useState<CardDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCards();
        setCards(data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { cards, isLoading, error };
};

export default useGetAllCards;
