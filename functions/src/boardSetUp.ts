import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Card, DuelingCard } from '../../shared/cardTypes';
import { GameState, RTBoard, RTgameStatic } from '../../shared/gameTypes';

// Utility function to shuffle an array
function shuffleArray(array: Array<DuelingCard>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export const boardSetUp = functions.database
  .ref('/games/{gameId}/dynamic/gameState')
  .onUpdate(async (change, context) => {
    const gameId = context.params.gameId;
    const before = change.before.val();
    const after = change.after.val();

    if (before !== GameState.SetUp && after === GameState.SetUp) {
      const firestore = admin.firestore();
      const database = admin.database();
      try {
        // Retrieve player decks from Realtime Database
        const gameRef = database.ref(`games/${gameId}/static`);
        const gameSnapshot = await gameRef.once('value');
        const gameData = gameSnapshot.val() as RTgameStatic;

        const player1Deck = gameData.player1Deck || [];
        const player2Deck = gameData.player2Deck || [];

        // Combine and deduplicate card IDs
        const combinedDecks = [...new Set([...player1Deck, ...player2Deck])];

        // Create an array of document references
        const cardRefs = combinedDecks.map(cardId =>
          firestore.collection('cards').doc(cardId)
        );

        // Retrieve card details for each unique card ID from Firestore in a batch call
        const cardDocs = await firestore.getAll(...cardRefs);

        // Map card documents to RTCard data
        const cardDataMap: Record<string, DuelingCard> = {};
        cardDocs.forEach(doc => {
          if (doc.exists) {
            const card = doc.data() as Card;
            cardDataMap[doc.id] = {
              id: card.id,
              hp: card.hp,
              atk: card.atk,
              def: card.def,
              effectText: card.effectText,
              type: card.type,
              class: card.class,
              faceUp: false,
              position: 'attack',
              blankUrl: card.blankUrl,
              foundation: card.foundation,
              title: card.title,
              preReqs: card.preReqs
            };
          }
        });

        // Map player decks to RTCard data
        const player1CardData = player1Deck.map(cardId => cardDataMap[cardId]);
        const player2CardData = player2Deck.map(cardId => cardDataMap[cardId]);

        // Shuffle the decks
        const shuffledPlayer1Deck = shuffleArray(player1CardData);
        const shuffledPlayer2Deck = shuffleArray(player2CardData);

        const player1FoundationCards = shuffledPlayer1Deck.filter(
          c => c.type === 'foundation'
        );
        const player1NonFoundationCards = shuffledPlayer1Deck.filter(
          c => c.type !== 'foundation'
        );

        const player2FoundationCards = shuffledPlayer2Deck.filter(
          c => c.type === 'foundation'
        );
        const player2NonFoundationCards = shuffledPlayer2Deck.filter(
          c => c.type !== 'foundation'
        );

        const p1Hand = [
          ...player1FoundationCards.slice(0, 2), // First 2 foundation cards
          ...player1NonFoundationCards.slice(0, 5) // First 5 non-foundation cards
        ];

        const p2Hand = [
          ...player2FoundationCards.slice(0, 2), // First 2 foundation cards
          ...player2NonFoundationCards.slice(0, 5) // First 5 non-foundation cards
        ];

        const p1FoundationDeck = player1FoundationCards.slice(2);
        const p1MainDeck = player1NonFoundationCards.slice(5);

        const p2FoundationDeck = player2FoundationCards.slice(2);
        const p2MainDeck = player2NonFoundationCards.slice(5);
        // Prepare the initial board state with shuffled decks
        const initialBoardState: Partial<RTBoard> = {
          p1MainDeck: p1MainDeck,
          p1FoundationDeck: p1FoundationDeck,
          p1Hand: p1Hand,
          p2MainDeck: p2MainDeck,
          p2FoundationDeck: p2FoundationDeck,
          p2Hand: p2Hand
        };

        // Set the initial board state in Realtime Database
        await admin.database().ref(`board/${gameId}`).set(initialBoardState);

        //Set Game State to Battle
        await admin
          .database()
          .ref(`games/${gameId}/dynamic/gameState`)
          .set(GameState.Battle);
      } catch (error) {
        console.error('Error initializing board state:', error);
      }
    }

    return null;
  });
