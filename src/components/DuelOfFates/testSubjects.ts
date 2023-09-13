import { Africa } from '~/constants/starterDecks';
import { Duelist } from '~/context/GameContext';

export const playerOne: Partial<Duelist> = {
  id: '1',
  userName: 'Monkey',
  deck: Africa
};

export const playerTwo: Partial<Duelist> = {
  id: '2',
  userName: 'Historian',
  deck: Africa
};
