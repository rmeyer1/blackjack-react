// Hand.js
import React from 'react';
import Card from './Card';

function Hand({ cards, title }) {
  return (
    <div className="hand">
      <h2>{title}</h2>
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
}

export default Hand;
