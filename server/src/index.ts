import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import {
  createInitialLandmarks,
  createInitialGame,
  createEmptyPlayerStats,
  createEmptyStats,
  landmarks,
  refillShop,
  resetShop,
  starterShop,
  type CardColor,
  type CardDefinition,
  type GameState,
  type PlayerId,
  type PlayerState
} from "@dicetown/shared";

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "0.0.0.0";
const corsOrigin = process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) ?? true;
const app = express();
export const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin
  }
});

const rooms = new Map<string, GameState>();
const STARTING_COINS = Number(process.env.STARTING_COINS ?? 10);
const BALANCED_DICE_RESHUFFLE_REMAINING = 12;

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
    game.hostPlayerId = playerToken;
    game.players.push({
      id: playerToken,
      name: displayName,
      coins: STARTING_COINS,
      cards: { "wheat-field": 1, bakery: 1 },
      landmarks: createInitialLandmarks(),
      connected: true
    });

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

    if (game.status !== "lobby") {
      socket.emit("room:error", `Room ${normalizedRoomCode} has already started.`);
      return;
    }

    if (game.lockedPlayerIds && !game.lockedPlayerIds.includes(playerToken)) {
      socket.emit("room:error", `Room ${normalizedRoomCode} is waiting for the same players to rematch.`);
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

  socket.on("room:start", () => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;

    if (game.hostPlayerId !== playerId) {
      socket.emit("room:error", "Only the host can start the game.");
      return;
    }

    if (game.status !== "lobby") {
      socket.emit("room:error", "This game has already started.");
      return;
    }

    if (game.players.length < 2) {
      socket.emit("room:error", "At least two players are required to start.");
      return;
    }

    startRound(game);
    game.events.push({
      id: `game-start-${Date.now()}-${game.events.length}`,
      message: `${game.players.find((player) => player.id === playerId)?.name ?? "The host"} started the game.`
    });

    console.log(`[room:start] ${roomCode}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("room:rematch", () => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;

    if (game.hostPlayerId !== playerId) {
      socket.emit("room:error", "Only the host can create a rematch.");
      return;
    }

    if (game.status !== "game-over") {
      socket.emit("room:error", "A rematch is only available after the game ends.");
      return;
    }

    resetToLobby(game, true);
    game.events.push({
      id: `rematch-${Date.now()}-${game.events.length}`,
      message: "A rematch lobby was created with the same players."
    });

    console.log(`[room:rematch] ${roomCode}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("room:set-balanced-dice", (balancedDice: boolean) => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;

    if (game.hostPlayerId !== playerId) {
      socket.emit("room:error", "Only the host can change game settings.");
      return;
    }

    if (game.status !== "lobby") {
      socket.emit("room:error", "Game settings can only be changed in the lobby.");
      return;
    }

    game.settings.balancedDice = Boolean(balancedDice);
    game.balancedDiceDeck = [];
    game.events.push({
      id: `balanced-dice-${Date.now()}-${game.events.length}`,
      message: `Dice mode set to ${game.settings.balancedDice ? "Balanced" : "Standard"}.`
    });

    console.log(`[room:set-balanced-dice] ${roomCode} ${game.settings.balancedDice}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("turn:roll", (diceCount: number = 1) => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayer = game.players.find((player) => player.id === playerId);

    if (game.status !== "playing") {
      socket.emit("room:error", "Start the game before taking turns.");
      return;
    }

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

    const dice = rollDice(game, diceCount);
    setLastRoll(game, dice);
    recordRoll(game, activePlayer, dice, false);
    game.extraTurnPlayerId = null;
    game.events.push({
      id: `roll-${playerId}-${Date.now()}`,
      message:
        diceCount === 1
          ? `${activePlayer.name} rolled a ${game.lastRoll}.`
          : `${activePlayer.name} rolled ${dice.join(" + ")} for a total of ${game.lastRoll}.`
    });

    if (activePlayer.landmarks["radio-tower"]) {
      game.phase = "reroll";
      game.events.push({
        id: `radio-tower-choice-${activePlayer.id}-${Date.now()}-${game.events.length}`,
        message: `${activePlayer.name}'s Radio Tower can reroll the dice.`
      });
    } else {
      continueAfterRollDecisions(game, activePlayer);
    }

    console.log(`[turn:roll] ${roomCode} ${activePlayer.name} rolled ${dice.join("+")}=${game.lastRoll}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("turn:keep-roll", () => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayer = game.players.find((player) => player.id === playerId);

    if (game.status !== "playing") {
      socket.emit("room:error", "Start the game before taking turns.");
      return;
    }

    if (!activePlayer || game.activePlayerId !== playerId) {
      socket.emit("room:error", "It is not your turn.");
      return;
    }

    if (game.phase !== "reroll") {
      socket.emit("room:error", "There is no roll to keep right now.");
      return;
    }

    game.events.push({
      id: `radio-tower-keep-${activePlayer.id}-${Date.now()}-${game.events.length}`,
      message: `${activePlayer.name} kept the roll.`
    });
    continueAfterRollDecisions(game, activePlayer);

    console.log(`[turn:keep-roll] ${roomCode} ${activePlayer.name} kept ${game.lastRoll}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("turn:reroll", (diceCount: number = 1) => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayer = game.players.find((player) => player.id === playerId);

    if (game.status !== "playing") {
      socket.emit("room:error", "Start the game before taking turns.");
      return;
    }

    if (!activePlayer || game.activePlayerId !== playerId) {
      socket.emit("room:error", "It is not your turn.");
      return;
    }

    if (game.phase !== "reroll") {
      socket.emit("room:error", "There is no roll to reroll right now.");
      return;
    }

    if (!activePlayer.landmarks["radio-tower"]) {
      socket.emit("room:error", "Construct Radio Tower before rerolling.");
      return;
    }

    if (diceCount !== 1 && diceCount !== 2) {
      socket.emit("room:error", "You may only reroll one or two dice.");
      return;
    }

    if (diceCount === 2 && !activePlayer.landmarks["train-station"]) {
      socket.emit("room:error", "Construct Train Station before rerolling two dice.");
      return;
    }

    const dice = rollDice(game, diceCount);
    setLastRoll(game, dice);
    recordRoll(game, activePlayer, dice, true);
    game.extraTurnPlayerId = null;
    game.events.push({
      id: `radio-tower-reroll-${activePlayer.id}-${Date.now()}-${game.events.length}`,
      message:
        diceCount === 1
          ? `${activePlayer.name} used Radio Tower and rerolled a ${game.lastRoll}.`
          : `${activePlayer.name} used Radio Tower and rerolled ${dice.join(" + ")} for a total of ${game.lastRoll}.`
    });
    continueAfterRollDecisions(game, activePlayer);

    console.log(`[turn:reroll] ${roomCode} ${activePlayer.name} rerolled ${dice.join("+")}=${game.lastRoll}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("turn:keep-harbor-roll", () => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayer = game.players.find((player) => player.id === playerId);

    if (game.status !== "playing") {
      socket.emit("room:error", "Start the game before taking turns.");
      return;
    }

    if (!activePlayer || game.activePlayerId !== playerId) {
      socket.emit("room:error", "It is not your turn.");
      return;
    }

    if (game.phase !== "harbor") {
      socket.emit("room:error", "There is no Harbor decision right now.");
      return;
    }

    game.events.push({
      id: `harbor-keep-${activePlayer.id}-${Date.now()}-${game.events.length}`,
      message: `${activePlayer.name} kept the roll without using Harbor.`
    });
    resolveFinalRoll(game, activePlayer, game.lastDice, game.lastRoll ?? 0);

    console.log(`[turn:keep-harbor-roll] ${roomCode} ${activePlayer.name} kept ${game.lastRoll}`);
    io.to(roomCode).emit("game:update", game);
  });

  socket.on("turn:use-harbor", () => {
    const roomEntry = findSocketRoom(socket);

    if (!roomEntry) {
      socket.emit("room:error", "You are not currently in a room.");
      return;
    }

    const [roomCode, game, playerId] = roomEntry;
    const activePlayer = game.players.find((player) => player.id === playerId);

    if (game.status !== "playing") {
      socket.emit("room:error", "Start the game before taking turns.");
      return;
    }

    if (!activePlayer || game.activePlayerId !== playerId) {
      socket.emit("room:error", "It is not your turn.");
      return;
    }

    if (game.phase !== "harbor") {
      socket.emit("room:error", "There is no Harbor decision right now.");
      return;
    }

    if (!activePlayer.landmarks.harbor) {
      socket.emit("room:error", "Construct Harbor before adding to the roll.");
      return;
    }

    const baseRoll = game.lastRoll ?? 0;
    const harborRoll = baseRoll + 2;
    game.events.push({
      id: `harbor-use-${activePlayer.id}-${Date.now()}-${game.events.length}`,
      message: `${activePlayer.name} used Harbor to change the roll from ${baseRoll} to ${harborRoll}.`
    });
    resolveFinalRoll(game, activePlayer, game.lastDice, harborRoll);

    console.log(`[turn:use-harbor] ${roomCode} ${activePlayer.name} changed ${baseRoll}->${harborRoll}`);
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

    if (game.status !== "playing") {
      socket.emit("room:error", "Start the game before taking turns.");
      return;
    }

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
    completeTurn(game, activePlayerIndex);

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

    if (game.status !== "playing") {
      socket.emit("room:error", "Start the game before buying from the shop.");
      return;
    }

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

    const amountPaid = payBank(activePlayer, card.cost);
    recordCardPurchase(game, activePlayer, card, amountPaid);
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

    completeTurn(game, activePlayerIndex);
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

    if (game.status !== "playing") {
      socket.emit("room:error", "Start the game before constructing landmarks.");
      return;
    }

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

    const amountPaid = payBank(activePlayer, landmark.cost);
    recordLandmarkBuild(game, activePlayer, landmark.id, amountPaid);
    activePlayer.landmarks[landmark.id] = true;
    game.events.push({
      id: `landmark-${playerId}-${landmark.id}-${Date.now()}`,
      message: `${activePlayer.name} constructed ${landmark.name} for ${formatCoins(landmark.cost)}.`
    });

    if (landmarks.every((candidate) => activePlayer.landmarks[candidate.id])) {
      game.winnerId = activePlayer.id;
      game.status = "game-over";
      game.phase = "game-over";
      game.events.push({
        id: `winner-${playerId}-${Date.now()}`,
        message: `${activePlayer.name} constructed all seven landmarks and won the game.`
      });
      recordCoinSnapshot(game, "Game over");
    } else {
      completeTurnWithoutEstablishmentPurchase(game);
      completeTurn(game, activePlayerIndex);
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

function rollDice(game: GameState, diceCount: number): number[] {
  if (diceCount === 2 && game.settings.balancedDice) {
    return drawBalancedDice(game);
  }

  return Array.from({ length: diceCount }, rollDie);
}

function drawBalancedDice(game: GameState): number[] {
  if (game.balancedDiceDeck.length <= BALANCED_DICE_RESHUFFLE_REMAINING) {
    game.balancedDiceDeck = createBalancedDiceDeck();
  }

  return game.balancedDiceDeck.pop() ?? [rollDie(), rollDie()];
}

function createBalancedDiceDeck(): number[][] {
  const dicePairs: number[][] = [];

  for (let firstDie = 1; firstDie <= 6; firstDie += 1) {
    for (let secondDie = 1; secondDie <= 6; secondDie += 1) {
      dicePairs.push([firstDie, secondDie]);
    }
  }

  return shuffleDicePairs(dicePairs);
}

function shuffleDicePairs(dicePairs: number[][]): number[][] {
  const shuffled = [...dicePairs];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function startRound(game: GameState): void {
  resetRoundState(game);
  game.status = "playing";
  game.phase = "roll";
  game.activePlayerId = game.players[0]?.id ?? null;
  recordCoinSnapshot(game, "Game start");
}

function resetToLobby(game: GameState, lockRoster: boolean): void {
  resetRoundState(game);
  game.status = "lobby";
  game.phase = "waiting";
  game.activePlayerId = null;
  game.lockedPlayerIds = lockRoster ? game.players.map((player) => player.id) : null;
}

function resetRoundState(game: GameState): void {
  const freshGame = createInitialGame(game.roomCode);
  game.shop = freshGame.shop;
  game.deck = freshGame.deck;
  game.discard = freshGame.discard;
  game.balancedDiceDeck = game.settings.balancedDice ? createBalancedDiceDeck() : [];
  game.stats = createEmptyStats();
  game.turnsSinceEstablishmentPurchase = 0;
  game.lastRoll = null;
  game.lastDice = [];
  game.extraTurnPlayerId = null;
  game.winnerId = null;

  for (const player of game.players) {
    player.coins = STARTING_COINS;
    player.cards = { "wheat-field": 1, bakery: 1 };
    player.landmarks = createInitialLandmarks();
    ensurePlayerStats(game, player);
  }
}

function setLastRoll(game: GameState, dice: number[]): void {
  game.lastDice = dice;
  game.lastRoll = dice.reduce((total, die) => total + die, 0);
}

function continueAfterRollDecisions(game: GameState, activePlayer: PlayerState): void {
  const rollTotal = game.lastRoll ?? 0;

  if (activePlayer.landmarks.harbor && rollTotal >= 10) {
    game.phase = "harbor";
    game.events.push({
      id: `harbor-choice-${activePlayer.id}-${Date.now()}-${game.events.length}`,
      message: `${activePlayer.name}'s Harbor can add 2 to the roll.`
    });
    return;
  }

  resolveFinalRoll(game, activePlayer, game.lastDice, rollTotal);
}

function resolveFinalRoll(
  game: GameState,
  activePlayer: PlayerState,
  dice: number[],
  rollTotal = dice.reduce((total, die) => total + die, 0)
): void {
  game.phase = "buy";
  game.lastDice = dice;
  game.lastRoll = rollTotal;
  resolveAmusementPark(game, activePlayer, dice);
  resolveCardActivations(game, activePlayer, rollTotal);
  resolveCityHall(game, activePlayer);
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
  game.lastDice = [];
  game.extraTurnPlayerId = null;
  game.events.push({
    id: `turn-${activePlayer?.id}-${Date.now()}`,
    message: `${activePlayer?.name ?? "Nobody"} passed the turn to ${nextPlayer?.name ?? "nobody"}.`
  });
}

function completeTurn(game: GameState, activePlayerIndex: number): void {
  const activePlayer = game.players[activePlayerIndex];

  if (activePlayer && game.extraTurnPlayerId === activePlayer.id) {
    game.activePlayerId = activePlayer.id;
    game.phase = "roll";
    game.lastRoll = null;
    game.lastDice = [];
    game.extraTurnPlayerId = null;
    game.events.push({
      id: `extra-turn-${activePlayer.id}-${Date.now()}-${game.events.length}`,
      message: `${activePlayer.name}'s Amusement Park granted another turn.`
    });
    recordCoinSnapshot(game, `${activePlayer.name}'s turn ended`);
    return;
  }

  advanceTurn(game, activePlayerIndex);
  recordCoinSnapshot(game, `${activePlayer?.name ?? "Nobody"}'s turn ended`);
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

  const amountReceived = receiveFromBank(activePlayer, 1);
  recordCoinGain(game, activePlayer, amountReceived, "city-hall");
  game.events.push({
    id: `city-hall-${activePlayer.id}-${Date.now()}-${game.events.length}`,
    message: `${activePlayer.name}'s City Hall provided 1 coin before the buy phase.`
  });
}

function resolveAirport(game: GameState, activePlayer: PlayerState): void {
  if (!activePlayer.landmarks.airport) {
    return;
  }

  const amountReceived = receiveFromBank(activePlayer, 10);
  recordCoinGain(game, activePlayer, amountReceived, "airport");
  game.events.push({
    id: `airport-${activePlayer.id}-${Date.now()}-${game.events.length}`,
    message: `${activePlayer.name}'s Airport provided 10 coins because they bought nothing this turn.`
  });
}

function resolveAmusementPark(game: GameState, activePlayer: PlayerState, dice: number[]): void {
  const rolledDoubles = dice.length === 2 && dice[0] === dice[1];

  if (!rolledDoubles || !activePlayer.landmarks["amusement-park"]) {
    return;
  }

  game.extraTurnPlayerId = activePlayer.id;
  game.events.push({
    id: `amusement-park-${activePlayer.id}-${Date.now()}-${game.events.length}`,
    message: `${activePlayer.name}'s Amusement Park will grant another turn after this one.`
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
      recordCardActivation(game, owner, card, cardCount);
      recordCardCoins(game, owner, card, amountReceived, 0);
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
        recordCardActivation(game, owner, card, cardCount);
        recordCardCoins(game, owner, card, amountReceived, 0);
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
        recordCardActivation(game, owner, card, cardCount);
        recordCardCoins(game, owner, card, amountReceived, 0);
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
      recordCardActivation(game, owner, card, cardCount);
      recordCardCoins(game, owner, card, amountTransferred, 0);
      recordCoinLoss(game, activePlayer, amountTransferred, `card:${card.id}`);
      const baseTransferredAmount = Math.min(coinsBeforeTransfer, baseRequestedAmount);
      const message =
        amountTransferred > 0
          ? `${owner.name}'s ${formatCardCount(card.name, cardCount)} took ${formatAdjustedCoins(amountTransferred, baseTransferredAmount)} from ${activePlayer.name}.`
          : `${owner.name}'s ${formatCardCount(card.name, cardCount)} activated, but ${activePlayer.name} had no coins.`;
      addActivationEvent(game, card, owner, cardCount, message);
      return;
    }
    case "all-opponents-transfer": {
      const opponents = getOpponentsInTurnOrder(game, owner);
      const requestedAmount = effect.coinsPerOpponentPerCard * cardCount;
      recordCardActivation(game, owner, card, cardCount);
      const transfers = opponents
        .map((opponent) => {
          const amount = transferCoins(opponent, owner, requestedAmount);
          recordCardCoins(game, owner, card, amount, 0);
          recordCoinLoss(game, opponent, amount, `card:${card.id}`);

          return { opponent, amount };
        })
        .filter(({ amount }) => amount > 0);
      const totalTransferred = transfers.reduce((total, transfer) => total + transfer.amount, 0);
      const message =
        totalTransferred > 0
          ? `${owner.name}'s ${formatCardCount(card.name, cardCount)} took ${formatCoins(totalTransferred)} total: ${formatTransfers(transfers)}.`
          : `${owner.name}'s ${formatCardCount(card.name, cardCount)} activated, but no opponents had coins.`;
      addActivationEvent(game, card, owner, cardCount, message);
      return;
    }
    case "all-opponents-percent-transfer": {
      const opponents = getOpponentsInTurnOrder(game, owner);
      recordCardActivation(game, owner, card, cardCount);
      const transfers = opponents
        .map((opponent) => {
          const requestedAmount =
            opponent.coins >= effect.minimumCoins ? Math.floor(opponent.coins * effect.percentage) : 0;
          const amount = transferCoins(opponent, owner, requestedAmount);
          recordCardCoins(game, owner, card, amount, 0);
          recordCoinLoss(game, opponent, amount, `card:${card.id}`);

          return {
            opponent,
            amount
          };
        })
        .filter(({ amount }) => amount > 0);
      const totalTransferred = transfers.reduce((total, transfer) => total + transfer.amount, 0);
      const message =
        totalTransferred > 0
          ? `${owner.name}'s ${formatCardCount(card.name, cardCount)} took ${formatCoins(totalTransferred)} total: ${formatTransfers(transfers)}.`
          : `${owner.name}'s ${formatCardCount(card.name, cardCount)} activated, but no opponents owed taxes.`;
      addActivationEvent(game, card, owner, cardCount, message);
      return;
    }
    case "all-opponents-transfer-per-family": {
      const opponents = getOpponentsInTurnOrder(game, owner);
      recordCardActivation(game, owner, card, cardCount);
      const transfers = opponents
        .map((opponent) => {
          const matchingCardCount = effect.families.reduce(
            (total, family) => total + countCardsByFamily(opponent, family),
            0
          );
          const requestedAmount = effect.coinsPerMatchingCard * matchingCardCount * cardCount;
          const amount = transferCoins(opponent, owner, requestedAmount);
          recordCardCoins(game, owner, card, amount, 0);
          recordCoinLoss(game, opponent, amount, `card:${card.id}`);

          return {
            opponent,
            amount
          };
        })
        .filter(({ amount }) => amount > 0);
      const totalTransferred = transfers.reduce((total, transfer) => total + transfer.amount, 0);
      const familyList = formatList(effect.families);
      const message =
        totalTransferred > 0
          ? `${owner.name}'s ${formatCardCount(card.name, cardCount)} took ${formatCoins(totalTransferred)} total from opponents' ${familyList} establishments: ${formatTransfers(transfers)}.`
          : `${owner.name}'s ${formatCardCount(card.name, cardCount)} activated, but opponents had no ${familyList} establishments with payable coins.`;
      addActivationEvent(game, card, owner, cardCount, message);
      return;
    }
    case "active-player-transfer-all": {
      const amountTransferred = transferCoins(activePlayer, owner, activePlayer.coins);
      recordCardActivation(game, owner, card, cardCount);
      recordCardCoins(game, owner, card, amountTransferred, 0);
      recordCoinLoss(game, activePlayer, amountTransferred, `card:${card.id}`);
      const message =
        amountTransferred > 0
          ? `${owner.name}'s ${formatCardCount(card.name, cardCount)} took all ${formatCoins(amountTransferred)} from ${activePlayer.name}.`
          : `${owner.name}'s ${formatCardCount(card.name, cardCount)} activated, but ${activePlayer.name} had no coins.`;
      addActivationEvent(game, card, owner, cardCount, message);
      return;
    }
    case "redistribute-coins-evenly": {
      const coinsBeforeRedistribution = new Map(game.players.map((player) => [player.id, player.coins]));
      const totalCoins = game.players.reduce((total, player) => total + player.coins, 0);
      const coinsPerPlayer = game.players.length > 0 ? Math.ceil(totalCoins / game.players.length) : 0;
      const bankCoinsAdded = coinsPerPlayer * game.players.length - totalCoins;
      recordCardActivation(game, owner, card, cardCount);

      for (const player of game.players) {
        player.coins = coinsPerPlayer;
        const delta = player.coins - (coinsBeforeRedistribution.get(player.id) ?? 0);

        if (delta > 0) {
          recordCoinGain(game, player, delta, `card:${card.id}`, card.color);

          if (player.id === owner.id) {
            recordCardCoins(game, owner, card, delta, 0);
          }
        } else if (delta < 0) {
          recordCoinLoss(game, player, Math.abs(delta), `card:${card.id}`, card.color);

          if (player.id === owner.id) {
            recordCardCoins(game, owner, card, 0, Math.abs(delta));
          }
        }
      }

      addActivationEvent(
        game,
        card,
        owner,
        cardCount,
        `${owner.name}'s ${formatCardCount(card.name, cardCount)} redistributed everyone's coins to ${formatCoins(coinsPerPlayer)} each${bankCoinsAdded > 0 ? `, adding ${formatCoins(bankCoinsAdded)} from the bank` : ""}.`
      );
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

function ensurePlayerStats(game: GameState, player: PlayerState) {
  game.stats.players[player.id] ??= createEmptyPlayerStats();
  return game.stats.players[player.id];
}

function recordRoll(game: GameState, player: PlayerState, dice: number[], isReroll: boolean): void {
  const playerStats = ensurePlayerStats(game, player);
  const rollTotal = dice.reduce((total, die) => total + die, 0);

  if (!isReroll) {
    game.stats.totalTurns += 1;
    playerStats.turnsTaken += 1;
  } else {
    game.stats.rerolls += 1;
    playerStats.rerolls += 1;
  }

  game.stats.totalRolls += 1;
  playerStats.rollCount += 1;
  playerStats.totalRollValue += rollTotal;
  addStatAmount(game.stats.rollTotals, String(rollTotal), 1);
  addStatAmount(playerStats.rollTotals, String(rollTotal), 1);

  if (dice.length === 1) {
    game.stats.oneDieRolls += 1;
    playerStats.oneDieRolls += 1;
    addStatAmount(game.stats.oneDieRollTotals, String(rollTotal), 1);
    addStatAmount(playerStats.oneDieRollTotals, String(rollTotal), 1);
  } else {
    game.stats.twoDiceRolls += 1;
    playerStats.twoDiceRolls += 1;
    addStatAmount(game.stats.twoDiceRollTotals, String(rollTotal), 1);
    addStatAmount(playerStats.twoDiceRollTotals, String(rollTotal), 1);
  }

  if (dice.length === 2 && dice[0] === dice[1]) {
    game.stats.doublesRolled += 1;
    playerStats.doublesRolled += 1;
  }
}

function recordCardPurchase(game: GameState, player: PlayerState, card: CardDefinition, amountPaid: number): void {
  const playerStats = ensurePlayerStats(game, player);
  game.stats.cardsBought += 1;
  playerStats.cardsBought += 1;
  playerStats.coinsSpentOnCards += amountPaid;
  recordCoinLoss(game, player, amountPaid, "card-purchase", card.color);
}

function recordLandmarkBuild(
  game: GameState,
  player: PlayerState,
  landmarkId: string,
  amountPaid: number
): void {
  const playerStats = ensurePlayerStats(game, player);
  game.stats.landmarksBuilt += 1;
  playerStats.landmarksBuilt += 1;
  playerStats.coinsSpentOnLandmarks += amountPaid;
  recordCoinLoss(game, player, amountPaid, `landmark:${landmarkId}`);
}

function recordCardActivation(
  game: GameState,
  player: PlayerState,
  card: CardDefinition,
  cardCount: number
): void {
  const cardStats = ensureCardStats(game, player, card.id);
  cardStats.activations += cardCount;
}

function recordCardCoins(
  game: GameState,
  player: PlayerState,
  card: CardDefinition,
  coinsGained: number,
  coinsLost: number
): void {
  const cardStats = ensureCardStats(game, player, card.id);
  cardStats.coinsGained += coinsGained;
  cardStats.coinsLost += coinsLost;
  recordCoinGain(game, player, coinsGained, `card:${card.id}`, card.color);
  recordCoinLoss(game, player, coinsLost, `card:${card.id}`, card.color);
}

function ensureCardStats(game: GameState, player: PlayerState, cardId: string) {
  const playerStats = ensurePlayerStats(game, player);
  playerStats.cardStats[cardId] ??= {
    activations: 0,
    coinsGained: 0,
    coinsLost: 0
  };
  return playerStats.cardStats[cardId];
}

function recordCoinGain(
  game: GameState,
  player: PlayerState,
  amount: number,
  source: string,
  color?: CardColor
): void {
  if (amount <= 0) {
    return;
  }

  const playerStats = ensurePlayerStats(game, player);
  playerStats.coinsGained += amount;
  addStatAmount(playerStats.coinsGainedBySource, source, amount);

  if (color) {
    addStatAmount(playerStats.coinsGainedBySource, `color:${color}`, amount);
  }
}

function recordCoinLoss(
  game: GameState,
  player: PlayerState,
  amount: number,
  source: string,
  color?: CardColor
): void {
  if (amount <= 0) {
    return;
  }

  const playerStats = ensurePlayerStats(game, player);
  playerStats.coinsLost += amount;
  addStatAmount(playerStats.coinsLostBySource, source, amount);

  if (color) {
    addStatAmount(playerStats.coinsLostBySource, `color:${color}`, amount);
  }
}

function recordCoinSnapshot(game: GameState, label: string): void {
  game.stats.coinHistory.push({
    turn: game.stats.totalTurns,
    label,
    activePlayerId: game.activePlayerId,
    coins: Object.fromEntries(game.players.map((player) => [player.id, player.coins]))
  });
}

function addStatAmount(stats: Record<string, number>, key: string, amount: number): void {
  if (amount <= 0) {
    return;
  }

  stats[key] = (stats[key] ?? 0) + amount;
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

function formatTransfers(transfers: { opponent: PlayerState; amount: number }[]): string {
  return transfers.map(({ opponent, amount }) => `${formatCoins(amount)} from ${opponent.name}`).join(", ");
}

function formatList(items: string[]): string {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
