import { Landmark } from '../types/landmark';

// Landmark cards - each player can own one of each
export const landmarkBank: Landmark[] = [
    {
        id: 2000,
        name: "City Hall",
        cost: 0,
        effect: "Immediately before buying establishments, if you have 0 coins, get 1 from the bank."
    },
    {
        id: 2001,
        name: "Harbor", 
        cost: 2,
        effect: "If the dice total is 10 or more, you may add 2 to the total, on your turn only."
    },
    {
        id: 2002,
        name: "Train Station",
        cost: 4,
        effect: "You may roll 1 or 2 dice."
    },
    {
        id: 2003,
        name: "Shopping Mall",
        cost: 10,
        effect: "Every coin earned from a Cup or Box establishment is worth 2 coins."
    },
    {
        id: 2004,
        name: "Amusement Park",
        cost: 16,
        effect: "If you roll doubles, take another turn after this one."
    },
    {
        id: 2005,
        name: "Radio Tower",
        cost: 22,
        effect: "Once every turn, you can choose to re-roll your dice."
    },
    {
        id: 2006,
        name: "Airport",
        cost: 30,
        effect: "If you build nothing on your turn, you get 10 coins from the bank."
    }
];

// Helper function to get a landmark by ID
export const getLandmarkById = (id: number): Landmark | undefined => {
    for (let i = 0; i < landmarkBank.length; i++) {
        if (landmarkBank[i].id === id) {
            return landmarkBank[i];
        }
    }
    return undefined;
};

// Helper function to get all landmarks
export const getAllLandmarks = (): Landmark[] => {
    return landmarkBank;
}; 