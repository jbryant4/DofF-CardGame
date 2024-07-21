import { Duelist } from '@shared/gameTypes';
import { Africa } from '~/constants/starterDecks';

export const player1: Partial<Duelist> = {
  id: '1',
  userName: 'Monkey',
  deck: Africa
};

export const player2: Partial<Duelist> = {
  id: '2',
  userName: 'Historian',
  deck: Africa
};
