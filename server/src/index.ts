import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { createInitialGame, type GameState, type PlayerId } from "@dicetown/shared";

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
      coins: 3,
      cards: { "wheat-field": 1, bakery: 1 },
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
      coins: 3,
      cards: { "wheat-field": 1, bakery: 1 },
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

  socket.on("turn:roll", () => {
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

    const roll = rollDie();
    game.lastRoll = roll;
    game.phase = "buy";
    game.events.push({
      id: `roll-${playerId}-${Date.now()}`,
      message: `${activePlayer.name} rolled a ${roll}.`
    });

    console.log(`[turn:roll] ${roomCode} ${activePlayer.name} rolled ${roll}`);
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
    const nextPlayer = findNextConnectedPlayer(game, activePlayerIndex) ?? activePlayer;
    game.activePlayerId = nextPlayer?.id ?? null;
    game.phase = "roll";
    game.lastRoll = null;
    game.events.push({
      id: `pass-${playerId}-${Date.now()}`,
      message: `${activePlayer.name} passed the turn to ${nextPlayer?.name ?? "nobody"}.`
    });

    console.log(`[turn:pass] ${roomCode} ${activePlayer.name} -> ${nextPlayer?.name ?? "nobody"}`);
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

function findNextConnectedPlayer(game: GameState, currentPlayerIndex: number) {
  for (let offset = 1; offset <= game.players.length; offset += 1) {
    const candidate = game.players[(currentPlayerIndex + offset) % game.players.length];

    if (candidate?.connected) {
      return candidate;
    }
  }

  return null;
}
