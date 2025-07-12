import React, { useState, useCallback } from 'react'
import Dice from './components/dice'
import PlayerCards from './components/PlayerCards'
import Shop from './components/Shop'
import Landmarks from './components/Landmarks'
import { Player } from './types/player.ts'
import { cardBank, getCardById } from './data/cards.ts'
import { getLandmarkById } from './data/landmarks.ts'
import { createShuffledDeck, DeckState } from './data/deck.ts'
import { initializeShop, ShopState, purchaseCard } from './data/shop.ts'
import './app.css'
import { Card } from './types/card.ts'

function App(): React.JSX.Element {
  // Initialize state with three players
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "Max",
      coins: 0,
      isCurrentTurn: true,
      ownedCards: [],
      ownedLandmarks: [2003, 2001]
    },
    {
      id: 2,
      name: "Meyer",
      coins: 1,
      isCurrentTurn: false,
      ownedCards: [],
      ownedLandmarks: [2003, 2001]
    },
    {
      id: 3,
      name: "Aiden",
      coins: 0,
      isCurrentTurn: false,
      ownedCards: [],
      ownedLandmarks: [2003]
    }
  ])

  // Add state for turn actions
  const [hasRolled, setHasRolled] = useState(false);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [diceChoice, setDiceChoice] = useState<1 | 2>(1); // Player's choice: 1 or 2 dice

  // Add state for win condition
  const [gameWinner, setGameWinner] = useState<Player | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Add state for deck and shop
  const [deckState, setDeckState] = useState<DeckState>(() => {
    return createShuffledDeck();
  });
  
  const [shopState, setShopState] = useState<ShopState>(() => {
    const initialDeck = createShuffledDeck();
    const { shopState, newDeckState } = initializeShop(initialDeck);
    // Update the deck state with the new state after shop initialization
    setDeckState(newDeckState);
    return shopState;
  });

  // Get the current player
  const currentPlayer = players.find(player => player.isCurrentTurn) || null;
  
  // Test log for dice choice state - removed to prevent issues

  // Function removed - now using deck system

  // Helper function to check if a player has won (owns all 7 landmarks)
  const checkWinCondition = (player: Player): boolean => {
    // A player wins when they own all 7 landmarks (IDs 2001-2007)
    const allLandmarkIds = [2001, 2002, 2003, 2004, 2005, 2006, 2007];
    return allLandmarkIds.every(landmarkId => player.ownedLandmarks.includes(landmarkId));
  };

  // Helper function to get player activation order starting from player before current player
  const getPlayerActivationOrder = (currentPlayerId: number): Player[] => {
    const currentPlayerIndex = players.findIndex(p => p.id === currentPlayerId);
    const playerOrder: Player[] = [];
    
    // Start from the player before the current player
    for (let i = 1; i < players.length; i++) {
      const playerIndex = (currentPlayerIndex - i + players.length) % players.length;
      playerOrder.push(players[playerIndex]);
    }
    
    // Add current player last
    playerOrder.push(players[currentPlayerIndex]);
    
    return playerOrder;
  };

  // Helper functions for coin transfers
  const transferCoins = (fromPlayerId: number, toPlayerId: number, amount: number): void => {
    setPlayers(currentPlayers => {
      // First, find the paying player to calculate actual transfer amount
      const payingPlayer = currentPlayers.find(p => p.id === fromPlayerId);
      if (!payingPlayer) return currentPlayers;
      
      // Calculate actual amount that can be transferred (can't go below 0)
      const actualTransfer = Math.min(amount, payingPlayer.coins);
      
      return currentPlayers.map(player => {
        if (player.id === fromPlayerId) {
          return { ...player, coins: player.coins - actualTransfer };
        } else if (player.id === toPlayerId) {
          return { ...player, coins: player.coins + actualTransfer };
        }
        return player;
      });
    });
  };

  const transferFromBank = (toPlayerId: number, amount: number): void => {
    setPlayers(currentPlayers => {
      return currentPlayers.map(player => {
        if (player.id === toPlayerId) {
          return { ...player, coins: player.coins + amount };
        }
        return player;
      });
    });
  };

  const transferToBank = (fromPlayerId: number, amount: number): void => {
    setPlayers(currentPlayers => {
      return currentPlayers.map(player => {
        if (player.id === fromPlayerId) {
          return { ...player, coins: Math.max(0, player.coins - amount) };
        }
        return player;
      });
    });
  };

  // Card effect execution system
  const executeCardEffect = (card: Card, owner: Player, rollingPlayer: Player, diceValue: number): void => {
    const isOwnerTurn = owner.id === rollingPlayer.id;
    
    // Card effect implementations - expand as needed
    switch (card.id) {
      case 1001: // Wheat Field - Get 1 coin from the bank, on anyone's turn
        transferFromBank(owner.id, 1);
        break;
        
      case 1002: // Bakery - Get 1 coin from the bank, on your turn only
        if (isOwnerTurn) {
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 2 : 1;
          transferFromBank(owner.id, payoutValue);
        }
        break;
        
      case 1003: // Sushi Bar - If you have a Harbor, you get 3 coins from the player who rolled the dice
        if (owner.ownedLandmarks.includes(2002) && !isOwnerTurn) {
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 4 : 3;
          transferCoins(rollingPlayer.id, owner.id, payoutValue);
        }
        break;
        
      case 1004: // Ranch - Get 1 coin from the bank, on anyone's turn
        transferFromBank(owner.id, 1);
        break;
        
      case 1005: // General Store - If you have less than 2 constructed landmarks, get 2 coins from the bank, on your turn only
        if (isOwnerTurn && owner.ownedLandmarks.length < 3) { // Use 3 to account for the City Hall landmark
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 3 : 2;
          transferFromBank(owner.id, payoutValue);
        }
        break;
        
      case 1006: // Cafe - Get 1 coin from the player who rolled the dice
        if (!isOwnerTurn) {
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 2 : 1;
          transferCoins(rollingPlayer.id, owner.id, payoutValue);
        }
        break;
        
      case 1007: // Corn Field - If you have less than 2 constructed landmarks, get 1 coin from the bank, on anyone's turn
        if (owner.ownedLandmarks.length < 3) { // Use 3 to account for the City Hall landmark
          transferFromBank(owner.id, 1);
        }
        break;
        
      case 1008: // Convenience Store - Get 3 coins from the bank, on your turn only
        if (isOwnerTurn) {
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 4 : 3;
          transferFromBank(owner.id, payoutValue);
        }
        break;
        
      case 1009: // Flower Orchard - Get 1 coin from the bank, on anyone's turn
        transferFromBank(owner.id, 1);
        break;
        
      // case 1010: // Demolition Company - If possible, you must demolish one of your constructed landmarks by turning it back over to its unconstructed side. When you do get 8 coins from the bank, on your turn only
        
      //   break;
        
      case 1011: // Forest - Get 1 coin from the bank, on anyone's turn
        transferFromBank(owner.id, 1);
        break;
        
      // case 1012: // Loan Office - When you construct this building, get 5 coins from the bank. When this building is activated, pay 2 coins to the bank, on your turn only
        
      //   break;
        
       case 1013: // French Restaurant - If the player who rolled the dice has 2 or more constructed landmarks, get 5 coins from the player who rolled the dice
        if (rollingPlayer.ownedLandmarks.length >= 3) { // Use 3 to account for the City Hall landmark
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 6 : 5;
          transferCoins(rollingPlayer.id, owner.id, payoutValue);
        }
        break;
        
      case 1014: // Stadium - Get 2 coins from all players, on your turn only
        if (isOwnerTurn) {
          players.forEach(player => {
            if (player.id !== owner.id) {
              transferCoins(player.id, owner.id, 2);
            }
          });
        }
        break;
        
      // case 1015: // TV Station - Take 5 coins from any one player, on your turn only
        
      //   break;
        
      // case 1016: // Business Center - Trade 1 non-purple with another player, on your turn only
        
      //   break;
        
      case 1017: // Flower Shop - Get 1 coin from the bank for each Flower Orchard you own, on your turn only
        if (isOwnerTurn) {
          const payoutValueAddition = owner.ownedLandmarks.includes(2004) ? 1 : 0;
          transferFromBank(owner.id, owner.ownedCards.filter(cardId => getCardById(cardId)?.name === 'Flower Orchard').length + payoutValueAddition);
        }
        break;
        
      case 1018: // Cheese Factory - Get 3 coins from the bank for each Ranch you own, on your turn only
        if (isOwnerTurn) {
          transferFromBank(owner.id, owner.ownedCards.filter(cardId => getCardById(cardId)?.name === 'Ranch').length * 3);
        }
        break;
        
      case 1019: // Pizza Joint - Get 1 coin from the player who rolled the dice
        if (!isOwnerTurn) {
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 2 : 1;
          transferCoins(rollingPlayer.id, owner.id, payoutValue);
        }
        break;
        
      case 1020: // Publisher - Take 1 coin from each player for each Cup and Box card they own, on your turn only
        if (isOwnerTurn) {
          players.forEach(player => {
            if (player.id !== owner.id) {
              const coinsToTake = player.ownedCards.filter(cardId => getCardById(cardId)?.family === 'Cup' || getCardById(cardId)?.family === 'Box').length;
              transferCoins(player.id, owner.id, coinsToTake);
            }
          });
        }
        break;
        
      case 1021: // Vineyard - Get 3 coins from the bank, on anyone's turn
        transferFromBank(owner.id, 3);
        break;
        
      case 1022: // Furniture Factory - Get 3 coins from the bank for each Gear you own, on your turn only
        if (isOwnerTurn) {
          transferFromBank(owner.id, owner.ownedCards.filter(cardId => getCardById(cardId)?.family === 'Gear').length * 3);
        }
        break;
        
      case 1023: // Mackerel Boat - If you have a Harbor, get 3 coins from the bank, on anyone's turn
        if (owner.ownedLandmarks.includes(2002)) {
          transferFromBank(owner.id, 3);
        }
        break;
        
      case 1024: // Hamburguesa Stand - Get 1 coin from the player who rolled the dice
        if (!isOwnerTurn) {
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 2 : 1;
          transferCoins(rollingPlayer.id, owner.id, payoutValue);
        }
        break;
        
      case 1025: // Tax Office - From each player with 10 or more coins, take half of their coins, on your turn only
        if (isOwnerTurn) {

          // Check each player (except the Tax Office owner)
          players.forEach(player => {
            if (player.id !== owner.id && player.coins >= 10) {
              const coinsToTake = Math.floor(player.coins / 2); // Half rounded down
              transferCoins(player.id, owner.id, coinsToTake);
            }
          });
        }
        break;
        
      // case 1026: // Renovation Company - Choose a non-purple card. All cards owned by any player of that type are closed for renovations. Get 1 coin from each player for each of their buildings closed for renovation, on your turn only
        
      //   break;
        
      case 1027: // Mine - Get 5 coins from the bank, on anyone's turn
        transferFromBank(owner.id, 5);
        break;
        
      // case 1028: // Winery - Get 6 coins for each Vineyard you own, on your turn only. Then, close this building for renovation
        
      //   break;
        
      case 1029: // Family Restaurant - Get 2 coins from the player who rolled the dice
        if (!isOwnerTurn) {
          const payoutValue = owner.ownedLandmarks.includes(2004) ? 3 : 2;
          transferCoins(rollingPlayer.id, owner.id, payoutValue);
        }
        break;
        
      // case 1030: // Moving Company - You must give a non-purple card that you own to another player. When you do, get 4 coins from the bank, on your turn only
        
      //   break;
        
      case 1031: // Apple Orchard - Get 3 coins from the bank, on anyone's turn
        transferFromBank(owner.id, 3);
        break;
        
      // case 1032: // Tech Startup - At the end of each of your turns, you may place 1 coin on this card. The total placed here is your investment. When activated, get an amount equal to your investment from all players, on your turn only
        
      //   break;
        
      // case 1033: // Convention Center - You may choose to activate another of your non-purple cards in place of this one, on your turn only. If you do, return this card to the market
        
      //   break;
        
      case 1034: // Soda Bottling Plant - Get 1 coin from the bank for each Cup card owned by players, on your turn only
        if (isOwnerTurn) {
          transferFromBank(owner.id, players.reduce((sum, player) => sum + player.ownedCards.filter(cardId => getCardById(cardId)?.family === 'Cup').length, 0));
        }
        break;
        
      case 1035: // Fruit and Vegetable Market - Get 2 coins from the bank for each Wheat card you own, on your turn only
        if (isOwnerTurn) {
          transferFromBank(owner.id, owner.ownedCards.filter(cardId => getCardById(cardId)?.family === 'Wheat').length * 2);
        }
        break;
        
      case 1036: // Park - Redistribute all players' coins evenly among all players, on your turn only. If there is an uneven amount of coins, take coins from the bank to make up the difference
        if (isOwnerTurn) {
          // Calculate total coins owned by all players
          const totalCoins = players.reduce((sum, player) => sum + player.coins, 0);
          
          // Calculate coins per player (with ceiling function)
          const coinsPerPlayer_temp = totalCoins / players.length;
          const coinsPerPlayer = Math.ceil(coinsPerPlayer_temp);
          
          // Set all players' coins to the calculated amount
          setPlayers(currentPlayers => {
            return currentPlayers.map(player => ({
              ...player,
              coins: coinsPerPlayer
            }));
          });
        }
        break;
        
      case 1037: // Food Warehouse - Get 2 coins from the bank for each Cup card you own, on your turn only
        if (isOwnerTurn) {
          transferFromBank(owner.id, owner.ownedCards.filter(cardId => getCardById(cardId)?.family === 'Cup').length * 2);
        }
        break;
        
      case 1038: // Member's Only Club - If the player who rolled this number has 3 or more constructed landmarks, get all of their coins
        if (rollingPlayer.ownedLandmarks.length >= 4) { // Use 4 to account for the City Hall landmark
          transferCoins(rollingPlayer.id, owner.id, rollingPlayer.coins);
        }
        break;
        
      // case 1039: // Tuna Boat - On anyone's Turn: The current player rolls 2 dice. If you have a harbor you get as many coins as the dice total
        
      //   break;
        
      default:
        console.log(`Card effect not implemented for ${card.name} (ID: ${card.id})`);
    }
  };

  // Main payout processing function
  const processCardActivations = (diceValue: number, rollingPlayerId: number): void => {
    const rollingPlayer = players.find(p => p.id === rollingPlayerId);
    if (!rollingPlayer) return;

    console.log(`Processing activations for dice roll: ${diceValue} by ${rollingPlayer.name}`);
    
    const playerOrder = getPlayerActivationOrder(rollingPlayerId);
    const cardTypes = ['Red', 'Blue', 'Green', 'Purple']; // Processing order
    
    // Process each card type in order
    for (const cardType of cardTypes) {
      console.log(`Processing ${cardType} cards...`);
      
      // Process each player in the correct order
      for (const player of playerOrder) {
        // Get cards of this type that activate on this dice value
        const activatingCards = player.ownedCards
          .map(cardId => getCardById(cardId))
          .filter(card => card && 
                   card.card_type === cardType && 
                   card.activationNumbers.includes(diceValue));
        
        // Execute each card's effect
        for (const card of activatingCards) {
          if (card) {
            console.log(`${player.name}'s ${card.name} activated!`);
            executeCardEffect(card, player, rollingPlayer, diceValue);
          }
        }
      }
    }
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
    setDiceChoice(1); // Reset dice choice to 1 when turn passes
  }, []);

  // Modified dice roll handler
  const handleDiceRoll = (value: number) => {
    if (!hasRolled && currentPlayer) {
      setHasRolled(true);
      setLastRoll(value);
      console.log('Dice rolled:', value);
      
      // Process card activations
      processCardActivations(value, currentPlayer.id);

      if (currentPlayer.coins === 0 && currentPlayer.ownedLandmarks.includes(2001)) { // City Hall effect
        transferFromBank(currentPlayer.id, 1);
      }
    }
  };

  // Modified buy handler
  const handleBuy = useCallback((cardId: number) => {
    const card = getCardById(cardId);
    if (!card || !currentPlayer || !hasRolled) return;

    // Check if player can afford the card
    if (currentPlayer.coins < card.cost) return;

    // Purchase card from shop
    const { success, newShopState, newDeckState, purchasedCard } = purchaseCard(shopState, deckState, cardId);
    
    if (!success || !purchasedCard) return;

    // Update player with new card and reduced coins
    setPlayers(currentPlayers => {
      return currentPlayers.map(player => {
        if (player.id === currentPlayer.id) {
          return {
            ...player,
            coins: player.coins - purchasedCard.cost,
            ownedCards: [...player.ownedCards, purchasedCard.id]
          };
        }
        return player;
      });
    });

    // Update shop and deck state
    setShopState(newShopState);
    setDeckState(newDeckState);
    
    // Pass turn after purchase
    passTurn();
  }, [currentPlayer, hasRolled, passTurn, shopState, deckState]);

  // Landmark purchase handler
  const handleLandmarkPurchase = useCallback((landmarkId: number) => {
    const landmark = getLandmarkById(landmarkId);
    if (!landmark || !currentPlayer || !hasRolled || isGameOver) return;

    // Check if player can afford it
    if (currentPlayer.coins < landmark.cost) return;

    // Check if player already owns this landmark
    if (currentPlayer.ownedLandmarks.includes(landmarkId)) return;

    setPlayers(currentPlayers => {
      return currentPlayers.map(player => {
        if (player.id === currentPlayer.id) {
          const updatedPlayer = {
            ...player,
            coins: player.coins - landmark.cost,
            ownedLandmarks: [...player.ownedLandmarks, landmarkId]
          };
          
          // Check if this player has won after purchasing the landmark
          if (checkWinCondition(updatedPlayer)) {
            setGameWinner(updatedPlayer);
            setIsGameOver(true);
            console.log(`${updatedPlayer.name} has won the game!`);
          }
          
          return updatedPlayer;
        }
        return player;
      });
    });

    // Only pass turn if game hasn't ended
    if (!isGameOver) {
      passTurn();
    }
  }, [currentPlayer, hasRolled, passTurn, isGameOver, checkWinCondition]);

  return (
    <div>
      <h1>DiceTown</h1>
      
      {/* Display winner if game is over */}
      {isGameOver && gameWinner && (
        <div className="game-over">
          <h2>🎉 Game Over! 🎉</h2>
          <h3>{gameWinner.name} wins by owning all 7 landmarks!</h3>
        </div>
      )}
      
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
                  className={`pass-turn-button ${!hasRolled || isGameOver ? 'disabled' : ''}`}
                  onClick={passTurn}
                  disabled={!hasRolled || isGameOver}
                >
                  {isGameOver ? 'Game Over' : hasRolled ? 'Pass Turn' : 'Roll First'}
                </button>
              </>
            )}
            <PlayerCards cardIds={player.ownedCards} />
            <Landmarks 
              player={player} 
              onPurchase={handleLandmarkPurchase}
              canPurchase={hasRolled && !isGameOver}
              isCurrentPlayer={player.isCurrentTurn}
            />
          </div>
        ))}
      </div>

      <Shop 
        shopState={shopState}
        currentPlayer={currentPlayer}
        onBuy={handleBuy}
        canBuy={hasRolled && !isGameOver}
      />
      {/* Only show dice choice if current player owns Train Station */}
      {currentPlayer && currentPlayer.ownedLandmarks.includes(2003) ? (
        <div>
          <p>Train Station allows you to choose: {diceChoice} dice</p>
          <button onClick={() => setDiceChoice(1)}>Choose 1 Die</button>
          <button onClick={() => setDiceChoice(2)}>Choose 2 Dice</button>
        </div>
      ) : (
        <div>
          <p>Rolling: 1 die</p>
        </div>
      )}
      <Dice 
        onRoll={handleDiceRoll}
        disabled={hasRolled || isGameOver}
        diceCount={currentPlayer?.ownedLandmarks.includes(2003) ? diceChoice : 1}
      />
    </div>
  )
}

export default App
