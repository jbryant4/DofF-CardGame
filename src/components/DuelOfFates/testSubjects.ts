import { Duelist } from '~/constants/common/gameTypes';
import { Africa } from '~/constants/starterDecks';

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
