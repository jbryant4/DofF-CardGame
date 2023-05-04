import { createContext, useContext, useState } from 'react';
import { CollectorDocument } from '~/models/Collector';
// import { createCollector, findCollector } from '../api/collector';

type CollectorContextType = {
  collector: CollectorDocument | null;
  isLoggedIn: boolean;
  needCreation: boolean;
  createCollector: (
    collector: CollectorDocument
  ) => Promise<CollectorDocument | null>;
  findCollector: (email: string) => Promise<CollectorDocument | null>;
};

const defaultCollectorContext: CollectorContextType = {
  collector: null,
  isLoggedIn: false,
  needCreation: false,
  createCollector: async (collector: CollectorDocument) => null,
  findCollector: async (email: string) => null
};

const CollectorContext = createContext<CollectorContextType>(
  defaultCollectorContext
);

export function useCollector() {
  return useContext(CollectorContext);
}

type Props = {
  children: React.ReactNode;
};

export function CollectorProvider({ children }: Props) {
  const [collector, setCollector] = useState<CollectorDocument | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [needCreation, setNeedCreation] = useState<boolean>(false);

  async function createCollectorHandler(
    collector: CollectorDocument
  ): Promise<CollectorDocument | null> {
    const createdCollector = await createCollector(collector);
    setCollector(createdCollector);
    setIsLoggedIn(true);
    setNeedCreation(false);

    return createdCollector;
  }

  async function findCollectorHandler(
    email: string
  ): Promise<CollectorDocument | null> {
    const foundCollector = await findCollector(email);
    if (foundCollector) {
      setCollector(foundCollector);
      setIsLoggedIn(true);
      setNeedCreation(false);
    } else {
      setCollector(null);
      setIsLoggedIn(false);
      setNeedCreation(true);
    }

    return foundCollector;
  }

  const value: CollectorContextType = {
    collector,
    isLoggedIn,
    needCreation,
    createCollector: createCollectorHandler,
    findCollector: findCollectorHandler
  };

  return (
    <CollectorContext.Provider value={value}>
      {children}
    </CollectorContext.Provider>
  );
}
