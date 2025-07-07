import { Card } from '../types/card';

// Basic establishment cards that will form our initial card bank
export const cardBank: Card[] = [
    {
        id: 1001,  // Using 1000+ range for cards
        name: "Wheat Field",
        cost: 1,
        activationNumbers: [1],
        effect: "Get 1 coin from the bank on anyone's turn",
        card_type: "Blue",
        family: "Wheat"
    },
    {
        id: 1002,
        name: "Bakery",
        cost: 1,
        activationNumbers: [2, 3],
        effect: "Get 1 coin from the bank on your turn only",
        card_type: "Green",
        family: "Box"
    },
    {
        id: 1003,
        name: "Sushi Bar",
        cost: 4,
        activationNumbers: [1],
        effect: "Get 1 coin from another player on their turn only",
        card_type: "Red",
        family: "Cup"
    },
    {
        id: 1004,
        name: "Ranch",
        cost: 1,
        activationNumbers: [2],
        effect: "Get 1 coin from the bank on anyone's turn",
        card_type: "Blue",
        family: "Animal"
    }
];

// Helper function to get a card by ID
export const getCardById = (id: number): Card | undefined => {
    return cardBank.find(card => card.id === id);
};

// Helper function to get cards by type
export const getCardsByType = (type: string): Card[] => {
    return cardBank.filter(card => card.card_type === type);
}; 