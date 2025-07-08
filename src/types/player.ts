// Define the basic player structure
export interface Player {
  id: number;          // Unique identifier for each player
  name: string;        // Player's name
  coins: number;       // Player's current coin count
  isCurrentTurn: boolean;  // Whether it's this player's turn
  ownedCards: number[];    // Array of card IDs owned by the player
  ownedLandmarks: number[];  // Array of landmark IDs owned by the player
}
