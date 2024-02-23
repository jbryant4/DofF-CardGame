import { getDoc } from '@firebase/firestore';
import { doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useCardContext } from '~/context/CardContext';
import { Card } from '~/contracts/card';
import useLoadableState from '~/utils/useLoadableState';
import { Collections, db } from '../../firebase';

export default function useGetCard(id) {
  const { globalCards } = useCardContext();
  const cardFromContext = Object.values(globalCards)
    .flat()
    .find(c => c.id === id);
  const { data, setData, isLoading, setLoading, error, setError } =
    useLoadableState(cardFromContext);

  useEffect(() => {
    if (!cardFromContext) {
      setLoading();
      getDoc(doc(db, Collections.Cards, id))
        .then(docSnap => {
          if (docSnap.exists()) {
            setData(docSnap.data() as Card);
          }
        })
        .catch(err => {
          setError(err);
        });
    }
  }, [id, cardFromContext, setLoading, setData, setError]);

  return { card: data, isLoading, error };
}
