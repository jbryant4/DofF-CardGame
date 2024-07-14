import { CardType, Foundation, Trait } from '@shared/cardTypes';

export type FiltersType = Record<CardType, Trait[] | Foundation[]>;

export const Filters: FiltersType = {
  champion: [
    'divine',
    'explorer',
    'fighter',
    'nobility',
    'revolutionist',
    'scholar'
  ],
  army: [],
  foundation: ['desert', 'earth', 'ocean'],
  resource: []
};
