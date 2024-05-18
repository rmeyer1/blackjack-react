// Card.js
import React from 'react';

function Card({ card }) {
  return (
    <div className="card">
      {card.rank} of {card.suit}
    </div>
  );
}

export default Card;
