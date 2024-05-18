// Deck.js
export const generateDeck = () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
  
    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push({ suit, rank });
      }
    }
  
    return shuffle(deck);
  };
  
  export const shuffle = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };
  
  export const dealCards = (deck) => {
    const newDeck = [...deck];
    const playerHand = [newDeck.pop(), newDeck.pop()];
    const dealerHand = [newDeck.pop(), newDeck.pop()];
    return { newDeck, playerHand, dealerHand };
  };
  