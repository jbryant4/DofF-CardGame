export type Foundation = 'desert' | 'earth' | 'ocean';
export type PreReq = '1a' | '1c' | '2a' | '2c' | '3a' | '2f' | Foundation;
export type Trait =
  | 'divine'
  | 'explorer'
  | 'fighter'
  | 'nobility'
  | 'revolutionist'
  | 'scholar';

export type CardType = 'resource' | 'foundation' | 'army' | 'champion';

export const Foundations: Set<Foundation> = new Set([
  'desert',
  'earth',
  'ocean'
]);

export const PreReqs: Set<PreReq> = new Set([
  '1a',
  '1c',
  '2a',
  '2c',
  '3a',
  '2f',
  ...Foundations
]);

export const Traits: Set<Trait> = new Set([
  'divine',
  'explorer',
  'fighter',
  'nobility',
  'revolutionist',
  'scholar'
]);
export const CardTypes: Set<CardType> = new Set([
  'resource',
  'foundation',
  'army',
  'champion'
]);
export type LessonType = {
  mediaLinks: string[];
  quickNotes: string[];
};

export type Question = {
  id?: string;
  prompt: string;
  options: string[];
  answer: string | string[];
};

export type Card = {
  id: string;
  blankUrl: string;
  cardUrl: string;
  class: Trait[];
  description: string;
  effectText: string;
  gender: string;
  fileName: string;
  foundation: Foundation[];
  lesson: LessonType;
  location?: string;
  primaryClass?: Trait;
  secondaryClass?: Trait;
  preReqs: PreReq[];
  quiz: Question[];
  hp: number;
  atk: number;
  def: number;
  title: string;
  type: CardType;
  yearStart: number;
  yearEnd?: number;
};

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

export type DuelingCard = Pick<Card, CardFieldsToKeep> & {
  id: string;
  faceUp: boolean;
  position: 'attack' | 'defense';
};

export function makeDefaultDuelingCard(card: Card): DuelingCard {
  return { ...card, faceUp: true, position: 'attack' };
}
// UPLOAD ALL CARD WHEN WE NEED TO UPDATE ALL CARDS
// async function uploadCardsToFirestore(e) {
//   e.preventDefault();
//   const batch = writeBatch(db);
//
//   cardsToFireBase.forEach(card => {
//     const completeCard = { ...defaultFireCard, ...card };
//     const docRef = doc(db, 'cards', completeCard.id); // use provided id
//     batch.set(docRef, completeCard);
//   });
//
//   // Commit the batch
//   try {
//     await batch.commit().then(() => {
//       console.log('Batch write completed.');
//     });
//   } catch (err) {
//     console.log('Error uploading batch', err);
//   }
// }
