import React from 'react';
import { Player } from '../types/player';
import { ShopState, ShopSlot } from '../data/shop';
import './Shop.css';

interface ShopProps {
  shopState: ShopState;
  currentPlayer: Player | null;
  onBuy: (cardId: number) => void;
  canBuy: boolean;
}

function Shop({ shopState, currentPlayer, onBuy, canBuy }: ShopProps): React.JSX.Element {
  if (!shopState.slots || shopState.slots.length === 0) {
    return <div className="shop">No cards available</div>;
  }

  const handleBuyClick = (cardId: number) => {
    onBuy(cardId);
  };

  return (
    <div className="shop">
      <h2>Shop</h2>
      <div className="shop-grid">
        {shopState.slots.map((slot: ShopSlot) => {
          const canAfford = currentPlayer && currentPlayer.coins >= slot.card.cost;
          const canPurchase = canBuy && canAfford;

          return (
            <div key={slot.card.id} className={`card ${slot.card.card_type.toLowerCase()}`}>
              <div className="card-header">
                <h3>{slot.card.name}</h3>
                {slot.count > 1 && (
                  <div className="stack-count">x{slot.count}</div>
                )}
              </div>
              <p>Cost: {slot.card.cost}</p>
              <p>Type: {slot.card.card_type}</p>
              <p>Family: {slot.card.family}</p>
              <p>Activates on: {slot.card.activationNumbers.join(', ')}</p>
              <p className="effect">{slot.card.effect}</p>
              <button 
                className="buy-button"
                disabled={!canPurchase}
                onClick={() => handleBuyClick(slot.card.id)}
              >
                {!canBuy ? 'Roll dice first' :
                 !canAfford ? `Need ${slot.card.cost} coins` :
                 `Buy for ${slot.card.cost} coins`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop; 