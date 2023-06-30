import { Foundation, PreReq, CardType, Trait } from '~/models/Card';

export const foundationArray: Foundation[] = ['desert', 'earth', 'ocean'];
export const preReqArray: PreReq[] = [
  '1a',
  '1c',
  '2a',
  '2c',
  '3a',
  '2f',
  ...foundationArray
];

export const traitArray: Trait[] = [
  'divine',
  'explorer',
  'fighter',
  'nobility',
  'revolutionist',
  'scholar'
];

export const cardTypeArray: CardType[] = [
  'resource',
  'army',
  'champion',
  'foundation'
];
