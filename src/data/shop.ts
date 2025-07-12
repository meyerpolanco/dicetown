import { Card } from '../types/card';
import { DeckState, drawCard } from './deck';

export interface ShopSlot {
  card: Card;
  count: number; // Number of this card in the shop (stacked)
}

export interface ShopState {
  slots: ShopSlot[]; // Array of up to 10 unique cards
}

// Initialize shop by drawing cards from deck until we have 10 unique cards
export const initializeShop = (deckState: DeckState): { shopState: ShopState, newDeckState: DeckState } => {
  const slots: ShopSlot[] = [];
  let currentDeckState = deckState;
  
  // Keep drawing cards until we have 10 unique cards in the shop
  while (slots.length < 10) {
    const { card, newDeckState } = drawCard(currentDeckState);
    currentDeckState = newDeckState;
    
    // If deck is empty, break
    if (!card) {
      break;
    }
    
    // Check if this card is already in the shop
    const existingSlot = slots.find(slot => slot.card.id === card.id);
    
    if (existingSlot) {
      // Card already exists, increment the stack count
      existingSlot.count++;
    } else {
      // New card, add it to the shop
      slots.push({
        card: card,
        count: 1
      });
    }
  }
  
  return {
    shopState: { slots },
    newDeckState: currentDeckState
  };
};

// Purchase a card from the shop
export const purchaseCard = (
  shopState: ShopState, 
  deckState: DeckState, 
  cardId: number
): { 
  success: boolean, 
  newShopState: ShopState, 
  newDeckState: DeckState,
  purchasedCard: Card | null 
} => {
  const slotIndex = shopState.slots.findIndex(slot => slot.card.id === cardId);
  
  if (slotIndex === -1) {
    // Card not found in shop
    return {
      success: false,
      newShopState: shopState,
      newDeckState: deckState,
      purchasedCard: null
    };
  }
  
  const slot = shopState.slots[slotIndex];
  const purchasedCard = slot.card;
  let newSlots = [...shopState.slots];
  let newDeckState = deckState;
  
  if (slot.count > 1) {
    // Card is stacked, just reduce the count
    newSlots[slotIndex] = {
      ...slot,
      count: slot.count - 1
    };
  } else {
    // Card is not stacked, remove it and draw a replacement
    newSlots.splice(slotIndex, 1);
    
    // Draw replacement cards until we have 10 unique cards again or deck is empty
    while (newSlots.length < 10) {
      const { card, newDeckState: updatedDeckState } = drawCard(newDeckState);
      newDeckState = updatedDeckState;
      
      if (!card) {
        // Deck is empty, can't replace
        break;
      }
      
      // Check if this card is already in the shop
      const existingSlot = newSlots.find(slot => slot.card.id === card.id);
      
      if (existingSlot) {
        // Card already exists, increment the stack count
        existingSlot.count++;
        // Continue the loop to try to find a unique card
      } else {
        // New card, add it to the shop
        newSlots.push({
          card: card,
          count: 1
        });
        // We've added a new unique card, so we can break
        break;
      }
    }
  }
  
  return {
    success: true,
    newShopState: { slots: newSlots },
    newDeckState: newDeckState,
    purchasedCard: purchasedCard
  };
};

// Get a card from shop by ID
export const getShopCard = (shopState: ShopState, cardId: number): ShopSlot | null => {
  const slot = shopState.slots.find(slot => slot.card.id === cardId);
  return slot || null;
};

// Check if shop has a specific card
export const hasCard = (shopState: ShopState, cardId: number): boolean => {
  return shopState.slots.some(slot => slot.card.id === cardId);
}; 