import React, { useState, useCallback } from 'react'
import Dice from './components/dice'
import PlayerCards from './components/PlayerCards'
import Shop from './components/Shop'
import Landmarks from './components/Landmarks'
import { Player } from './types/player.ts'
import { cardBank, getCardById } from './data/cards.ts'
import { getLandmarkById } from './data/landmarks.ts'
import './app.css'

function App(): React.JSX.Element {
  // Initialize state with three players
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "Meyer",
      coins: 50,  // Starting coins
      isCurrentTurn: true,
      ownedCards: [1001, 1002],  // Start with Wheat Field for testing
      ownedLandmarks: [2000]  // Start with no landmarks
    },
    {
      id: 2,
      name: "Rose",
      coins: 20,
      isCurrentTurn: false,
      ownedCards: [],  // Start with no cards
      ownedLandmarks: []  // Start with no landmarks
    },
    {
      id: 3,
      name: "Mia",
      coins: 1,
      isCurrentTurn: false,
      ownedCards: [],  // Start with no cards
      ownedLandmarks: []  // Start with no landmarks
    }
  ])

  // Add state for turn actions
  const [hasRolled, setHasRolled] = useState(false);
  const [lastRoll, setLastRoll] = useState<number | null>(null);

  // Add state for the current shop card
  const [currentShopCard, setCurrentShopCard] = useState(() => {
    // Initialize with a random card
    const randomIndex = Math.floor(Math.random() * cardBank.length);
    return cardBank[randomIndex];
  });

  // Get the current player
  const currentPlayer = players.find(player => player.isCurrentTurn) || null;

  // Function to get a new random card for the shop
  const getNewShopCard = () => {
    const randomIndex = Math.floor(Math.random() * cardBank.length);
    return cardBank[randomIndex];
  };

  // Function to handle passing turn to next player
  const passTurn = useCallback(() => {
    setPlayers(currentPlayers => {
      const currentPlayerIndex = currentPlayers.findIndex(player => player.isCurrentTurn);
      const nextPlayerIndex = (currentPlayerIndex + 1) % currentPlayers.length;

      return currentPlayers.map((player, index) => ({
        ...player,
        isCurrentTurn: index === nextPlayerIndex
      }));
    });
    // Reset turn states
    setHasRolled(false);
    setLastRoll(null);
  }, []);

  // Modified dice roll handler
  const handleDiceRoll = (value: number) => {
    if (!hasRolled) {
      setHasRolled(true);
      setLastRoll(value);
      console.log('Dice rolled:', value);
    }
  };

  // Modified buy handler
  const handleBuy = useCallback((cardId: number) => {
    const card = getCardById(cardId);
    if (!card || !currentPlayer || !hasRolled) return;

    setPlayers(currentPlayers => {
      return currentPlayers.map(player => {
        if (player.id === currentPlayer.id) {
          return {
            ...player,
            coins: player.coins - card.cost,
            ownedCards: [...player.ownedCards, cardId]
          };
        }
        return player;
      });
    });

    // Get a new card for the shop
    setCurrentShopCard(getNewShopCard());
    
    // Pass turn after purchase
    passTurn();
  }, [currentPlayer, hasRolled, passTurn]);

  // Landmark purchase handler
  const handleLandmarkPurchase = useCallback((landmarkId: number) => {
    const landmark = getLandmarkById(landmarkId);
    if (!landmark || !currentPlayer || !hasRolled) return;

    // Check if player can afford it
    if (currentPlayer.coins < landmark.cost) return;

    // Check if player already owns this landmark
    if (currentPlayer.ownedLandmarks.includes(landmarkId)) return;

    setPlayers(currentPlayers => {
      return currentPlayers.map(player => {
        if (player.id === currentPlayer.id) {
          return {
            ...player,
            coins: player.coins - landmark.cost,
            ownedLandmarks: [...player.ownedLandmarks, landmarkId]
          };
        }
        return player;
      });
    });

    // Pass turn after landmark purchase
    passTurn();
  }, [currentPlayer, hasRolled, passTurn]);

  return (
    <div>
      <h1>DiceTown</h1>
      
      {/* Display players and their info */}
      <div className="players">
        {players.map(player => (
          <div key={player.id} className={player.isCurrentTurn ? 'player active' : 'player'}>
            <h2>{player.name}</h2>
            <p>Coins: {player.coins}</p>
            {player.isCurrentTurn && (
              <>
                <p>Current Turn</p>
                {lastRoll && <p>Rolled: {lastRoll}</p>}
                <button 
                  className={`pass-turn-button ${!hasRolled ? 'disabled' : ''}`}
                  onClick={passTurn}
                  disabled={!hasRolled}
                >
                  {hasRolled ? 'Pass Turn' : 'Roll First'}
                </button>
              </>
            )}
            <PlayerCards cardIds={player.ownedCards} />
            <Landmarks 
              player={player} 
              onPurchase={handleLandmarkPurchase}
              canPurchase={hasRolled}
              isCurrentPlayer={player.isCurrentTurn}
            />
          </div>
        ))}
      </div>

      <Shop 
        currentCard={currentShopCard} 
        currentPlayer={currentPlayer}
        onBuy={handleBuy}
        canBuy={hasRolled}
      />
      <Dice 
        onRoll={handleDiceRoll}
        disabled={hasRolled}
      />
    </div>
  )
}

export default App
