import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingCardCircle from '@/LoadingCardCircle';
import { ContextCollector } from '~/contracts/collector';
import { auth, Collections, db } from '../../firebase';

type CollectorContextType = {
  collector: ContextCollector | null;
  isLoggedIn: boolean;
  setCollector: Dispatch<SetStateAction<ContextCollector | null>>;
};

const defaultCollectorContext: CollectorContextType = {
  collector: null,
  isLoggedIn: false,
  setCollector: _value => null
};

export const CollectorContext = createContext<CollectorContextType>(
  defaultCollectorContext
);

type Props = {
  children: React.ReactNode;
};

async function getCollectorData(uid: string) {
  try {
    const docRef = doc(db, Collections.Collectors, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { id, ...dataWithoutId } = docSnap.data();

      return dataWithoutId as ContextCollector;
    } else {
      //TODO Make new doc
      console.error('No such document!');

      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
  }
}

export function CollectorProvider({ children }: Props) {
  const [user, loading, error] = useAuthState(auth);
  const [collector, setCollector] = useState<ContextCollector | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!collector) return;
    setIsLoggedIn(true);
  }, [collector]);

  useEffect(() => {
    if (collector) return;

    if (!loading && !user && router.pathname !== '/gateway') {
      void router.push('/gateway');
    }

    if (user && !collector) {
      console.log();
      getCollectorData(user.uid).then(collectorData => {
        if (collectorData === undefined) return;

        setCollector(collectorData);
      });
    }
  }, [user, loading, router, collector]);

  const value = useMemo(
    () => ({
      collector,
      isLoggedIn,
      setCollector
    }),
    [collector, isLoggedIn, setCollector]
  );

  if (loading) {
    return (
      <div className="bg-gray-400 flex h-screen items-center justify-center w-full">
        <LoadingCardCircle />
      </div>
    );
  }

  return (
    <CollectorContext.Provider value={value}>
      {children}
    </CollectorContext.Provider>
  );
}

export function useCollectorContext() {
  const context = useContext(CollectorContext);

  if (!context) {
    throw new Error(
      'useCollectorContext must be used within a CollectorProvider'
    );
  }

  return context;
}

export function useUnlockedCards() {
  return useCollectorContext().collector?.cards;
}
