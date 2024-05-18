// App.js

import React, { useState, useEffect } from 'react';
import { generateDeck, dealCards, hit, stand, checkGameStatus, splitHand } from './components/gameLogic';
import Hand from './components/Hand';
import './App.css';

function App() {
  const [deck, setDeck] = useState([]);
  const [playerHands, setPlayerHands] = useState([[]]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [activeHandIndex, setActiveHandIndex] = useState(0);

  useEffect(() => {
    setDeck(generateDeck());
  }, []);

  const handleDealCards = () => {
    const { newDeck, playerHand, dealerHand } = dealCards(deck);
    setDeck(newDeck);
    setPlayerHands([playerHand]);
    setDealerHand(dealerHand);
    setGameStatus('playing');
    setActiveHandIndex(0);
  };

  const handleHit = () => {
    const { newDeck, newHand } = hit(deck, playerHands[activeHandIndex]);
    const updatedHands = [...playerHands];
    updatedHands[activeHandIndex] = newHand;
    setDeck(newDeck);
    setPlayerHands(updatedHands);
    const status = checkGameStatus(newHand, dealerHand);
    setGameStatus(status);
  };

  const handleStand = () => {
    if (activeHandIndex < playerHands.length - 1) {
      setActiveHandIndex(activeHandIndex + 1);
    } else {
      const { newDeck, newHand } = stand(deck, dealerHand);
      setDeck(newDeck);
      setDealerHand(newHand);
      const status = checkGameStatus(playerHands, newHand);
      setGameStatus(status);
    }
  };

  const handleSplit = () => {
    const { newHands, newDeck } = splitHand(deck, playerHands[activeHandIndex]);
    const updatedHands = [...playerHands];
    updatedHands[activeHandIndex] = newHands[0];
    updatedHands.push(newHands[1]);
    setDeck(newDeck);
    setPlayerHands(updatedHands);
  };

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <button onClick={handleDealCards}>Deal</button>
      <button onClick={handleHit} disabled={gameStatus !== 'playing'}>Hit</button>
      <button onClick={handleStand} disabled={gameStatus !== 'playing'}>Stand</button>
      {playerHands[activeHandIndex].length === 2 && playerHands.length < 3 && (
        <button onClick={handleSplit} disabled={gameStatus !== 'playing'}>Split</button>
      )}
      {playerHands.map((hand, index) => (
        <Hand key={index} cards={hand} title={`Player Hand ${index + 1}`} />
      ))}
      <Hand cards={dealerHand} title="Dealer Hand" />
      <div>Game Status: {gameStatus}</div>
    </div>
  );
}

export default App;
