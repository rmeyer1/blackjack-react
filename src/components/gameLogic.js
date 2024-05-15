import { shuffle } from './Deck';

export const generateDeck = () => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return shuffle(deck);
};

export const dealCards = (deck) => {
  const newDeck = [...deck];
  const playerHand = [newDeck.pop(), newDeck.pop()];
  const dealerHand = [newDeck.pop(), newDeck.pop()];
  return { newDeck, playerHand, dealerHand };
};

export const hit = (deck, hand) => {
  const newDeck = [...deck];
  const newHand = [...hand, newDeck.pop()];
  return { newDeck, newHand };
};

export const stand = (deck, dealerHand) => {
  let newDeck = [...deck];
  let newHand = [...dealerHand];
  while (calculateHandValue(newHand) < 17) {
    newHand.push(newDeck.pop());
  }
  return { newDeck, newHand };
};

export const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;
  for (let card of hand) {
    if (['J', 'Q', 'K'].includes(card.value)) {
      value += 10;
    } else if (card.value === 'A') {
      value += 11;
      aces += 1;
    } else {
      value += parseInt(card.value);
    }
  }
  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }
  return value;
};

export const checkGameStatus = (playerHand, dealerHand) => {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  if (playerValue > 21) return 'Player Busts!';
  if (dealerValue > 21) return 'Dealer Busts!';
  if (playerValue === 21) return 'Player Wins!';
  if (dealerValue === 21) return 'Dealer Wins!';
  if (dealerValue >= 17) {
    if (dealerValue > playerValue) return 'Dealer Wins!';
    if (dealerValue < playerValue) return 'Player Wins!';
    return 'Push!';
  }
  return 'playing';
};
