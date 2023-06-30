import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState
} from 'react';
import { CollectorDocument } from '~/models/Collector';
import {
  findCollectorByUserName,
  newCollector
} from '~/services/collectorService';

type CollectorContextType = {
  collector: CollectorDocument | null;
  isLoggedIn: boolean;
  needCreation: boolean;
  createCollector: (payload: Partial<CollectorDocument>) => Promise<void>;
  fetchCollectorByUserName: (v: string) => Promise<CollectorDocument | null>;
  setCollector: Dispatch<SetStateAction<CollectorDocument | null>>;
};

const defaultCollectorContext: CollectorContextType = {
  collector: null,
  isLoggedIn: false,
  needCreation: false,
  createCollector: async _payload => {},
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
  const [collector, setCollector] = useState<CollectorDocument | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [needCreation, setNeedCreation] = useState<boolean>(false);
  // const [isLoadingCollector, setLoadingCollector] = useState<boolean>(false);
  // const { user, isLoading } = useUser();
  //TODO swap this state back to teuw when we want to use the sign in page
  const [loadingHome, setLoadingHome] = useState(false);
  // TODO add logic for grabbing user from auth0 and handling states dependant of if no user/ user is admin/ user is returned but we dont have them in our database (create user with default deck) (also if we create admin user pass 'all' into cards)
  const createCollector = async (payload): Promise<void> => {
    const data = await newCollector(payload);
    setCollector(data);
    setIsLoggedIn(true);
    setNeedCreation(false);
  };

  // const fetchCollectorByEmail = async (email: string): Promise<void> => {
  //   const collectorData = await findCollectorByEmail(email);
  // };

  const fetchCollectorByUserName = async (
    userName: string
  ): Promise<CollectorDocument | null> => findCollectorByUserName(userName);

  // useEffect(() => {
  //   (async () => {
  //     if (user) {
  //       setLoadingHome(true);
  //       const collector = await findCollectorByEmail(user.email);
  //       if (collector) {
  //         setCollector(collector);
  //         setIsLoggedIn(true);
  //       } else {
  //         console.log('pass check');
  //         setNeedCreation(true);
  //       }
  //       setLoadingHome(false);
  //     }
  //   })();
  // }, [user]);

  // useEffect(() => {
  //   if (!isLoading && !user) setLoadingHome(false);
  // }, [isLoading, user]);

  const value = useMemo(
    () => ({
      collector,
      isLoggedIn,
      needCreation,
      createCollector,
      fetchCollectorByUserName,
      setCollector,
      setIsLoggedIn
    }),
    [collector, isLoggedIn, needCreation, setCollector]
  );

  return (
    <CollectorContext.Provider value={value}>
      {loadingHome ? <div>Loading...</div> : <>{children}</>}
    </CollectorContext.Provider>
  );
}
