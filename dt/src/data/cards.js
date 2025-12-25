/**
 * Card Data Template
 * 
 * Each card should have the following properties:
 * - id: Unique identifier for the card (number)
 * - name: The name of the card (string)
 * - cost: Cost to purchase the card (number)
 * - activation_numbers: Array of dice roll numbers that activate this card (array of numbers)
 * - effect: The effect of the card (string)
 * - card_type: Type of card - one of: 'red', 'blue', 'green', 'purple', 'landmark'
 * - family: The family of the card (string)
 */

export const cards = [
  // Example Blue Card (Primary Industry - activates on any player's turn)
  {
    id: 1001,  // Using 1000+ range for cards
    name: "Wheat Field",
    cost: 1,
    activationNumbers: [1],
    effect: "Get 1 coin from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Wheat"
    },
    {
    id: 1002,
    name: "Bakery",
    cost: 1,
    activationNumbers: [2, 3],
    effect: "Get 1 coin from the bank, on your turn only.",
    card_type: "Green",
    family: "Box"
    },
    {
    id: 1003,
    name: "Sushi Bar",
    cost: 4,
    activationNumbers: [1],
    effect: "If you have a Harbor, you get 3 coins from the player who rolled the dice.",
    card_type: "Red",
    family: "Cup"
    },
    {
    id: 1004,
    name: "Ranch",
    cost: 1,
    activationNumbers: [2],
    effect: "Get 1 coin from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Animal"
    },
    {
    id: 1005,
    name: "General Store",
    cost: 0,
    activationNumbers: [2],
    effect: "If you have less than 2 constructed landmarks, get 2 coins from the bank, on your turn only.",
    card_type: "Green",
    family: "Box"
    },
    {
    id: 1006,
    name: "Cafe",
    cost: 2,
    activationNumbers: [3],
    effect: "Get 1 coin from the player who rolled the dice.",
    card_type: "Red",
    family: "Cup"
    },
    {
    id: 1007,
    name: "Corn Field",
    cost: 2,
    activationNumbers: [3, 4],
    effect: "If you have less than 2 constructed landmarks, get 1 coin from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Wheat"
    },
    {
    id: 1008,
    name: "Convenience Store",
    cost: 2,
    activationNumbers: [4],
    effect: "Get 3 coins from the bank, on your turn only.",
    card_type: "Green",
    family: "Box"
    },
    {
    id: 1009,
    name: "Flower Orchard",
    cost: 2,
    activationNumbers: [4],
    effect: "Get 1 coin from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Wheat"
    },
    {
    id: 1010,
    name: "Demolition Company",
    cost: 2,
    activationNumbers: [4],
    effect: "If possible, you must demolish one of your constructed landmarks by turning it back over to its unconstructed side. When you do get 8 coins from the bank, on your turn only.",
    card_type: "Green",
    family: "Case"
    },
    {
    id: 1011,
    name: "Forest",
    cost: 3,
    activationNumbers: [5],
    effect: "Get 1 coin from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Gear"
    },
    {
    id: 1012,
    name: "Loan Office",
    cost: 0,
    activationNumbers: [5, 6],
    effect: "When you construct this building, get 5 coins from the bank. When this building is activated, pay 2 coins to the bank, on your turn only.",
    card_type: "Green",
    family: "Case"
    },
    {
    id: 1013,
    name: "French Restaurant",
    cost: 3,
    activationNumbers: [5],
    effect: "If the player who rolled the dice has 2 or more constructed landmarks, get 5 coins from the player who rolled the dice.",
    card_type: "Red",
    family: "Cup"
    },
    {
    id: 1014,
    name: "Stadium",
    cost: 6,
    activationNumbers: [6],
    effect: "Get 2 coins from all players, on your turn only.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1015,
    name: "TV Station",
    cost: 7,
    activationNumbers: [6],
    effect: "Take 5 coins from any one player, on your turn only.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1016,
    name: "Business Center",
    cost: 8,
    activationNumbers: [6],
    effect: "Trade 1 non-purple with another player, on your turn only.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1017,
    name: "Flower Shop",
    cost: 1,
    activationNumbers: [6],
    effect: "Get 1 coin from the bank for each Flower Orchard you own, on your turn only.",
    card_type: "Green",
    family: "Box"
    },
    {
    id: 1018,
    name: "Cheese Factory",
    cost: 5,
    activationNumbers: [7],
    effect: "Get 3 coins from the bank for each Ranch you own, on your turn only.",
    card_type: "Green",
    family: "Factory"
    },
    {
    id: 1019,
    name: "Pizza Joint",
    cost: 1,
    activationNumbers: [7],
    effect: "Get 1 coin from the player who rolled the dice.",
    card_type: "Red",
    family: "Cup"
    },
    {
    id: 1020,
    name: "Publisher",
    cost: 5,
    activationNumbers: [7],
    effect: "Take 1 coin from each player for each Cup and Box card they own, on your turn only.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1021,
    name: "Vineyard",
    cost: 3,
    activationNumbers: [7],
    effect: "Get 3 coins from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Wheat"
    },
    {
    id: 1022,
    name: "Furniture Factory",
    cost: 3,
    activationNumbers: [8],
    effect: "Get 3 coins from the bank for each Gear you own, on your turn only.",
    card_type: "Green",
    family: "Factory"
    },
    {
    id: 1023,
    name: "Mackerel Boat",
    cost: 2,
    activationNumbers: [8],
    effect: "If you have a Harbor, get 3 coins from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Boat"
    },
    {
    id: 1024,
    name: "Hamburguesa Stand",
    cost: 1,
    activationNumbers: [8],
    effect: "Get 1 coin from the player who rolled the dice.",
    card_type: "Red",
    family: "Cup"
    },
    {
    id: 1025,
    name: "Tax Office",
    cost: 4,
    activationNumbers: [8, 9],
    effect: "From each player with 10 or more coins, take half of their coins, on your turn only.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1026,
    name: "Renovation Company",
    cost: 4,
    activationNumbers: [8],
    effect: "Choose a non-purple card. All cards owned by any player of that type are closed for renovations. Get 1 coin from each player for each of their buildings closed for renovation, on your turn only.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1027,
    name: "Mine",
    cost: 6,
    activationNumbers: [9],
    effect: "Get 5 coins from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Gear"
    },
    {
    id: 1028,
    name: "Winery",
    cost: 3,
    activationNumbers: [9],
    effect: "Get 6 coins for each Vineyard you own, on your turn only. Then, close this building for renovation.",
    card_type: "Green",
    family: "Factory"
    },
    {
    id: 1029,
    name: "Family Restaurant",
    cost: 3,
    activationNumbers: [9, 10],
    effect: "Get 2 coins from the player who rolled the dice.",
    card_type: "Red",
    family: "Cup"
    },
    {
    id: 1030,
    name: "Moving Company",
    cost: 2,
    activationNumbers: [9, 10],
    effect: "You must give a non-purple card that you own to another player. When you do, get 4 coins from the bank, on your turn only.",
    card_type: "Green",
    family: "Case"
    },
    {
    id: 1031,
    name: "Apple Orchard",
    cost: 3,
    activationNumbers: [10],
    effect: "Get 3 coins from the bank, on anyone's turn.",
    card_type: "Blue",
    family: "Wheat"
    },
    {
    id: 1032,
    name: "Tech Startup",
    cost: 1,
    activationNumbers: [10],
    effect: "At the end of each of your turns, you may place 1 coin on this card. The total placed here is your investment. When activated, get an amount equal to your investment from all players, on your turn only.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1033,
    name: "Convention Center",
    cost: 7,
    activationNumbers: [10],
    effect: "You may choose to activate another of your non-purple cards in place of this one, on your turn only. If you do, return this card to the market.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1034,
    name: "Soda Bottling Plant",
    cost: 2,
    activationNumbers: [11],
    effect: "Get 1 coin from the bank for each Cup card owned by all players, on your turn only.",
    card_type: "Green",
    family: "Factory"
    },
    {
    id: 1035,
    name: "Fruit and Vegetable Market",
    cost: 2,
    activationNumbers: [11, 12],
    effect: "Get 2 coins from the bank for each Wheat card you own, on your turn only.",
    card_type: "Green",
    family: "Fruit"
    },
    {
    id: 1036,
    name: "Park",
    cost: 3,
    activationNumbers: [11, 12, 13],
    effect: "Redistribute all players' coins evenly among all players, on your turn only. If there is an uneven amount of coins, take coins from the bank to make up the difference.",
    card_type: "Purple",
    family: "Tower"
    },
    {
    id: 1037,
    name: "Food Warehouse",
    cost: 2,
    activationNumbers: [12, 13],
    effect: "Get 2 coins from the bank for each Cup card you own, on your turn only.",
    card_type: "Green",
    family: "Factory"
    },
    {
    id: 1038,
    name: "Member's Only Club",
    cost: 4,
    activationNumbers: [12, 13, 14],
    effect: "If the player who rolled this number has 3 or more constructed landmarks, get all of their coins.",
    card_type: "Red",
    family: "Cup"
    },
    {
    id: 1039,
    name: "Tuna Boat",
    cost: 5,
    activationNumbers: [14],
    effect: "On anyone's Turn: The current player rolls 2 dice. If you have a harbor you get as many coins as the dice total.",
    card_type: "Blue",
    family: "Boat"
    }
];

/**
 * Helper Functions for Card Data Access
 * 
 * These functions provide a clean interface for querying card data.
 * They operate purely on the cards array and don't contain game logic.
 */

/**
 * Get a card by its ID
 * @param {number} id - The card ID
 * @returns {Object|undefined} The card object or undefined if not found
 */
export function getCardById(id) {
  return cards.find(card => card.id === id);
}

/**
 * Get all cards of a specific type
 * @param {string} cardType - The card type ('Blue', 'Green', 'Red', 'Purple', 'landmark')
 * @returns {Array} Array of cards matching the type
 */
export function getCardsByType(cardType) {
  return cards.filter(card => card.card_type === cardType);
}

/**
 * Get all cards of a specific family
 * @param {string} family - The card family name
 * @returns {Array} Array of cards matching the family
 */
export function getCardsByFamily(family) {
  return cards.filter(card => card.family === family);
}

/**
 * Get all cards that activate on a specific dice roll
 * @param {number} rollNumber - The dice roll number (1-14)
 * @returns {Array} Array of cards that activate on this roll
 */
export function getCardsByActivationNumber(rollNumber) {
  return cards.filter(card => 
    card.activationNumbers && card.activationNumbers.includes(rollNumber)
  );
}

/**
 * Get all cards within a cost range
 * @param {number} maxCost - Maximum cost (inclusive)
 * @param {number} minCost - Minimum cost (inclusive, defaults to 0)
 * @returns {Array} Array of cards within the cost range
 */
export function getCardsByCost(maxCost, minCost = 0) {
  return cards.filter(card => 
    card.cost >= minCost && card.cost <= maxCost
  );
}

/**
 * Get all unique card types
 * @returns {Array} Array of unique card type strings
 */
export function getAllCardTypes() {
  return [...new Set(cards.map(card => card.card_type))];
}

/**
 * Get all unique families
 * @returns {Array} Array of unique family strings
 */
export function getAllFamilies() {
  return [...new Set(cards.map(card => card.family))];
}

/**
 * Get all non-landmark cards (establishments)
 * @returns {Array} Array of all establishment cards
 */
export function getEstablishments() {
  return cards.filter(card => card.card_type !== 'landmark');
}

/**
 * Get all landmark cards
 * @returns {Array} Array of all landmark cards
 */
export function getLandmarks() {
  return cards.filter(card => card.card_type === 'landmark');
}
