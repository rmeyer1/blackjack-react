import React, { useState, useEffect } from 'react';
import { dealCards, hit, stand, checkGameStatus, split, calculateHandValue, doubleDown } from './components/gameLogic';
import { generateDeck } from './components/Deck';
import Hand from './components/Hand';
import './App.css';

function App() {
  const [deck, setDeck] = useState([]);
  const [playerHands, setPlayerHands] = useState([[]]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [activeHandIndex, setActiveHandIndex] = useState(0);
  const [shuffleMessage, setShuffleMessage] = useState('');

  useEffect(() => {
    setDeck(generateDeck());
  }, []);

// Modify the handleDealCards function to ensure it properly initializes the game state after reshuffling
const handleDealCards = () => {
  if (deck.length < 4) {
    setShuffleMessage('Shuffling New Deck');
    setDeck(generateDeck());
    // Reset player and dealer hands to ensure they are in sync with the new deck
    setPlayerHands([[]]);
    setDealerHand([]);
    setGameStatus('playing');
    setActiveHandIndex(0);
    setTimeout(() => {
      setShuffleMessage('');
    }, 5000); // Delay in milliseconds
    return; // Return early to prevent dealing cards from an uninitialized state
  }
  const { newDeck, playerHand, dealerHand } = dealCards(deck);
  setDeck(newDeck);
  setPlayerHands([playerHand]);
  setDealerHand(dealerHand);
  setGameStatus('playing');
  setActiveHandIndex(0);
  setShuffleMessage('');
};

  const handleHit = () => {
    if (deck.length === 0) {
      setShuffleMessage('Shuffling New Deck');
      setDeck(generateDeck());
      // Reset player and dealer hands to ensure they are in sync with the new deck
      setPlayerHands([[]]);
      setDealerHand([]);
      setGameStatus('playing');
      setActiveHandIndex(0);
      setTimeout(() => {
        setShuffleMessage('');
      }, 5000); // Delay in milliseconds
      return; // Return early to prevent dealing cards from an uninitialized state
    }
    const { newDeck, newHand } = hit(deck, playerHands[activeHandIndex]);
    const updatedHands = [...playerHands];
    updatedHands[activeHandIndex] = newHand;
    setDeck(newDeck);
    setPlayerHands(updatedHands);
    const status = checkGameStatus(newHand, dealerHand);
    setGameStatus(status);
    setShuffleMessage('')
  };

  const handleStand = () => {
    if (activeHandIndex < playerHands.length - 1) {
      setActiveHandIndex(activeHandIndex + 1);
    } else {
      if (deck.length === 0) {
        setShuffleMessage('Shuffling New Deck');
        setDeck(generateDeck());
          // Reset player and dealer hands to ensure they are in sync with the new deck
        setPlayerHands([[]]);
        setDealerHand([]);
        setGameStatus('playing');
        setActiveHandIndex(0);
        setTimeout(() => {
          setShuffleMessage('');
        }, 5000); // Delay in milliseconds
        return; // Return early to prevent dealing cards from an uninitialized state
      }
      const { newDeck, newHand } = stand(deck, dealerHand);
      setDeck(newDeck);
      setDealerHand(newHand);
      const status = checkGameStatus(playerHands[activeHandIndex], newHand);
      setGameStatus(status);
    }
    setShuffleMessage('')
  };
  const handleSplit = () => {
    if (deck.length < 2) {
      setShuffleMessage('Shuffling New Deck');
      setDeck(generateDeck());
      // Reset player and dealer hands to ensure they are in sync with the new deck
      setPlayerHands([[]]);
      setDealerHand([]);
      setGameStatus('playing');
      setActiveHandIndex(0);
      setTimeout(() => {
        setShuffleMessage('');
      }, 5000); // Delay in milliseconds
      return; // Return early to prevent dealing cards from an uninitialized state
    }
    const { splitHandOne, splitHandTwo, newDeck } = split(deck, playerHands[activeHandIndex]);
    const updatedHands = [];
    updatedHands[activeHandIndex] = splitHandOne;
    updatedHands.push(splitHandTwo);
    setDeck(newDeck);
    setPlayerHands(updatedHands);
    setShuffleMessage('')
  };
  const handleDoubleDown = () => {
    if (deck.length === 0) {
      setShuffleMessage('Shuffling New Deck');
      setDeck(generateDeck());
        // Reset player and dealer hands to ensure they are in sync with the new deck
      setPlayerHands([[]]);
      setDealerHand([]);
      setGameStatus('playing');
      setActiveHandIndex(0);
      setTimeout(() => {
        setShuffleMessage('');
      }, 5000); // Delay in milliseconds
      return; // Return early to prevent dealing cards from an uninitialized state
    }
    const { newDeck, newHand } = doubleDown(deck, playerHands[activeHandIndex]);
    const updatedHands = [...playerHands];
    updatedHands[activeHandIndex] = newHand;
    setDeck(newDeck);
    setPlayerHands(updatedHands);
    setGameStatus('dealerTurn');
    handleStand(); // After doubling down, the player automatically stands
    setShuffleMessage('')
  };

  const canSplit = () => {
    const hand = playerHands[activeHandIndex];
    return hand.length === 2 && hand[0].rank === hand[1].rank && gameStatus === 'playing';
  };  
  // Modify the calculateHandValue function to safely handle undefined or empty hands
const safeCalculateHandValue = (hand) => {
  if (!hand || hand.length === 0 || hand.some(card => card === undefined)) {
    return 0; // Return 0 or an appropriate default value if the hand is not valid
  }
  return calculateHandValue(hand);
};

return (
  <div className="App">
    <h1>Blackjack</h1>
    <button className="p-2 mr-2 border border-gray-300 rounded" onClick={handleDealCards}>Deal</button>
    <button className="p-2 mr-2 border border-gray-300 rounded" onClick={handleHit} disabled={gameStatus !== 'playing'}>Hit</button>
    <button className="p-2 mr-2 border border-gray-300 rounded" onClick={handleStand} disabled={gameStatus !== 'playing'}>Stand</button>
    <button className="p-2 mr-2 border border-gray-300 rounded" onClick={handleDoubleDown} disabled={gameStatus !== 'playing'}>Double</button>
    {playerHands[activeHandIndex].length === 2 && playerHands.length < 3 && (
      <button className="p-2 mr-2 border border-gray-300 rounded" onClick={handleSplit} disabled={!canSplit()}>Split</button>
    )}
    {playerHands.map((hand, index) => (
      <div key={index}>
        <Hand cards={hand} title={`Player Hand ${index + 1}`} />
        <div>Player Value: {safeCalculateHandValue(hand)}</div>
      </div>
    ))}
    <Hand cards={dealerHand} title="Dealer Hand" />
    <div>Dealer Value: {safeCalculateHandValue(dealerHand)}</div>
    <div>Game Status: {gameStatus}</div>
    {shuffleMessage && <div>{shuffleMessage}</div>}
  </div>
);
}

export default App;
