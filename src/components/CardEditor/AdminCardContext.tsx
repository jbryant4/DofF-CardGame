import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Card } from '~/contracts/card';
import useLoadableState, {
  defaultLoadableState,
  LoadableState
} from '~/utils/useLoadableState';

const blankImageUrl = process.env.NEXT_PUBLIC_BLANK_IMAGE_URL;
const cardImageUrl = process.env.NEXT_PUBLIC_CARD_IMAGE_URL;
export const blankCard: Card = {
  id: '',
  class: [],
  blankUrl: '',
  cardUrl: '',
  description: '',
  effectText: '',
  fileName: '',
  foundation: [],
  gender: '',
  lesson: {
    mediaLinks: [],
    quickNotes: []
  },
  location: '',
  preReqs: [],
  quiz: [],
  hp: 0,
  atk: 0,
  def: 0,
  title: '',
  type: 'champion',
  yearEnd: 0,
  yearStart: 0
};

type Task = 'edit' | 'create' | null;
type AdminCardContextType = {
  apiMessage: LoadableState<string>;
  cardValues: Card;
  task: Task;
  setCardValues: Dispatch<SetStateAction<Card>>;
  setTask: Dispatch<SetStateAction<Task>>;
};

const defaultAdminCardContext: AdminCardContextType = {
  apiMessage: defaultLoadableState(''),
  cardValues: { ...blankCard },
  task: null,
  setCardValues() {},
  setTask() {}
};

export const AdminCardContext = createContext<AdminCardContextType>(
  defaultAdminCardContext
);

type Props = {
  children: React.ReactNode;
};

export function AdminCardProvider({ children }: Props) {
  const [task, setTask] = useState(defaultAdminCardContext.task);
  const [cardValues, setCardValues] = useState<Card>(
    defaultAdminCardContext.cardValues
  );
  const apiMessage = useLoadableState('');

  useEffect(() => {
    if (!cardValues.fileName || cardValues.blankUrl.length > 0) return;
    console.log('in file name reset');
    setCardValues({
      ...cardValues,
      blankUrl: `${blankImageUrl}${cardValues.fileName}.jpg`,
      cardUrl: `${cardImageUrl}${cardValues.fileName}.png`
    });
  }, [cardValues]);

  useEffect(() => {
    if (task) {
      apiMessage.reset();
    }
    console.log('reset card value');
    setCardValues(defaultAdminCardContext.cardValues);
  }, [apiMessage, task]);

  const value = useMemo(
    () => ({
      apiMessage,
      cardValues,
      task,
      setCardValues,
      setTask
    }),
    [apiMessage, cardValues, task]
  );

  return (
    <AdminCardContext.Provider value={value}>
      {children}
    </AdminCardContext.Provider>
  );
}

export function useAdminCardContext() {
  return React.useContext(AdminCardContext);
}
