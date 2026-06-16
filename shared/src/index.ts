export type PlayerId = string;
export type RoomCode = string;

export type CardColor = "blue" | "green" | "red" | "purple";
export type TurnPhase = "waiting" | "roll" | "buy";

export interface CardDefinition {
  id: string;
  name: string;
  color: CardColor;
  activationNumbers: number[];
  cost: number;
  summary: string;
}

export interface PlayerState {
  id: PlayerId;
  name: string;
  coins: number;
  cards: Record<string, number>;
  connected: boolean;
}

export interface GameEvent {
  id: string;
  message: string;
}

export interface GameState {
  roomCode: RoomCode;
  players: PlayerState[];
  activePlayerId: PlayerId | null;
  phase: TurnPhase;
  shop: Record<string, number>;
  lastRoll: number | null;
  events: GameEvent[];
}

export const starterShop: CardDefinition[] = [
  {
    id: "wheat-field",
    name: "Wheat Field",
    color: "blue",
    activationNumbers: [1],
    cost: 1,
    summary: "Earn 1 coin when anyone rolls a 1."
  },
  {
    id: "bakery",
    name: "Bakery",
    color: "green",
    activationNumbers: [2, 3],
    cost: 1,
    summary: "Earn 1 coin on your turn when you roll a 2 or 3."
  },
  {
    id: "cafe",
    name: "Cafe",
    color: "red",
    activationNumbers: [3],
    cost: 2,
    summary: "Take 1 coin from the active player when they roll a 3."
  }
];

export function createInitialGame(roomCode: RoomCode): GameState {
  return {
    roomCode,
    players: [],
    activePlayerId: null,
    phase: "waiting",
    shop: Object.fromEntries(starterShop.map((card) => [card.id, 6])),
    lastRoll: null,
    events: [{ id: "game-created", message: `Room ${roomCode} created.` }]
  };
}
