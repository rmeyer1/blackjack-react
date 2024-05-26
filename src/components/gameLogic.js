
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
export const split = (deck, playerHand) => {
    const newDeck = [...deck]
    if (playerHand.length === 2 && playerHand[0].rank === playerHand[1].rank && playerHand.length < 3) {
      // Create a new hands with one of the split cards
      const splitHandOne = [playerHand[0], newDeck.pop()]
      const splitHandTwo = [playerHand[1], newDeck.pop()]
      // Deal one new card to each of the split hands
      return { splitHandOne, splitHandTwo, newDeck }
    }
  };
  export const doubleDown = (deck, hand) => {
    const newDeck = [...deck];
    const newHand = [...hand, newDeck.pop()]; // Player gets exactly one more card
    return { newDeck, newHand };
  };

export const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;
  for (let card of hand) {
    if (['Jack', 'Queen', 'King'].includes(card.rank)) {
      value += 10;
    } else if (card.rank === 'Ace') {
      value += 11;
      aces += 1;
    } else {
      value += parseInt(card.rank);
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
  if (playerValue === 21 && dealerValue !== 21) return 'Player Wins!';
  if (dealerValue === 21 && playerValue !== 21) return 'Dealer Wins!';
  if (dealerValue >= 17) {
    if (dealerValue > playerValue) return 'Dealer Wins!';
    if (dealerValue < playerValue) return 'Player Wins!';
    return 'Push!';
  }
  return 'playing';
};

  

