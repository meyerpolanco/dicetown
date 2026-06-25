export type PlayerId = string;
export type RoomCode = string;

export type CardColor = "blue" | "green" | "red" | "purple";
export type GameStatus = "lobby" | "playing" | "game-over";
export type TurnPhase = "waiting" | "roll" | "reroll" | "harbor" | "buy" | "game-over";
export type ActivationScope = "any-player" | "active-player" | "opponents";
export type CardFamily =
  | "Animal"
  | "Boat"
  | "Box"
  | "Cup"
  | "Factory"
  | "Fruit"
  | "Gear"
  | "Tower"
  | "Wheat";

export type CardCondition =
  | {
      kind: "owner-landmark-count";
      comparison: "less-than" | "at-least";
      count: number;
    }
  | {
      kind: "active-player-landmark-count";
      comparison: "less-than" | "at-least";
      count: number;
    }
  | {
      kind: "owner-has-landmark";
      landmarkId: string;
    };

export type CardEffect =
  | {
      kind: "bank-income";
      coinsPerCard: number;
    }
  | {
      kind: "bank-income-per-owned-card";
      ownedCardId: string;
      coinsPerOwnedCard: number;
    }
  | {
      kind: "bank-income-per-family";
      family: CardFamily;
      countScope: "owner" | "all-players";
      coinsPerMatchingCard: number;
    }
  | {
      kind: "active-player-transfer";
      coinsPerCard: number;
    }
  | {
      kind: "all-opponents-transfer";
      coinsPerOpponentPerCard: number;
    }
  | {
      kind: "all-opponents-percent-transfer";
      minimumCoins: number;
      percentage: number;
    }
  | {
      kind: "all-opponents-transfer-per-family";
      families: CardFamily[];
      coinsPerMatchingCard: number;
    }
  | {
      kind: "active-player-transfer-all";
    }
  | {
      kind: "redistribute-coins-evenly";
    };

export interface CardActivation {
  scope: ActivationScope;
  priority: number;
  effect: CardEffect;
  condition?: CardCondition;
}

export interface CardDefinition {
  id: string;
  name: string;
  color: CardColor;
  activationNumbers: number[];
  cost: number;
  deckCopies: number;
  summary: string;
  family: CardFamily;
  activation: CardActivation;
}

export interface LandmarkDefinition {
  id: string;
  name: string;
  cost: number;
  summary: string;
  ownedByDefault?: boolean;
}

export interface PlayerState {
  id: PlayerId;
  name: string;
  coins: number;
  cards: Record<string, number>;
  landmarks: Record<string, boolean>;
  connected: boolean;
}

export interface GameEvent {
  id: string;
  message: string;
}

export interface CardGameStats {
  activations: number;
  coinsGained: number;
  coinsLost: number;
}

export interface PlayerGameStats {
  turnsTaken: number;
  rollCount: number;
  oneDieRolls: number;
  twoDiceRolls: number;
  rerolls: number;
  doublesRolled: number;
  totalRollValue: number;
  rollTotals: Record<string, number>;
  oneDieRollTotals: Record<string, number>;
  twoDiceRollTotals: Record<string, number>;
  cardsBought: number;
  landmarksBuilt: number;
  coinsSpentOnCards: number;
  coinsSpentOnLandmarks: number;
  coinsGained: number;
  coinsLost: number;
  coinsGainedBySource: Record<string, number>;
  coinsLostBySource: Record<string, number>;
  cardStats: Record<string, CardGameStats>;
}

export interface CoinSnapshot {
  turn: number;
  label: string;
  activePlayerId: PlayerId | null;
  coins: Record<PlayerId, number>;
}

export interface GameStats {
  totalTurns: number;
  totalRolls: number;
  oneDieRolls: number;
  twoDiceRolls: number;
  rerolls: number;
  doublesRolled: number;
  rollTotals: Record<string, number>;
  oneDieRollTotals: Record<string, number>;
  twoDiceRollTotals: Record<string, number>;
  cardsBought: number;
  landmarksBuilt: number;
  players: Record<PlayerId, PlayerGameStats>;
  coinHistory: CoinSnapshot[];
}

export interface GameState {
  roomCode: RoomCode;
  players: PlayerState[];
  hostPlayerId: PlayerId | null;
  status: GameStatus;
  activePlayerId: PlayerId | null;
  phase: TurnPhase;
  settings: GameSettings;
  balancedDiceDeck: number[][];
  stats: GameStats;
  shop: Record<string, number>;
  deck: string[];
  discard: string[];
  turnsSinceEstablishmentPurchase: number;
  lastRoll: number | null;
  lastDice: number[];
  extraTurnPlayerId: PlayerId | null;
  events: GameEvent[];
  winnerId: PlayerId | null;
  lockedPlayerIds: PlayerId[] | null;
}

export interface GameSettings {
  balancedDice: boolean;
  cardAvailability: "standard";
}

export const landmarks: LandmarkDefinition[] = [
  {
    id: "city-hall",
    name: "City Hall",
    cost: 0,
    summary: "Before buying, if you have 0 coins, collect 1 coin from the bank.",
    ownedByDefault: true
  },
  {
    id: "harbor",
    name: "Harbor",
    cost: 2,
    summary: "On a roll of 10 or higher, you may add 2 to the roll."
  },
  {
    id: "train-station",
    name: "Train Station",
    cost: 4,
    summary: "You may choose to roll 1 or 2 dice."
  },
  {
    id: "shopping-mall",
    name: "Shopping Mall",
    cost: 10,
    summary: "Earn 1 additional coin from each Cup and Box establishment when it activates."
  },
  {
    id: "amusement-park",
    name: "Amusement Park",
    cost: 16,
    summary: "If you roll doubles, take another full turn after your turn ends."
  },
  {
    id: "radio-tower",
    name: "Radio Tower",
    cost: 22,
    summary: "Immediately after rolling, you may reroll the dice."
  },
  {
    id: "airport",
    name: "Airport",
    cost: 30,
    summary: "If you buy nothing on your turn, collect 10 coins when you pass."
  }
];

export const starterShop: CardDefinition[] = [
  {
    id: "sushi-bar",
    name: "Sushi Bar",
    color: "red",
    activationNumbers: [1],
    cost: 4,
    deckCopies: 6,
    summary: "If you have Harbor, take 3 coins from the active player when they roll a 1.",
    family: "Cup",
    activation: {
      scope: "opponents",
      priority: 10,
      condition: {
        kind: "owner-has-landmark",
        landmarkId: "harbor"
      },
      effect: { kind: "active-player-transfer", coinsPerCard: 3 }
    }
  },
  {
    id: "wheat-field",
    name: "Wheat Field",
    color: "blue",
    activationNumbers: [1],
    cost: 1,
    deckCopies: 6,
    summary: "Earn 1 coin when anyone rolls a 1.",
    family: "Wheat",
    activation: {
      scope: "any-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 1 }
    }
  },
  {
    id: "bakery",
    name: "Bakery",
    color: "green",
    activationNumbers: [2, 3],
    cost: 1,
    deckCopies: 6,
    summary: "Earn 1 coin on your turn when you roll a 2 or 3.",
    family: "Box",
    activation: {
      scope: "active-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 1 }
    }
  },
  {
    id: "cafe",
    name: "Cafe",
    color: "red",
    activationNumbers: [3],
    cost: 2,
    deckCopies: 6,
    summary: "Take 1 coin from the active player when they roll a 3.",
    family: "Cup",
    activation: {
      scope: "opponents",
      priority: 10,
      effect: { kind: "active-player-transfer", coinsPerCard: 1 }
    }
  },
  {
    id: "ranch",
    name: "Ranch",
    color: "blue",
    activationNumbers: [2],
    cost: 1,
    deckCopies: 6,
    summary: "Earn 1 coin when anyone rolls a 2.",
    family: "Animal",
    activation: {
      scope: "any-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 1 }
    }
  },
  {
    id: "general-store",
    name: "General Store",
    color: "green",
    activationNumbers: [2],
    cost: 0,
    deckCopies: 6,
    summary: "If you have fewer than 2 constructed landmarks, earn 2 coins on your turn.",
    family: "Box",
    activation: {
      scope: "active-player",
      priority: 20,
      condition: {
        kind: "owner-landmark-count",
        comparison: "less-than",
        count: 2
      },
      effect: { kind: "bank-income", coinsPerCard: 2 }
    }
  },
  {
    id: "convenience-store",
    name: "Convenience Store",
    color: "green",
    activationNumbers: [4],
    cost: 2,
    deckCopies: 6,
    summary: "Earn 3 coins on your turn when you roll a 4.",
    family: "Box",
    activation: {
      scope: "active-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 3 }
    }
  },
  {
    id: "flower-orchard",
    name: "Flower Orchard",
    color: "blue",
    activationNumbers: [4],
    cost: 2,
    deckCopies: 6,
    summary: "Earn 1 coin when anyone rolls a 4.",
    family: "Wheat",
    activation: {
      scope: "any-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 1 }
    }
  },
  {
    id: "corn-field",
    name: "Corn Field",
    color: "blue",
    activationNumbers: [3, 4],
    cost: 2,
    deckCopies: 6,
    summary: "If you have fewer than 2 constructed landmarks, earn 1 coin on anyone's turn.",
    family: "Wheat",
    activation: {
      scope: "any-player",
      priority: 20,
      condition: {
        kind: "owner-landmark-count",
        comparison: "less-than",
        count: 2
      },
      effect: { kind: "bank-income", coinsPerCard: 1 }
    }
  },
  {
    id: "forest",
    name: "Forest",
    color: "blue",
    activationNumbers: [5],
    cost: 3,
    deckCopies: 6,
    summary: "Earn 1 coin when anyone rolls a 5.",
    family: "Gear",
    activation: {
      scope: "any-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 1 }
    }
  },
  {
    id: "french-restaurant",
    name: "French Restaurant",
    color: "red",
    activationNumbers: [5],
    cost: 3,
    deckCopies: 6,
    summary: "If the active player has at least 2 constructed landmarks, take 5 coins from them.",
    family: "Cup",
    activation: {
      scope: "opponents",
      priority: 10,
      condition: {
        kind: "active-player-landmark-count",
        comparison: "at-least",
        count: 2
      },
      effect: { kind: "active-player-transfer", coinsPerCard: 5 }
    }
  },
  {
    id: "flower-shop",
    name: "Flower Shop",
    color: "green",
    activationNumbers: [6],
    cost: 1,
    deckCopies: 6,
    summary: "Earn 1 coin for each Flower Orchard you own on your turn.",
    family: "Box",
    activation: {
      scope: "active-player",
      priority: 20,
      effect: {
        kind: "bank-income-per-owned-card",
        ownedCardId: "flower-orchard",
        coinsPerOwnedCard: 1
      }
    }
  },
  {
    id: "stadium",
    name: "Stadium",
    color: "purple",
    activationNumbers: [6],
    cost: 6,
    deckCopies: 6,
    summary: "Take 2 coins from every opponent on your turn.",
    family: "Tower",
    activation: {
      scope: "active-player",
      priority: 30,
      effect: { kind: "all-opponents-transfer", coinsPerOpponentPerCard: 2 }
    }
  },
  {
    id: "cheese-factory",
    name: "Cheese Factory",
    color: "green",
    activationNumbers: [7],
    cost: 5,
    deckCopies: 6,
    summary: "Earn 3 coins for each Ranch you own on your turn.",
    family: "Factory",
    activation: {
      scope: "active-player",
      priority: 20,
      effect: {
        kind: "bank-income-per-owned-card",
        ownedCardId: "ranch",
        coinsPerOwnedCard: 3
      }
    }
  },
  {
    id: "pizza-joint",
    name: "Pizza Joint",
    color: "red",
    activationNumbers: [7],
    cost: 1,
    deckCopies: 6,
    summary: "Take 1 coin from the active player when they roll a 7.",
    family: "Cup",
    activation: {
      scope: "opponents",
      priority: 10,
      effect: { kind: "active-player-transfer", coinsPerCard: 1 }
    }
  },
  {
    id: "publisher",
    name: "Publisher",
    color: "purple",
    activationNumbers: [7],
    cost: 5,
    deckCopies: 6,
    summary: "Take 1 coin from each opponent for each Cup and Box establishment they own on your turn.",
    family: "Tower",
    activation: {
      scope: "active-player",
      priority: 30,
      effect: {
        kind: "all-opponents-transfer-per-family",
        families: ["Cup", "Box"],
        coinsPerMatchingCard: 1
      }
    }
  },
  {
    id: "vineyard",
    name: "Vineyard",
    color: "blue",
    activationNumbers: [7],
    cost: 3,
    deckCopies: 6,
    summary: "Earn 3 coins when anyone rolls a 7.",
    family: "Wheat",
    activation: {
      scope: "any-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 3 }
    }
  },
  {
    id: "hamburguesa-stand",
    name: "Hamburguesa Stand",
    color: "red",
    activationNumbers: [8],
    cost: 1,
    deckCopies: 6,
    summary: "Take 1 coin from the active player when they roll an 8.",
    family: "Cup",
    activation: {
      scope: "opponents",
      priority: 10,
      effect: { kind: "active-player-transfer", coinsPerCard: 1 }
    }
  },
  {
    id: "mackerel-boat",
    name: "Mackerel Boat",
    color: "blue",
    activationNumbers: [8],
    cost: 2,
    deckCopies: 6,
    summary: "If you have Harbor, earn 3 coins when anyone rolls an 8.",
    family: "Boat",
    activation: {
      scope: "any-player",
      priority: 20,
      condition: {
        kind: "owner-has-landmark",
        landmarkId: "harbor"
      },
      effect: { kind: "bank-income", coinsPerCard: 3 }
    }
  },
  {
    id: "furniture-factory",
    name: "Furniture Factory",
    color: "green",
    activationNumbers: [8],
    cost: 3,
    deckCopies: 6,
    summary: "Earn 3 coins for each Gear establishment you own on your turn.",
    family: "Factory",
    activation: {
      scope: "active-player",
      priority: 20,
      effect: {
        kind: "bank-income-per-family",
        family: "Gear",
        countScope: "owner",
        coinsPerMatchingCard: 3
      }
    }
  },
  {
    id: "tax-office",
    name: "Tax Office",
    color: "purple",
    activationNumbers: [8, 9],
    cost: 4,
    deckCopies: 6,
    summary: "Take half, rounded down, from each opponent with 10 or more coins on your turn.",
    family: "Tower",
    activation: {
      scope: "active-player",
      priority: 30,
      effect: {
        kind: "all-opponents-percent-transfer",
        minimumCoins: 10,
        percentage: 0.5
      }
    }
  },
  {
    id: "mine",
    name: "Mine",
    color: "blue",
    activationNumbers: [9],
    cost: 6,
    deckCopies: 6,
    summary: "Earn 5 coins when anyone rolls a 9.",
    family: "Gear",
    activation: {
      scope: "any-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 5 }
    }
  },
  {
    id: "family-restaurant",
    name: "Family Restaurant",
    color: "red",
    activationNumbers: [9, 10],
    cost: 3,
    deckCopies: 6,
    summary: "Take 2 coins from the active player when they roll a 9 or 10.",
    family: "Cup",
    activation: {
      scope: "opponents",
      priority: 10,
      effect: { kind: "active-player-transfer", coinsPerCard: 2 }
    }
  },
  {
    id: "apple-orchard",
    name: "Apple Orchard",
    color: "blue",
    activationNumbers: [10],
    cost: 3,
    deckCopies: 6,
    summary: "Earn 3 coins when anyone rolls a 10.",
    family: "Wheat",
    activation: {
      scope: "any-player",
      priority: 20,
      effect: { kind: "bank-income", coinsPerCard: 3 }
    }
  },
  {
    id: "soda-bottling-plant",
    name: "Soda Bottling Plant",
    color: "green",
    activationNumbers: [11],
    cost: 2,
    deckCopies: 6,
    summary: "Earn 1 coin for each Cup establishment owned by all players on your turn.",
    family: "Factory",
    activation: {
      scope: "active-player",
      priority: 20,
      effect: {
        kind: "bank-income-per-family",
        family: "Cup",
        countScope: "all-players",
        coinsPerMatchingCard: 1
      }
    }
  },
  {
    id: "fruit-and-vegetable-market",
    name: "Fruit and Vegetable Market",
    color: "green",
    activationNumbers: [11, 12],
    cost: 2,
    deckCopies: 6,
    summary: "Earn 2 coins for each Wheat establishment you own on your turn.",
    family: "Fruit",
    activation: {
      scope: "active-player",
      priority: 20,
      effect: {
        kind: "bank-income-per-family",
        family: "Wheat",
        countScope: "owner",
        coinsPerMatchingCard: 2
      }
    }
  },
  {
    id: "members-only-club",
    name: "Member's Only Club",
    color: "red",
    activationNumbers: [12, 13, 14],
    cost: 4,
    deckCopies: 6,
    summary: "If the active player has at least 3 constructed landmarks, take all their coins.",
    family: "Cup",
    activation: {
      scope: "opponents",
      priority: 10,
      condition: {
        kind: "active-player-landmark-count",
        comparison: "at-least",
        count: 3
      },
      effect: { kind: "active-player-transfer-all" }
    }
  },
  {
    id: "park",
    name: "Park",
    color: "purple",
    activationNumbers: [11, 12, 13],
    cost: 3,
    deckCopies: 6,
    summary: "Redistribute all players' coins evenly on your turn, using bank coins to cover any remainder.",
    family: "Tower",
    activation: {
      scope: "active-player",
      priority: 30,
      effect: { kind: "redistribute-coins-evenly" }
    }
  },
  {
    id: "food-warehouse",
    name: "Food Warehouse",
    color: "green",
    activationNumbers: [12, 13],
    cost: 2,
    deckCopies: 6,
    summary: "Earn 2 coins for each Cup establishment you own on your turn.",
    family: "Factory",
    activation: {
      scope: "active-player",
      priority: 20,
      effect: {
        kind: "bank-income-per-family",
        family: "Cup",
        countScope: "owner",
        coinsPerMatchingCard: 2
      }
    }
  }
];

export function createInitialGame(roomCode: RoomCode): GameState {
  const game: GameState = {
    roomCode,
    players: [],
    hostPlayerId: null,
    status: "lobby",
    activePlayerId: null,
    settings: createDefaultSettings(),
    balancedDiceDeck: [],
    stats: createEmptyStats(),
    phase: "waiting",
    shop: {},
    deck: shuffle(
      starterShop.flatMap((card) => Array.from({ length: card.deckCopies }, () => card.id))
    ),
    discard: [],
    turnsSinceEstablishmentPurchase: 0,
    lastRoll: null,
    lastDice: [],
    extraTurnPlayerId: null,
    events: [{ id: "game-created", message: `Room ${roomCode} created.` }],
    winnerId: null,
    lockedPlayerIds: null
  };

  refillShop(game);
  return game;
}

export function createEmptyStats(): GameStats {
  return {
    totalTurns: 0,
    totalRolls: 0,
    oneDieRolls: 0,
    twoDiceRolls: 0,
    rerolls: 0,
    doublesRolled: 0,
    rollTotals: {},
    oneDieRollTotals: {},
    twoDiceRollTotals: {},
    cardsBought: 0,
    landmarksBuilt: 0,
    players: {},
    coinHistory: []
  };
}

export function createEmptyPlayerStats(): PlayerGameStats {
  return {
    turnsTaken: 0,
    rollCount: 0,
    oneDieRolls: 0,
    twoDiceRolls: 0,
    rerolls: 0,
    doublesRolled: 0,
    totalRollValue: 0,
    rollTotals: {},
    oneDieRollTotals: {},
    twoDiceRollTotals: {},
    cardsBought: 0,
    landmarksBuilt: 0,
    coinsSpentOnCards: 0,
    coinsSpentOnLandmarks: 0,
    coinsGained: 0,
    coinsLost: 0,
    coinsGainedBySource: {},
    coinsLostBySource: {},
    cardStats: {}
  };
}

export function createInitialLandmarks(): Record<string, boolean> {
  return Object.fromEntries(landmarks.map((landmark) => [landmark.id, Boolean(landmark.ownedByDefault)]));
}

export function createDefaultSettings(): GameSettings {
  return {
    balancedDice: false,
    cardAvailability: "standard"
  };
}

export function refillShop(game: GameState, targetUniqueCards = 10): string[] {
  const drawnCardIds: string[] = [];

  while (countUniqueShopCards(game.shop) < targetUniqueCards) {
    const cardId = drawCard(game);

    if (!cardId) {
      break;
    }

    game.shop[cardId] = (game.shop[cardId] ?? 0) + 1;
    drawnCardIds.push(cardId);
  }

  return drawnCardIds;
}

export function resetShop(game: GameState): string[] {
  for (const [cardId, count] of Object.entries(game.shop)) {
    game.discard.push(...Array.from({ length: count }, () => cardId));
  }

  game.shop = {};
  return refillShop(game);
}

function countUniqueShopCards(shop: Record<string, number>): number {
  return Object.values(shop).filter((count) => count > 0).length;
}

function drawCard(game: GameState): string | null {
  if (game.deck.length === 0 && game.discard.length > 0) {
    game.deck = shuffle(game.discard);
    game.discard = [];
  }

  return game.deck.pop() ?? null;
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}
