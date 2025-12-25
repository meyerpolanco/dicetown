/**
 * Deck/Market Data
 * 
 * Represents the available cards in the market that players can purchase.
 */

import { cards } from './cards.js';

/**
 * Initialize the deck/market with available cards
 * @returns {Array} Array of card objects available in the market
 */
export function createDeck() {
  // Start with all establishment cards available in the market
  return [...cards];
}

