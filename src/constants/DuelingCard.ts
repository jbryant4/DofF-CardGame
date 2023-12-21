import CardType from '~/constants/CardType';

type CardFieldsToKeep =
  | 'blankUrl'
  | 'class'
  | 'effectText'
  | 'foundation'
  | 'primaryClass'
  | 'secondaryClass'
  | 'preReqs'
  | 'hp'
  | 'atk'
  | 'def'
  | 'title'
  | 'type';

interface DuelingCard extends Pick<CardType, CardFieldsToKeep> {
  id: string;
  faceUp: boolean;
  position: 'attack' | 'defense';
}
// TODO update types
// ts
// type NonCombatCard = {
//   id: string;
//   // other non-combat related properties...
// };
//
// type CombatCard = NonCombatCard & {
//   atk: number;
//   def: number;
//   hp: number;
//   // other combat related properties...
// };
//
// type Card = NonCombatCard | CombatCard;

export const desiredKeys: (keyof DuelingCard)[] = [
  'blankUrl',
  'class',
  'effectText',
  'foundation',
  'primaryClass',
  'secondaryClass',
  'preReqs',
  'hp',
  'atk',
  'def',
  'title',
  'type',
  'id',
  'faceUp',
  'position'
];

export default DuelingCard;
