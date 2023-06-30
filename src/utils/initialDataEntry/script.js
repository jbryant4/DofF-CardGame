const fs = require('fs');

// Read the original cards data from a file
const originalCardsData = fs.readFileSync('cards.json');
const cards = JSON.parse(originalCardsData);

// Map over the cards and update the keys that need to be string arrays
const newCards = cards.map(card => {
  if (card.class) {
    card.class = card.class.split(',').map(str => str.trim());
  }
  if (card.preReqs) {
    card.preReqs = card.preReqs.split(',').map(str => str.trim());
  }
  if (card.foundation) {
    card.foundation = card.foundation.split(',').map(str => str.trim());
  }

  return card;
});

// Write the updated cards to a new file
const updatedKeys = JSON.stringify(newCards, null, 2);
fs.writeFileSync('updatedKeys.json', updatedKeys);

console.log('Done!');
