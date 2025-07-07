import React from 'react';
import { Card } from '../types/card';
import { Player } from '../types/player';
import './Shop.css';

interface ShopProps {
  currentCard: Card | null;
  currentPlayer: Player | null;
  onBuy: (cardId: number) => void;
  canBuy: boolean;
}

function Shop({ currentCard, currentPlayer, onBuy, canBuy }: ShopProps): React.JSX.Element {
  if (!currentCard) {
    return <div className="shop">No card available</div>;
  }

  const canAfford = currentPlayer && currentPlayer.coins >= currentCard.cost;
  const canPurchase = canBuy && canAfford;

  const handleBuyClick = () => {
    if (canPurchase && currentCard) {
      onBuy(currentCard.id);
    }
  };

  return (
    <div className="shop">
      <h2>Shop</h2>
      <div className={`card ${currentCard.card_type.toLowerCase()}`}>
        <h3>{currentCard.name}</h3>
        <p>Cost: {currentCard.cost}</p>
        <p>Type: {currentCard.card_type}</p>
        <p>Family: {currentCard.family}</p>
        <p>Activates on: {currentCard.activationNumbers.join(', ')}</p>
        <p>{currentCard.effect}</p>
        <button 
          className="buy-button"
          disabled={!canPurchase}
          onClick={handleBuyClick}
        >
          {!canBuy ? 'Roll dice first' :
           !canAfford ? `Need ${currentCard.cost} coins` :
           `Buy for ${currentCard.cost} coins`}
        </button>
      </div>
    </div>
  );
}

export default Shop; 