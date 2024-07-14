import { Card, DuelingCard } from '@shared/cardTypes';

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
