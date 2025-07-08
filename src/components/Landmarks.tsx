import React from 'react';
import { Player } from '../types/player';
import { getAllLandmarks } from '../data/landmarks';
import './Landmarks.css';

interface LandmarksProps {
  player: Player;
  onPurchase: (landmarkId: number) => void;
  canPurchase: boolean;
  isCurrentPlayer: boolean;
}

function Landmarks({ player, onPurchase, canPurchase, isCurrentPlayer }: LandmarksProps): React.JSX.Element {
  const allLandmarks = getAllLandmarks();

  const handlePurchase = (landmarkId: number) => {
    onPurchase(landmarkId);
  };

  return (
    <div className="landmarks">
      <h3>Landmarks</h3>
      <div className="landmark-list">
        {allLandmarks.map(landmark => {
          // Check if this player owns this landmark
          const isOwned = player.ownedLandmarks.includes(landmark.id);
          const canAfford = player.coins >= landmark.cost;
          const canBuy = isCurrentPlayer && canPurchase && !isOwned && canAfford;

          return (
            <div 
              key={landmark.id}
              className={`landmark-card ${isOwned ? 'owned' : 'available'}`}
            >
              <h4>{landmark.name}</h4>
              <p>Cost: {landmark.cost}</p>
              <p className="effect">{landmark.effect}</p>
              
              {isOwned ? (
                <div className="owned-indicator">✅ OWNED</div>
              ) : (
                <button 
                  className="purchase-button"
                  onClick={() => handlePurchase(landmark.id)}
                  disabled={!canBuy}
                >
                  {!isCurrentPlayer ? 'Not your turn' :
                   !canPurchase ? 'Roll dice first' :
                   !canAfford ? `Need ${landmark.cost} coins` :
                   `Buy for ${landmark.cost} coins`}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Landmarks; 