import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { CollectorDocument } from '~/models/Collector';
import { findCollectorByUserName } from '~/services/collectorService';

export type Collector = Pick<
  CollectorDocument,
  'isAdmin' | 'cards' | 'decks' | 'userName'
>;

type CollectorContextType = {
  collector: Collector | null;
  isLoggedIn: boolean;
  fetchCollectorByUserName: (v: string) => Promise<Collector | null>;
  setCollector: Dispatch<SetStateAction<Collector | null>>;
};

const defaultCollectorContext: CollectorContextType = {
  collector: null,
  isLoggedIn: false,
  fetchCollectorByUserName: async (_value: string) => null,
  setCollector: _value => null
};

export const CollectorContext = createContext<CollectorContextType>(
  defaultCollectorContext
);

type Props = {
  children: React.ReactNode;
};

export function CollectorProvider({ children }: Props) {
  const [collector, setCollector] = useState<Collector | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // const fetchCollectorByEmail = async (email: string): Promise<void> => {
  //   const collectorData = await findCollectorByEmail(email);
  // };

  const fetchCollectorByUserName = async (
    userName: string
  ): Promise<CollectorDocument | null> => findCollectorByUserName(userName);

  useEffect(() => {
    if (!collector) return;
    setIsLoggedIn(true);
  }, [collector]);

  const value = useMemo(
    () => ({
      collector,
      isLoggedIn,
      fetchCollectorByUserName,
      setCollector
    }),
    [collector, isLoggedIn, setCollector]
  );

  return (
    <CollectorContext.Provider value={value}>
      {children}
    </CollectorContext.Provider>
  );
}

export const useCollector = () => {
  const context = useContext(CollectorContext);

  if (!context) {
    throw new Error('useCollector must be used within a CollectorProvider');
  }

  return context;
};
