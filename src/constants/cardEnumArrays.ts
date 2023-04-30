import { Foundation, PreReq, CardType, Trait } from '~/models/Card';

export const foundationArray: Foundation[] = ['desert', 'earth', 'ocean'];
export const preReqArray: PreReq[] = [
  '1A',
  '1C',
  '2A',
  '2C',
  '3A',
  '2F',
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
