import { useUser } from '@auth0/nextjs-auth0/client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react';
import { CollectorDocument } from '~/models/Collector';
import {
  findCollectorByEmail,
  findCollectorByUserName,
  newCollector
} from '~/services/collectorService';

type CollectorContextType = {
  collector: CollectorDocument | null;
  isLoggedIn: boolean;
  needCreation: boolean;
  createCollector: (payload: CollectorDocument) => Promise<void>;
  fetchCollectorByUserName: (v: string) => Promise<CollectorDocument | null>;
  setCollector: Dispatch<SetStateAction<CollectorDocument | null>>;
};

const defaultCollectorContext: CollectorContextType = {
  collector: null,
  isLoggedIn: false,
  needCreation: false,
  createCollector: async (payload: CollectorDocument) => {},
  fetchCollectorByUserName: async (_value: string) => null,
  setCollector: value => null
};

export const CollectorContext = createContext<CollectorContextType>(
  defaultCollectorContext
);

type Props = {
  children: React.ReactNode;
};

export function CollectorProvider({ children }: Props) {
  const [collector, setCollector] = useState<CollectorDocument | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [needCreation, setNeedCreation] = useState<boolean>(false);
  const [isLoadingCollector, setLoadingCollector] = useState<boolean>(false);
  const { user, isLoading } = useUser();
  const [loadingHome, setLoadingHome] = useState(true);
  // TODO add logic for grabbing user from auth0 and handling states dependant of if no user/ user is admin/ user is returned but we dont have them in our database (create user with default deck) (also if we create admin user pass 'all' into cards)
  const createCollector = async (payload: CollectorDocument): Promise<void> => {
    const collector = await newCollector(payload);
    setCollector(collector);
    setIsLoggedIn(true);
    setNeedCreation(false);
  };

  const fetchCollectorByEmail = async (email: string): Promise<void> => {
    const collector = await findCollectorByEmail(email);
  };

  const fetchCollectorByUserName = async (
    userName: string
  ): Promise<CollectorDocument | null> => await findCollectorByUserName(userName);

  useEffect(() => {
    (async () => {
      if (user) {
        setLoadingHome(true);
        const collector = await findCollectorByEmail(user.email);
        if (collector) {
          setCollector(collector);
          setIsLoggedIn(true);
        } else {
          console.log('pass check');
          setNeedCreation(true);
        }
        setLoadingHome(false);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) setLoadingHome(false);
  }, [isLoading, user]);

  const value = useMemo(
    () => ({
      collector,
      isLoggedIn,
      needCreation,
      createCollector,
      fetchCollectorByUserName,
      setCollector
    }),
    [collector, isLoggedIn, needCreation, setCollector]
  );

  return (
    <CollectorContext.Provider value={value}>
      {loadingHome ? <div>Loading...</div> : <>{children}</>}
    </CollectorContext.Provider>
  );
}
