import React from 'react';

function Card({ suit, value }) {
  return (
    <div className="card">
      {value} of {suit}
    </div>
  );
}

export default Card;