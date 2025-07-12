import { Card } from '../types/card';
import { cardBank } from './cards';

export interface DeckState {
  cards: Card[];
  currentIndex: number;
}

// Create a deck with 4 copies of each card
export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  
  // Add 4 copies of each card from the cardBank
  for (const card of cardBank) {
    for (let i = 0; i < 4; i++) {
      deck.push({ ...card }); // Create a copy of the card
    }
  }
  
  return deck;
};

// Shuffle the deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck]; // Create a copy to avoid mutating the original
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

// Create and shuffle a new deck
export const createShuffledDeck = (): DeckState => {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);
  
  return {
    cards: shuffledDeck,
    currentIndex: 0
  };
};

// Draw the next card from the deck
export const drawCard = (deckState: DeckState): { card: Card | null, newDeckState: DeckState } => {
  if (deckState.currentIndex >= deckState.cards.length) {
    // Deck is empty, return null
    return {
      card: null,
      newDeckState: deckState
    };
  }
  
  const card = deckState.cards[deckState.currentIndex];
  const newDeckState: DeckState = {
    ...deckState,
    currentIndex: deckState.currentIndex + 1
  };
  
  return {
    card,
    newDeckState
  };
};

// Check if deck is empty
export const isDeckEmpty = (deckState: DeckState): boolean => {
  return deckState.currentIndex >= deckState.cards.length;
};

// Get remaining cards count
export const getRemainingCardsCount = (deckState: DeckState): number => {
  return Math.max(0, deckState.cards.length - deckState.currentIndex);
}; 