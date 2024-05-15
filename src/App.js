import React, { useState, useEffect } from 'react';
import { generateDeck, dealCards, hit, stand, checkGameStatus } from './components/gameLogic';
import Hand from './components/Hand';
import './App.css';

function App() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');

  useEffect(() => {
    setDeck(generateDeck());
  }, []);

  const handleDealCards = () => {
    const { newDeck, playerHand, dealerHand } = dealCards(deck);
    setDeck(newDeck);
    setPlayerHand(playerHand);
    setDealerHand(dealerHand);
    setGameStatus('playing');
  };

  const handleHit = () => {
    const { newDeck, newHand } = hit(deck, playerHand);
    setDeck(newDeck);
    setPlayerHand(newHand);
    const status = checkGameStatus(newHand, dealerHand);
    setGameStatus(status);
  };

  const handleStand = () => {
    const { newDeck, newHand } = stand(deck, dealerHand);
    setDeck(newDeck);
    setDealerHand(newHand);
    const status = checkGameStatus(playerHand, newHand);
    setGameStatus(status);
  };

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <button onClick={handleDealCards}>Deal</button>
      <button onClick={handleHit} disabled={gameStatus !== 'playing'}>Hit</button>
      <button onClick={handleStand} disabled={gameStatus !== 'playing'}>Stand</button>
      <Hand cards={playerHand} title="Player Hand" />
      <Hand cards={dealerHand} title="Dealer Hand" />
      <div>Game Status: {gameStatus}</div>
    </div>
  );
}

export default App;
