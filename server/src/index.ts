import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import {
  createInitialLandmarks,
  createInitialGame,
  landmarks,
  refillShop,
  resetShop,
  starterShop,
  type CardDefinition,
  type GameState,
  type PlayerId,
  type PlayerState
} from "@dicetown/shared";

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "0.0.0.0";
const corsOrigin = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) ?? true;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin
  }
});

const rooms = new Map<string, GameState>();
const STARTING_COINS = Number(process.env.STARTING_COINS ?? 10);

interface RoomCreatePayload {
  playerName: string;
  playerToken: PlayerId;
}

interface RoomJoinPayload {
  roomCode: string;
  playerName: string;
  playerToken: PlayerId;
}

app.use(cors({ origin: corsOrigin }));

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

io.on("connection", (socket) => {
  socket.on("room:create", ({ playerName, playerToken }: RoomCreatePayload) => {
    const roomCode = createRoomCode();
    const game = createInitialGame(roomCode);
    const displayName = playerName || "Player";
    game.players.push({
      id: playerToken,
      name: displayName,
      coins: STARTING_COINS,
      cards: { "wheat-field": 1, bakery: 1 },
      landmarks: createInitialLandmarks(),
      connected: true
    });
    game.activePlayerId = playerToken;
    game.phase = "roll";

    rooms.set(roomCode, game);
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    socket.data.playerId = playerToken;
    console.log(`[room:create] ${roomCode} ${displayName} (${playerToken})`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("room:join", ({ roomCode, playerName, playerToken }: RoomJoinPayload) => {
    const normalizedRoomCode = roomCode.trim().toUpperCase();
    const game = rooms.get(normalizedRoomCode);

    if (!game) {
      socket.emit("room:error", `Room ${normalizedRoomCode} was not found.`);
      return;
    }

    const existingPlayer = game.players.find((player) => player.id === playerToken);

    if (existingPlayer) {
      existingPlayer.connected = true;
      existingPlayer.name = playerName || existingPlayer.name;
      socket.join(normalizedRoomCode);
      socket.data.roomCode = normalizedRoomCode;
      socket.data.playerId = playerToken;
      game.events.push({
        id: `rejoin-${playerToken}-${Date.now()}`,
        message: `${existingPlayer.name} reconnected.`
      });
      console.log(`[room:rejoin] ${normalizedRoomCode} ${existingPlayer.name} (${playerToken})`);
      io.to(normalizedRoomCode).emit("game:update", game);
      return;
    }

    if (game.players.length >= 4) {
      socket.emit("room:error", `Room ${normalizedRoomCode} is already full.`);
      return;
    }

    if (game.players.some((player) => player.id === playerToken)) {
      socket.join(normalizedRoomCode);
      socket.emit("game:update", game);
      return;
    }

    const displayName = playerName || `Player ${game.players.length + 1}`;
    game.players.push({
      id: playerToken,
      name: displayName,
      coins: STARTING_COINS,
      cards: { "wheat-field": 1, bakery: 1 },
      landmarks: createInitialLandmarks(),
      connected: true
    });
    game.events.push({
      id: `join-${socket.id}`,
      message: `${displayName} joined the room.`
    });

    socket.join(normalizedRoomCode);
    socket.data.roomCode = normalizedRoomCode;
    socket.data.playerId = playerToken;
    console.log(`[room:join] ${normalizedRoomCode} ${displayName} (${playerToken})`);
    io.to(normalizedRoomCode).emit("game:update", game);
  });

  socket.on("turn:roll", (diceCount: number = 1) => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayer = game.players.find((player) => player.id === playerId);

    if (!activePlayer || game.activePlayerId !== playerId) {
      socket.emit("room:error", "It is not your turn.");
      return;
    }

    if (game.phase !== "roll") {
      socket.emit("room:error", "You have already rolled this turn.");
      return;
    }

    if (diceCount !== 1 && diceCount !== 2) {
      socket.emit("room:error", "You may only roll one or two dice.");
      return;
    }

    if (diceCount === 2 && !activePlayer.landmarks["train-station"]) {
      socket.emit("room:error", "Construct Train Station before rolling two dice.");
      return;
    }

    const dice = Array.from({ length: diceCount }, rollDie);
    const rollTotal = dice.reduce((total, die) => total + die, 0);
    game.lastRoll = rollTotal;
    game.phase = "buy";
    game.events.push({
      id: `roll-${playerId}-${Date.now()}`,
      message:
        diceCount === 1
          ? `${activePlayer.name} rolled a ${rollTotal}.`
          : `${activePlayer.name} rolled ${dice.join(" + ")} for a total of ${rollTotal}.`
    });
    resolveCardActivations(game, activePlayer, rollTotal);
    resolveCityHall(game, activePlayer);

    console.log(`[turn:roll] ${roomCode} ${activePlayer.name} rolled ${dice.join("+")}=${rollTotal}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("turn:pass", () => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayerIndex = game.players.findIndex((player) => player.id === playerId);

    if (activePlayerIndex === -1 || game.activePlayerId !== playerId) {
      socket.emit("room:error", "It is not your turn.");
      return;
    }

    if (game.phase !== "buy") {
      socket.emit("room:error", "Roll before passing the turn.");
      return;
    }

    const activePlayer = game.players[activePlayerIndex];
    const nextPlayer = getNextPlayer(game, activePlayerIndex) ?? activePlayer;
    resolveAirport(game, activePlayer);
    completeTurnWithoutEstablishmentPurchase(game);
    advanceTurn(game, activePlayerIndex);

    console.log(`[turn:pass] ${roomCode} ${activePlayer.name} -> ${nextPlayer?.name ?? "nobody"}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("shop:buy", (cardId: string) => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayerIndex = game.players.findIndex((player) => player.id === playerId);

    if (activePlayerIndex === -1 || game.activePlayerId !== playerId) {
      socket.emit("room:error", "It is not your turn.");
      return;
    }

    if (game.phase !== "buy") {
      socket.emit("room:error", "Roll before buying from the shop.");
      return;
    }

    const card = starterShop.find((shopCard) => shopCard.id === cardId);

    if (!card) {
      socket.emit("room:error", "That card is not in the shop.");
      return;
    }

    const stock = game.shop[card.id] ?? 0;

    if (stock <= 0) {
      socket.emit("room:error", `${card.name} is sold out.`);
      return;
    }

    const activePlayer = game.players[activePlayerIndex];

    if (activePlayer.coins < card.cost) {
      socket.emit("room:error", `${activePlayer.name} does not have enough coins for ${card.name}.`);
      return;
    }

    payBank(activePlayer, card.cost);
    activePlayer.cards[card.id] = (activePlayer.cards[card.id] ?? 0) + 1;
    game.shop[card.id] = stock - 1;
    game.turnsSinceEstablishmentPurchase = 0;
    game.events.push({
      id: `buy-${playerId}-${card.id}-${Date.now()}`,
      message: `${activePlayer.name} bought ${card.name} for ${card.cost} coin${card.cost === 1 ? "" : "s"}.`
    });

    if (game.shop[card.id] === 0) {
      delete game.shop[card.id];
      addShopDrawEvents(game, refillShop(game));
    }

    advanceTurn(game, activePlayerIndex);
    console.log(`[shop:buy] ${roomCode} ${activePlayer.name} bought ${card.name}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("landmark:buy", (landmarkId: string) => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayerIndex = game.players.findIndex((player) => player.id === playerId);

    if (activePlayerIndex === -1 || game.activePlayerId !== playerId) {
      socket.emit("room:error", "It is not your turn.");
      return;
    }

    if (game.phase !== "buy") {
      socket.emit("room:error", "Roll before constructing a landmark.");
      return;
    }

    const landmark = landmarks.find((candidate) => candidate.id === landmarkId);
    const activePlayer = game.players[activePlayerIndex];

    if (!landmark) {
      socket.emit("room:error", "That landmark does not exist.");
      return;
    }

    if (activePlayer.landmarks[landmark.id]) {
      socket.emit("room:error", `${landmark.name} is already constructed.`);
      return;
    }

    if (activePlayer.coins < landmark.cost) {
      socket.emit("room:error", `${activePlayer.name} does not have enough coins for ${landmark.name}.`);
      return;
    }

    payBank(activePlayer, landmark.cost);
    activePlayer.landmarks[landmark.id] = true;
    game.events.push({
      id: `landmark-${playerId}-${landmark.id}-${Date.now()}`,
      message: `${activePlayer.name} constructed ${landmark.name} for ${formatCoins(landmark.cost)}.`
    });

    if (landmarks.every((candidate) => activePlayer.landmarks[candidate.id])) {
      game.winnerId = activePlayer.id;
      game.phase = "game-over";
      game.events.push({
        id: `winner-${playerId}-${Date.now()}`,
        message: `${activePlayer.name} constructed all seven landmarks and won the game.`
      });
    } else {
      completeTurnWithoutEstablishmentPurchase(game);
      advanceTurn(game, activePlayerIndex);
    }

    console.log(`[landmark:buy] ${roomCode} ${activePlayer.name} constructed ${landmark.name}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("disconnect", () => {
    const roomCode = socket.data.roomCode as string | undefined;
    const playerId = socket.data.playerId as PlayerId | undefined;

    if (!roomCode || !playerId) {
      return;
    }

    const game = rooms.get(roomCode);
    const leavingPlayer = game?.players.find((player) => player.id === playerId);

    if (!game || !leavingPlayer) {
      return;
    }

    leavingPlayer.connected = false;

    game.events.push({
      id: `disconnect-${playerId}-${Date.now()}`,
      message: `${leavingPlayer.name} disconnected.`
    });

    console.log(`[room:disconnect] ${roomCode} ${leavingPlayer.name} (${playerId})`);
    io.to(roomCode).emit("game:update", game);
  });
});

httpServer.listen(port, host, () => {
  console.log(`DiceTown server listening on http://${host}:${port}`);
});

function createRoomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const maxAttempts = alphabet.length * alphabet.length;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const code = Array.from({ length: 2 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");

    if (!rooms.has(code)) {
      return code;
    }
  }

  throw new Error("No room codes are currently available.");
}

function findSocketRoom(socket: Parameters<Parameters<typeof io.on>[1]>[0]): [string, GameState, PlayerId] | null {
  const roomCode = socket.data.roomCode as string | undefined;
  const playerId = socket.data.playerId as PlayerId | undefined;

  if (!roomCode || !playerId) {
    return null;
  }

  const game = rooms.get(roomCode);

  return game ? [roomCode, game, playerId] : null;
}

function rollDie(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function getNextPlayer(game: GameState, currentPlayerIndex: number): PlayerState | null {
  if (game.players.length === 0) {
    return null;
  }

  return game.players[(currentPlayerIndex + 1) % game.players.length] ?? null;
}

function advanceTurn(game: GameState, activePlayerIndex: number): void {
  const activePlayer = game.players[activePlayerIndex];
  const nextPlayer = getNextPlayer(game, activePlayerIndex) ?? activePlayer;
  game.activePlayerId = nextPlayer?.id ?? null;
  game.phase = "roll";
  game.lastRoll = null;
  game.events.push({
    id: `turn-${activePlayer?.id}-${Date.now()}`,
    message: `${activePlayer?.name ?? "Nobody"} passed the turn to ${nextPlayer?.name ?? "nobody"}.`
  });
}

function completeTurnWithoutEstablishmentPurchase(game: GameState): void {
  game.turnsSinceEstablishmentPurchase += 1;
  const resetThreshold = game.players.length * 3;

  if (resetThreshold > 0 && game.turnsSinceEstablishmentPurchase >= resetThreshold) {
    const drawnCardIds = resetShop(game);
    game.turnsSinceEstablishmentPurchase = 0;
    game.events.push({
      id: `shop-reset-${Date.now()}-${game.events.length}`,
      message: "The shop was discarded and dealt again after three rounds without an establishment purchase."
    });
    addShopDrawEvents(game, drawnCardIds);
  }
}

function addShopDrawEvents(game: GameState, cardIds: string[]): void {
  for (const cardId of cardIds) {
    const card = starterShop.find((candidate) => candidate.id === cardId);

    if (!card) {
      continue;
    }

    game.events.push({
      id: `shop-draw-${card.id}-${Date.now()}-${game.events.length}`,
      message: `${card.name} was added to the shop.`
    });
  }
}

function resolveCardActivations(game: GameState, activePlayer: PlayerState, roll: number): void {
  const matchingCards = starterShop
    .filter((card) => card.activationNumbers.includes(roll))
    .sort((left, right) => left.activation.priority - right.activation.priority);

  for (const card of matchingCards) {
    const owners = getActivationOwners(game, activePlayer, card);

    for (const owner of owners) {
      const cardCount = owner.cards[card.id] ?? 0;

      if (cardCount > 0 && cardConditionIsMet(card, owner, activePlayer)) {
        applyCardEffect(game, card, owner, activePlayer, cardCount);
      }
    }
  }
}

function cardConditionIsMet(card: CardDefinition, owner: PlayerState, activePlayer: PlayerState): boolean {
  const condition = card.activation.condition;

  if (!condition) {
    return true;
  }

  switch (condition.kind) {
    case "owner-landmark-count":
      return compareCount(countConstructedLandmarks(owner), condition.comparison, condition.count);
    case "active-player-landmark-count":
      return compareCount(countConstructedLandmarks(activePlayer), condition.comparison, condition.count);
    case "owner-has-landmark":
      return Boolean(owner.landmarks[condition.landmarkId]);
  }
}

function compareCount(value: number, comparison: "less-than" | "at-least", target: number): boolean {
  return comparison === "less-than" ? value < target : value >= target;
}

function countConstructedLandmarks(player: PlayerState): number {
  return Object.values(player.landmarks).filter(Boolean).length;
}

function resolveCityHall(game: GameState, activePlayer: PlayerState): void {
  if (!activePlayer.landmarks["city-hall"] || activePlayer.coins !== 0) {
    return;
  }

  receiveFromBank(activePlayer, 1);
  game.events.push({
    id: `city-hall-${activePlayer.id}-${Date.now()}-${game.events.length}`,
    message: `${activePlayer.name}'s City Hall provided 1 coin before the buy phase.`
  });
}

function resolveAirport(game: GameState, activePlayer: PlayerState): void {
  if (!activePlayer.landmarks.airport) {
    return;
  }

  receiveFromBank(activePlayer, 10);
  game.events.push({
    id: `airport-${activePlayer.id}-${Date.now()}-${game.events.length}`,
    message: `${activePlayer.name}'s Airport provided 10 coins because they bought nothing this turn.`
  });
}

function getActivationOwners(game: GameState, activePlayer: PlayerState, card: CardDefinition): PlayerState[] {
  switch (card.activation.scope) {
    case "any-player":
      return game.players;
    case "active-player":
      return [activePlayer];
    case "opponents":
      return getOpponentsInTurnOrder(game, activePlayer);
  }
}

function getOpponentsInTurnOrder(game: GameState, activePlayer: PlayerState): PlayerState[] {
  const activePlayerIndex = game.players.findIndex((player) => player.id === activePlayer.id);
  const opponents: PlayerState[] = [];

  for (let offset = 1; offset < game.players.length; offset += 1) {
    const opponentIndex = (activePlayerIndex - offset + game.players.length) % game.players.length;
    const opponent = game.players[opponentIndex];

    if (opponent) {
      opponents.push(opponent);
    }
  }

  return opponents;
}

function applyCardEffect(
  game: GameState,
  card: CardDefinition,
  owner: PlayerState,
  activePlayer: PlayerState,
  cardCount: number
): void {
  const effect = card.activation.effect;

  switch (effect.kind) {
    case "bank-income": {
      const baseAmount = effect.coinsPerCard * cardCount;
      const requestedAmount = applyShoppingMallBonus(owner, card, cardCount, baseAmount);
      const amountReceived = receiveFromBank(owner, requestedAmount);
      addActivationEvent(
        game,
        card,
        owner,
        cardCount,
        `${owner.name}'s ${formatCardCount(card.name, cardCount)} earned ${formatAdjustedCoins(amountReceived, baseAmount)} from the bank.`
      );
      return;
    }
    case "bank-income-per-owned-card": {
      const ownedCardCount = owner.cards[effect.ownedCardId] ?? 0;
      const baseAmount = effect.coinsPerOwnedCard * ownedCardCount * cardCount;
      const requestedAmount = applyShoppingMallBonus(owner, card, cardCount, baseAmount);
      const amountReceived = receiveFromBank(owner, requestedAmount);

      if (amountReceived > 0) {
        addActivationEvent(
          game,
          card,
          owner,
          cardCount,
          `${owner.name}'s ${formatCardCount(card.name, cardCount)} earned ${formatAdjustedCoins(amountReceived, baseAmount)} from the bank.`
        );
      }
      return;
    }
    case "bank-income-per-family": {
      const playersToCount = effect.countScope === "owner" ? [owner] : game.players;
      const matchingCardCount = playersToCount.reduce(
        (total, player) => total + countCardsByFamily(player, effect.family),
        0
      );
      const baseAmount = effect.coinsPerMatchingCard * matchingCardCount * cardCount;
      const requestedAmount = applyShoppingMallBonus(owner, card, cardCount, baseAmount);
      const amountReceived = receiveFromBank(owner, requestedAmount);

      if (amountReceived > 0) {
        addActivationEvent(
          game,
          card,
          owner,
          cardCount,
          `${owner.name}'s ${formatCardCount(card.name, cardCount)} earned ${formatAdjustedCoins(amountReceived, baseAmount)} from ${matchingCardCount} ${effect.family} establishment${matchingCardCount === 1 ? "" : "s"}.`
        );
      }
      return;
    }
    case "active-player-transfer": {
      const baseRequestedAmount = effect.coinsPerCard * cardCount;
      const requestedAmount = applyShoppingMallBonus(owner, card, cardCount, baseRequestedAmount);
      const coinsBeforeTransfer = activePlayer.coins;
      const amountTransferred = transferCoins(activePlayer, owner, requestedAmount);
      const baseTransferredAmount = Math.min(coinsBeforeTransfer, baseRequestedAmount);
      const message =
        amountTransferred > 0
          ? `${owner.name}'s ${formatCardCount(card.name, cardCount)} took ${formatAdjustedCoins(amountTransferred, baseTransferredAmount)} from ${activePlayer.name}.`
          : `${owner.name}'s ${formatCardCount(card.name, cardCount)} activated, but ${activePlayer.name} had no coins.`;
      addActivationEvent(game, card, owner, cardCount, message);
    }
  }
}

function addActivationEvent(
  game: GameState,
  card: CardDefinition,
  owner: PlayerState,
  cardCount: number,
  message: string
): void {
  game.events.push({
    id: `activate-${card.id}-${owner.id}-${cardCount}-${Date.now()}-${game.events.length}`,
    message
  });
}

function countCardsByFamily(player: PlayerState, family: CardDefinition["family"]): number {
  return starterShop.reduce((total, card) => {
    if (card.family !== family) {
      return total;
    }

    return total + (player.cards[card.id] ?? 0);
  }, 0);
}

function applyShoppingMallBonus(
  owner: PlayerState,
  card: CardDefinition,
  cardCount: number,
  baseAmount: number
): number {
  const receivesBonus =
    owner.landmarks["shopping-mall"] && (card.family === "Cup" || card.family === "Box");

  return receivesBonus ? baseAmount + cardCount : baseAmount;
}

function receiveFromBank(player: PlayerState, amount: number): number {
  const amountReceived = Math.max(0, amount);
  player.coins += amountReceived;
  return amountReceived;
}

function payBank(player: PlayerState, amount: number): number {
  const amountPaid = Math.min(player.coins, Math.max(0, amount));
  player.coins -= amountPaid;
  return amountPaid;
}

function transferCoins(
  fromPlayer: PlayerState,
  toPlayer: PlayerState,
  amount: number
): number {
  const amountTransferred = Math.min(fromPlayer.coins, Math.max(0, amount));
  fromPlayer.coins -= amountTransferred;
  toPlayer.coins += amountTransferred;
  return amountTransferred;
}

function formatCardCount(cardName: string, count: number): string {
  return count === 1 ? cardName : `${count} ${cardName}s`;
}

function formatCoins(amount: number): string {
  return `${amount} coin${amount === 1 ? "" : "s"}`;
}

function formatAdjustedCoins(amount: number, baseAmount: number): string {
  const formattedAmount = formatCoins(amount);
  return amount === baseAmount ? formattedAmount : `${formattedAmount} (${baseAmount}*)`;
}
