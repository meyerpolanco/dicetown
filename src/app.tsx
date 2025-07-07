import React, { useState } from 'react'
import Dice from './components/dice'
import PlayerCards from './components/PlayerCards'
import Shop from './components/Shop'
import { Player } from './types/player.ts'
import { cardBank } from './data/cards.ts'

function App(): React.JSX.Element {
  // Initialize state with three players
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "Meyer",
      coins: 3,  // Starting coins
      isCurrentTurn: true,
      ownedCards: [1001, 1002]  // Start with Wheat Field for testing
    },
    {
      id: 2,
      name: "Rose",
      coins: 2,
      isCurrentTurn: false,
      ownedCards: []  // Start with no cards
    },
    {
      id: 3,
      name: "Mia",
      coins: 1,
      isCurrentTurn: false,
      ownedCards: []  // Start with no cards
    }
  ])

  // Add state for the current shop card
  const [currentShopCard, setCurrentShopCard] = useState(() => {
    // Initialize with a random card
    const randomIndex = Math.floor(Math.random() * cardBank.length);
    return cardBank[randomIndex];
  });

  // Get the current player
  const currentPlayer = players.find(player => player.isCurrentTurn) || null;

  // Add this new function to handle turn changes
  const handleDiceRoll = (value: number) => {
    setPlayers(currentPlayers => {
      // Find the index of the current player
      const currentPlayerIndex = currentPlayers.findIndex(player => player.isCurrentTurn)
      
      // Calculate the next player's index
      const nextPlayerIndex = (currentPlayerIndex + 1) % currentPlayers.length

      // Update all players: set everyone to false except the next player
      return currentPlayers.map((player, index) => ({
        ...player,
        isCurrentTurn: index === nextPlayerIndex
      }))
    })

    // Select a new random card for the shop
    const randomIndex = Math.floor(Math.random() * cardBank.length);
    setCurrentShopCard(cardBank[randomIndex]);
  }

  return (
    <div>
      <h1>DiceTown</h1>
      
      {/* Display players and their info */}
      <div className="players">
        {players.map(player => (
          <div key={player.id} className={player.isCurrentTurn ? 'player active' : 'player'}>
            <h2>{player.name}</h2>
            <p>Coins: {player.coins}</p>
            {player.isCurrentTurn && <p>Current Turn</p>}
            <PlayerCards cardIds={player.ownedCards} />
          </div>
        ))}
      </div>

      <Shop currentCard={currentShopCard} currentPlayer={currentPlayer} />
      <Dice onRoll={handleDiceRoll} />
    </div>
  )
}

export default App
