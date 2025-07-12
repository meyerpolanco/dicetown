// Basic card interface with just the essential properties
export interface Card {
  id: number;               // Unique identifier (Cards use IDs starting from 1000)
  name: string;            // Name of the establishment
  cost: number;            // Cost in coins
  activationNumbers: number[];  // Dice numbers that activate this card
  effect: string;            // Description of the card's effect
  card_type: string;         // Type of card (Blue, Red, Purple, Landmark)
  family: string;            // Family of the card (Gear, Animal)
} 