import { createContext, useContext, useState } from 'react';
import { CollectorDocument } from '~/models/Collector';
import { createCollector } from '~/pages/api/collector';

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

  // TODO add logic for grabbing user from auth0 and handling states dependant of if no user/ user is admin/ user is returned but we dont have them in our database (create user with default deck) (also if we create admin user pass 'all' into cards)

  // const value: CollectorContextType = {
  //   collector,
  //   isLoggedIn,
  //   needCreation,
  //   createCollector: createCollector,
  //   findCollector: findCollectorHandler
  // };

  return (
    <CollectorContext.Provider value={value}>
      {children}
    </CollectorContext.Provider>
  );
}
