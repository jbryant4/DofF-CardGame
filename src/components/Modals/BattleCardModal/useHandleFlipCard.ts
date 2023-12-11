// const handleResourceCardFlip = () => {
//   if (!card) return;
//   const newResources: (DuelingCard | null)[] = boardToUse.foundations.map(
//     foundation =>
//       foundation && foundation.id === card.id
//         ? { ...foundation, faceUp: true }
//         : foundation
//   );
//   setBoardToUse(prevState => ({
//     ...prevState,
//     resources: newResources
//   }));
// };

// const handleMilitaryCardFlip = () => {
//   if (!card) return;
//   if (type === 'champ') {
//     const newChamp: (DuelingCard | null)[] = boardToUse.champions.map(champ =>
//       champ && champ.id === card.id ? { ...champ, faceUp: true } : champ
//     );
//     setBoardToUse(prevState => ({
//       ...prevState,
//       champions: newChamp
//     }));
//   } else {
//     const newChamp: (DuelingCard | null)[] = boardToUse.army.map(soldier =>
//       soldier && soldier.id === card.id
//         ? { ...soldier, faceUp: true }
//         : soldier
//     );
//     setBoardToUse(prevState => ({
//       ...prevState,
//       army: newChamp
//     }));
//   }
// };
