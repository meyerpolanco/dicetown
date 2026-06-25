import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { io } = require("socket.io-client");

process.env.PORT = "4330";
process.env.HOST = "127.0.0.1";
process.env.STARTING_COINS = "120";

const originalRandom = Math.random;
const queuedRandom = [];
Math.random = () => (queuedRandom.length > 0 ? queuedRandom.shift() : originalRandom());

const shared = await import("../shared/dist/index.js");
const allCards = [...shared.starterShop];
const cardById = new Map(allCards.map((card) => [card.id, card]));

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const { httpServer } = await import("../server/dist/index.js");
await delay(250);

let tokenCounter = 0;
const clients = new Set();

test.after(async () => {
  cleanupClients();
  Math.random = originalRandom;
  await new Promise((resolve, reject) => {
    httpServer.close((error) => (error ? reject(error) : resolve()));
  });
});

test("Airport pays out when passing without a purchase", async () => {
  setCatalog(["bakery"]);
  const { alice, bob } = await createRoom(["Alice", "Bob"]);

  await roll(alice, [4]);
  await buyLandmark(alice, "airport", bob.token);
  assert.equal(coins(alice, "Alice"), 90);

  await roll(bob, [4]);
  await pass(bob, alice.token);
  await roll(alice, [4]);
  await pass(alice, bob.token);

  assert.equal(coins(alice, "Alice"), 100);
  assertEventIncludes(alice, "Alice's Airport provided 10 coins because they bought nothing this turn.");
  cleanupClients();
});

test("Game stats track rolls, purchases, coin movement, and card activations", async () => {
  setCatalog(["bakery"]);
  const { alice, bob } = await createRoom(["Alice", "Bob"]);

  await roll(alice, [2]);
  await buyCard(alice, "bakery", bob.token);

  const aliceStats = alice.game.stats.players[alice.token];
  assert.equal(alice.game.stats.totalTurns, 1);
  assert.equal(alice.game.stats.totalRolls, 1);
  assert.equal(alice.game.stats.rollTotals["2"], 1);
  assert.equal(alice.game.stats.oneDieRollTotals["2"], 1);
  assert.equal(alice.game.stats.twoDiceRollTotals["2"] ?? 0, 0);
  assert.equal(alice.game.stats.cardsBought, 1);
  assert.equal(aliceStats.turnsTaken, 1);
  assert.equal(aliceStats.rollTotals["2"], 1);
  assert.equal(aliceStats.oneDieRollTotals["2"], 1);
  assert.equal(aliceStats.cardsBought, 1);
  assert.equal(aliceStats.coinsSpentOnCards, 1);
  assert.equal(aliceStats.coinsGained, 1);
  assert.equal(aliceStats.coinsLost, 1);
  assert.equal(aliceStats.coinsGainedBySource["card:bakery"], 1);
  assert.equal(aliceStats.coinsGainedBySource["color:green"], 1);
  assert.equal(aliceStats.coinsLostBySource["card-purchase"], 1);
  assert.equal(aliceStats.cardStats.bakery.activations, 1);
  assert.equal(aliceStats.cardStats.bakery.coinsGained, 1);
  assert.equal(alice.game.stats.coinHistory.length, 2);
  cleanupClients();
});

test("Lobby starts games and blocks new players after start", async () => {
  setCatalog(["bakery"]);
  const { alice, bob, roomCode } = await createRoom(["Alice", "Bob"], { start: false });
  assert.equal(alice.game.status, "lobby");
  assert.equal(alice.game.phase, "waiting");
  assert.equal(alice.game.activePlayerId, null);

  await startGame(alice);
  assert.equal(alice.game.status, "playing");
  assert.equal(alice.game.phase, "roll");
  assert.equal(alice.game.activePlayerId, alice.token);

  const cara = makeClient("Cara");
  cara.socket.emit("room:join", {
    playerName: "Cara",
    playerToken: cara.token,
    roomCode
  });
  await waitForError(cara, "has already started");
  assert.equal(alice.game.players.length, 2);
  cleanupClients();
});

test("Host can toggle balanced dice only before the game starts", async () => {
  setCatalog(["bakery"]);
  const { alice } = await createRoom(["Alice", "Bob"], { start: false });

  assert.equal(alice.game.settings.balancedDice, false);
  await setBalancedDice(alice, true);
  assert.equal(alice.game.settings.balancedDice, true);

  await startGame(alice);
  alice.socket.emit("room:set-balanced-dice", false);
  await waitForError(alice, "only be changed in the lobby");
  assert.equal(alice.game.settings.balancedDice, true);
  cleanupClients();
});

test("Balanced dice mode draws two-dice rolls from its deck", async () => {
  setCatalog(["bakery"]);
  const { alice, bob } = await createRoom(["Alice", "Bob"], { start: false });

  await setBalancedDice(alice, true);
  await startGame(alice);
  assert.equal(alice.game.balancedDiceDeck.length, 36);

  await roll(alice, [4]);
  await buyLandmark(alice, "train-station", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);

  alice.socket.emit("turn:roll", 2);
  await waitFor(
    alice,
    (game) => game.phase === "buy" && game.lastDice.length === 2 && game.balancedDiceDeck.length === 35,
    "Alice rolled two balanced dice"
  );
  cleanupClients();
});

test("Radio Tower rerolls use balanced dice when balanced mode is enabled", async () => {
  setCatalog(["bakery"]);
  const { alice, bob } = await createRoom(["Alice", "Bob"], { start: false });

  await setBalancedDice(alice, true);
  await startGame(alice);
  await roll(alice, [4]);
  await buyLandmark(alice, "train-station", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);
  await roll(alice, [4]);
  await buyLandmark(alice, "radio-tower", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);

  alice.socket.emit("turn:roll", 2);
  await waitFor(
    alice,
    (game) => game.phase === "reroll" && game.lastDice.length === 2 && game.balancedDiceDeck.length === 35,
    "Alice rolled balanced dice before Radio Tower"
  );

  alice.socket.emit("turn:reroll", 2);
  await waitFor(
    alice,
    (game) => game.phase === "buy" && game.lastDice.length === 2 && game.balancedDiceDeck.length === 34,
    "Alice rerolled balanced dice with Radio Tower"
  );
  cleanupClients();
});

test("Rematch returns to a same-roster lobby", async () => {
  setCatalog(["bakery"]);
  const { alice, bob, roomCode } = await createRoom(["Alice", "Bob"]);

  await constructLandmarkTurn(alice, bob, "harbor");
  await constructLandmarkTurn(alice, bob, "train-station");
  await constructLandmarkTurn(alice, bob, "shopping-mall");
  await constructLandmarkTurn(alice, bob, "amusement-park");
  await constructLandmarkTurn(alice, bob, "radio-tower");
  await constructLandmarkTurn(alice, bob, "airport");

  assert.equal(alice.game.status, "game-over");
  assert.equal(alice.game.winnerId, alice.token);

  await rematch(alice);
  assert.equal(alice.game.status, "lobby");
  assert.equal(alice.game.phase, "waiting");
  assert.equal(alice.game.activePlayerId, null);
  assert.deepEqual(alice.game.lockedPlayerIds, [alice.token, bob.token]);
  assert.equal(coins(alice, "Alice"), 120);
  assert.equal(alice.game.players.find((player) => player.name === "Alice")?.landmarks.airport, false);

  const cara = makeClient("Cara");
  cara.socket.emit("room:join", {
    playerName: "Cara",
    playerToken: cara.token,
    roomCode
  });
  await waitForError(cara, "same players");
  assert.equal(alice.game.players.length, 2);
  cleanupClients();
});

test("Radio Tower keep and reroll resolve only the final roll", async () => {
  setCatalog(["wheat-field", "bakery"]);
  const { alice, bob } = await createRoom(["Alice", "Bob"]);

  await roll(alice, [4]);
  await buyLandmark(alice, "train-station", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);
  await roll(alice, [4]);
  await buyLandmark(alice, "radio-tower", bob.token);

  await roll(bob, [4]);
  await pass(bob, alice.token);

  const beforeKeep = coins(alice, "Alice");
  await roll(alice, [2], "reroll");
  assert.equal(coins(alice, "Alice"), beforeKeep);
  await keepRoll(alice);
  assert.equal(coins(alice, "Alice"), beforeKeep + 1);
  assertEventIncludes(alice, "Alice kept the roll.");

  await pass(alice, bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);

  const wheatEventsBefore = countEvents(alice, "Alice's Wheat Field earned");
  const beforeReroll = coins(alice, "Alice");
  await roll(alice, [1], "reroll");
  assert.equal(coins(alice, "Alice"), beforeReroll);
  await reroll(alice, [2]);

  assert.equal(alice.game.lastRoll, 2);
  assert.equal(coins(alice, "Alice"), beforeReroll + 1);
  assert.equal(countEvents(alice, "Alice's Wheat Field earned"), wheatEventsBefore);
  assertEventIncludes(alice, "Alice used Radio Tower and rerolled a 2.");

  await pass(alice, bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);

  await roll(alice, [1], "reroll");
  await reroll(alice, [1, 1]);
  assert.equal(alice.game.lastRoll, 2);
  assert.deepEqual(alice.game.lastDice, [1, 1]);
  assertEventIncludes(alice, "Alice used Radio Tower and rerolled 1 + 1 for a total of 2.");
  cleanupClients();
});

test("Harbor runs after Radio Tower and resolves the adjusted roll", async () => {
  setCatalog(["food-warehouse", "cafe"]);
  const { alice, bob } = await createRoom(["Alice", "Bob"]);

  await roll(alice, [4]);
  await buyLandmark(alice, "harbor", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);
  await roll(alice, [4]);
  await buyLandmark(alice, "train-station", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);
  await roll(alice, [4]);
  await buyLandmark(alice, "radio-tower", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);
  await roll(alice, [4], "reroll");
  await keepRoll(alice);
  await buyCard(alice, "food-warehouse", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);
  await roll(alice, [4], "reroll");
  await keepRoll(alice);
  await buyCard(alice, "cafe", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);

  const beforeKeep = coins(alice, "Alice");
  await roll(alice, [5, 5], "reroll");
  assert.equal(coins(alice, "Alice"), beforeKeep);
  await keepRoll(alice, "harbor");
  assert.equal(coins(alice, "Alice"), beforeKeep);
  await useHarbor(alice);
  assert.equal(alice.game.lastRoll, 12);
  assert.deepEqual(alice.game.lastDice, [5, 5]);
  assert.equal(coins(alice, "Alice"), beforeKeep + 2);

  await pass(alice, bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);

  const beforeReroll = coins(alice, "Alice");
  const foodEventsBefore = countEvents(alice, "Alice's Food Warehouse earned");
  await roll(alice, [3, 4], "reroll");
  await reroll(alice, [5, 5], "harbor");
  assert.equal(countEvents(alice, "Alice's Food Warehouse earned"), foodEventsBefore);
  await useHarbor(alice);

  assert.equal(alice.game.lastRoll, 12);
  assert.equal(coins(alice, "Alice"), beforeReroll + 2);
  assertEventIncludes(alice, "Alice used Harbor to change the roll from 10 to 12.");
  cleanupClients();
});

test("Amusement Park can grant repeated extra turns on repeated doubles", async () => {
  setCatalog(["bakery"]);
  const { alice, bob } = await createRoom(["Alice", "Bob"]);

  await roll(alice, [4]);
  await buyLandmark(alice, "train-station", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);
  await roll(alice, [4]);
  await buyLandmark(alice, "amusement-park", bob.token);
  await roll(bob, [4]);
  await pass(bob, alice.token);

  await roll(alice, [2, 2]);
  assert.equal(alice.game.extraTurnPlayerId, alice.token);
  await pass(alice, alice.token);
  assert.equal(alice.game.activePlayerId, alice.token);
  assert.equal(alice.game.extraTurnPlayerId, null);

  await roll(alice, [5, 5]);
  assert.equal(alice.game.extraTurnPlayerId, alice.token);
  await pass(alice, alice.token);

  assert.equal(alice.game.activePlayerId, alice.token);
  assert.equal(countEvents(alice, "Alice's Amusement Park granted another turn."), 2);
  cleanupClients();
});

function setCatalog(cardIds) {
  const cards = cardIds.map((cardId) => {
    const card = cardById.get(cardId);
    assert.ok(card, `Missing card ${cardId}`);
    return card;
  });
  shared.starterShop.splice(0, shared.starterShop.length, ...cards);
}

function cleanupClients() {
  for (const client of clients) {
    client.socket.disconnect();
  }
  clients.clear();
}

function makeClient(name) {
  const socket = io("http://127.0.0.1:4330", { transports: ["websocket"], forceNew: true });
  const client = {
    errorWaiters: [],
    errors: [],
    game: null,
    name,
    socket,
    token: `${name.toLowerCase()}-${++tokenCounter}`,
    waiters: []
  };

  socket.on("game:update", (game) => {
    client.game = game;
    for (const waiter of [...client.waiters]) {
      if (waiter.predicate(game)) {
        client.waiters = client.waiters.filter((candidate) => candidate !== waiter);
        waiter.resolve(game);
      }
    }
  });
  socket.on("room:error", (message) => {
    client.errors.push(message);
    for (const waiter of [...client.errorWaiters]) {
      if (message.includes(waiter.messagePart)) {
        client.errorWaiters = client.errorWaiters.filter((candidate) => candidate !== waiter);
        waiter.resolve(message);
      }
    }
  });
  clients.add(client);
  return client;
}

async function createRoom(names, options = {}) {
  const { start = true } = options;
  const [firstName, ...otherNames] = names;
  const players = [makeClient(firstName), ...otherNames.map(makeClient)];

  players[0].socket.emit("room:create", {
    playerName: firstName,
    playerToken: players[0].token
  });
  const created = await waitFor(players[0], (game) => Boolean(game.roomCode), `${firstName} room create`);

  for (const player of players.slice(1)) {
    player.socket.emit("room:join", {
      playerName: player.name,
      playerToken: player.token,
      roomCode: created.roomCode
    });
    await waitFor(
      player,
      (game) => game.players.some((joinedPlayer) => joinedPlayer.id === player.token),
      `${player.name} room join`
    );
  }

  await waitFor(players[0], (game) => game.players.length === players.length, "all players visible");
  if (start) {
    await startGame(players[0]);
  }

  return {
    ...Object.fromEntries(players.map((player) => [player.name.toLowerCase(), player])),
    roomCode: created.roomCode
  };
}

async function waitFor(client, predicate, label, timeoutMs = 2500) {
  if (client.game && predicate(client.game)) {
    return client.game;
  }

  return new Promise((resolve, reject) => {
    const waiter = {
      predicate,
      resolve: (game) => {
        clearTimeout(timer);
        resolve(game);
      }
    };
    const timer = setTimeout(() => {
      client.waiters = client.waiters.filter((candidate) => candidate !== waiter);
      reject(new Error(`Timed out waiting for ${label}`));
    }, timeoutMs);
    client.waiters.push(waiter);
  });
}

async function waitForError(client, messagePart, timeoutMs = 2500) {
  const existingError = client.errors.find((message) => message.includes(messagePart));

  if (existingError) {
    return existingError;
  }

  return new Promise((resolve, reject) => {
    const waiter = {
      messagePart,
      resolve
    };
    const timer = setTimeout(() => {
      client.errorWaiters = client.errorWaiters.filter((candidate) => candidate !== waiter);
      reject(new Error(`Timed out waiting for error containing ${messagePart}`));
    }, timeoutMs);
    waiter.resolve = (message) => {
      clearTimeout(timer);
      resolve(message);
    };
    client.errorWaiters.push(waiter);
  });
}

async function startGame(player) {
  player.socket.emit("room:start");
  await waitFor(player, (game) => game.status === "playing" && game.phase === "roll", `${player.name} started game`);
}

async function rematch(player) {
  player.socket.emit("room:rematch");
  await waitFor(player, (game) => game.status === "lobby" && game.phase === "waiting", `${player.name} rematched`);
}

async function setBalancedDice(player, balancedDice) {
  player.socket.emit("room:set-balanced-dice", balancedDice);
  await waitFor(
    player,
    (game) => game.status === "lobby" && game.settings.balancedDice === balancedDice,
    `${player.name} set balanced dice`
  );
}

async function roll(player, diceValues, expectedPhase = "buy") {
  queueDice(...diceValues);
  player.socket.emit("turn:roll", diceValues.length);
  const total = diceValues.reduce((sum, value) => sum + value, 0);
  await waitFor(
    player,
    (game) => game.phase === expectedPhase && game.lastRoll === total,
    `${player.name} rolled ${total}`
  );
}

async function constructLandmarkTurn(player, opponent, landmarkId) {
  const playerState = player.game.players.find((candidate) => candidate.id === player.token);
  const expectedPhase = playerState?.landmarks["radio-tower"] ? "reroll" : "buy";
  await roll(player, [4], expectedPhase);

  if (player.game.phase === "reroll") {
    await keepRoll(player);
  }

  if (landmarkId === "airport") {
    player.socket.emit("landmark:buy", landmarkId);
    await waitFor(player, (game) => game.status === "game-over", `${player.name} bought final landmark`);
    return;
  }

  await buyLandmark(player, landmarkId, opponent.token);
  await roll(opponent, [4]);
  await pass(opponent, player.token);
}

async function keepRoll(player, expectedPhase = "buy") {
  player.socket.emit("turn:keep-roll");
  await waitFor(player, (game) => game.phase === expectedPhase, `${player.name} kept roll`);
}

async function reroll(player, diceValues, expectedPhase = "buy") {
  queueDice(...diceValues);
  player.socket.emit("turn:reroll", diceValues.length);
  const total = diceValues.reduce((sum, value) => sum + value, 0);
  await waitFor(
    player,
    (game) => game.phase === expectedPhase && game.lastRoll === total,
    `${player.name} rerolled ${total}`
  );
}

async function useHarbor(player) {
  player.socket.emit("turn:use-harbor");
  await waitFor(player, (game) => game.phase === "buy", `${player.name} used Harbor`);
}

async function pass(player, nextPlayerToken) {
  player.socket.emit("turn:pass");
  await waitFor(
    player,
    (game) => game.phase === "roll" && game.activePlayerId === nextPlayerToken,
    `${player.name} passed`
  );
}

async function buyCard(player, cardId, nextPlayerToken) {
  player.socket.emit("shop:buy", cardId);
  await waitFor(
    player,
    (game) => game.phase === "roll" && game.activePlayerId === nextPlayerToken,
    `${player.name} bought ${cardId}`
  );
}

async function buyLandmark(player, landmarkId, nextPlayerToken) {
  player.socket.emit("landmark:buy", landmarkId);
  await waitFor(
    player,
    (game) => game.phase === "roll" && game.activePlayerId === nextPlayerToken,
    `${player.name} bought ${landmarkId}`
  );
}

function coins(client, name) {
  return client.game.players.find((player) => player.name === name)?.coins;
}

function countEvents(client, text) {
  return client.game.events.filter((event) => event.message.includes(text)).length;
}

function assertEventIncludes(client, text) {
  assert.ok(
    client.game.events.some((event) => event.message.includes(text)),
    `Missing event containing: ${text}`
  );
}

function queueDice(...values) {
  queuedRandom.push(...values.map((value) => (value - 1) / 6));
}
