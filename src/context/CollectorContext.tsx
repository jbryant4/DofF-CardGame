import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingCardCircle from '@/LoadingCardCircle';
import { Collections, db, auth } from '@firebaseUiConfig';
import {
  Collector,
  ContextCollector,
  defaultCollector
} from '~/contracts/collector';
import useLoadableState, {
  defaultLoadableState,
  LoadableState
} from '~/utils/useLoadableState';

type CollectorContextType = {
  collector: LoadableState<Collector | null>;
  isLoggedIn: boolean;
};

const defaultCollectorContext: CollectorContextType = {
  collector: defaultLoadableState<Collector | null>(null),
  isLoggedIn: false
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
      const collector = docSnap.data();

      return collector as Collector;
    } else {
      //TODO Make new doc
      await setDoc(docRef, { ...defaultCollector, id: uid }).then(v =>
        console.log(v)
      );
    }
  } catch (error) {
    console.error('Error getting document:', error);
  }
}

export function CollectorProvider({ children }: Props) {
  const [user, loading, error] = useAuthState(auth);
  const collector = useLoadableState<Collector | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const [needsUserName, setNeedsUserName] = useState<boolean>(false);

  useEffect(() => {
    if (collector.data == null) return;
    setIsLoggedIn(true);
  }, [collector]);

  useEffect(() => {
    if (collector.data) return;

    if (!loading && !user && router.pathname !== '/gateway') {
      void router.push('/gateway');
    }

    if (user && !collector.data) {
      collector.setLoading();

      getCollectorData(user.uid).then(collectorData => {
        if (collectorData === undefined) {
          collector.setLoaded();

          return;
        }

        collector.setData(collectorData);
      });
    }
  }, [user, loading, router, collector]);

  useEffect(() => {
    if (collector.isLoaded) {
      setNeedsUserName(Boolean(collector.data?.userName));
    }
  }, [collector.data?.userName, collector.isLoaded]);

  const value = useMemo(
    () => ({
      collector,
      isLoggedIn
    }),
    [collector, isLoggedIn]
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
  return useCollectorContext().collector?.data?.cards ?? [];
}
