import { CardDocument } from '~/models/Card';

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

interface DuelingCard extends Pick<CardDocument, CardFieldsToKeep> {
  id: string;
  faceUp: boolean;
  position: 'attack' | 'defense';
}

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
