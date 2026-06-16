import React from "react";
import { createRoot } from "react-dom/client";
import { io } from "socket.io-client";
import type { GameState } from "@dicetown/shared";
import "./styles.css";

const serverUrl = import.meta.env.VITE_SERVER_URL ?? `${window.location.protocol}//${window.location.hostname}:3001`;
const socket = io(serverUrl, { autoConnect: false });
const playerToken = getOrCreatePlayerToken();

function App() {
  const [playerName, setPlayerName] = React.useState("");
  const [roomCode, setRoomCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [game, setGame] = React.useState<GameState | null>(null);
  const [socketId, setSocketId] = React.useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = React.useState("Not connected");

  React.useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id ?? null);
      setConnectionStatus("Connected");
    });
    socket.on("disconnect", () => {
      setSocketId(null);
      setConnectionStatus("Disconnected");
    });
    socket.on("connect_error", () => {
      setConnectionStatus("Connection error");
    });
    socket.on("game:update", (nextGame: GameState) => {
      setError("");
      setGame(nextGame);
    });
    socket.on("room:error", setError);
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("game:update");
      socket.off("room:error", setError);
    };
  }, []);

  function createRoom() {
    if (!socket.connected) {
      setConnectionStatus("Connecting...");
      socket.connect();
    }
    socket.emit("room:create", { playerName, playerToken });
  }

  function joinRoom() {
    if (!socket.connected) {
      setConnectionStatus("Connecting...");
      socket.connect();
    }
    socket.emit("room:join", { roomCode, playerName, playerToken });
  }

  function rollDie() {
    socket.emit("turn:roll");
  }

  function passTurn() {
    socket.emit("turn:pass");
  }

  const activePlayer = game?.players.find((player) => player.id === game.activePlayerId);
  const isMyTurn = Boolean(game && socket.connected && game.activePlayerId === playerToken);

  return (
    <main className="app-shell">
      <section className="panel">
        <h1>DiceTown</h1>
        <p>Small-scope multiplayer scaffold for the first playable milestone.</p>
        <div className="status-row">
          <span className={socket.connected ? "status-pill connected" : "status-pill"}>{connectionStatus}</span>
          <span>Server: {serverUrl}</span>
          <span>Player: {playerToken.slice(0, 6)}</span>
          {socketId ? <span>Socket: {socketId.slice(0, 6)}</span> : null}
        </div>
        <div className="controls-grid">
          <input
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Player name"
          />
          <button type="button" onClick={createRoom}>
            Create Room
          </button>
          <input
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
            maxLength={2}
            placeholder="Room code"
          />
          <button type="button" onClick={joinRoom}>
            Join Room
          </button>
        </div>
        {error ? <p className="error-message">{error}</p> : null}
      </section>

      {game ? (
        <section className="game-grid">
          <div className="panel">
            <h2>Room {game.roomCode}</h2>
            <p>Phase: {game.phase}</p>
            <p>Turn: {activePlayer?.name ?? "Waiting"}</p>
            <p>Last roll: {game.lastRoll ?? "None yet"}</p>
            <div className="turn-actions">
              <button type="button" onClick={rollDie} disabled={!isMyTurn || game.phase !== "roll"}>
                Roll Die
              </button>
              <button type="button" onClick={passTurn} disabled={!isMyTurn || game.phase !== "buy"}>
                Pass Turn
              </button>
            </div>
          </div>

          <div className="panel">
            <h2>Players</h2>
            {game.players.map((player) => (
              <div
                className={[
                  "player-row",
                  player.id === game.activePlayerId ? "active" : "",
                  player.connected ? "" : "disconnected"
                ].join(" ")}
                key={player.id}
              >
                <span className="player-name">
                  {player.name} <small>{player.id.slice(0, 6)}</small>
                </span>
                <span className={player.connected ? "connection-badge connected" : "connection-badge"}>
                  {player.connected ? "Online" : "Offline"}
                </span>
                <strong>{player.coins} coins</strong>
              </div>
            ))}
          </div>

          <div className="panel">
            <h2>Event Log</h2>
            <ol className="event-log">
              {game.events.map((event) => (
                <li key={event.id}>{event.message}</li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

function getOrCreatePlayerToken(): string {
  const storageKey = "dicetown.playerToken";
  const existingToken = localStorage.getItem(storageKey);

  if (existingToken) {
    return existingToken;
  }

  const nextToken = createPlayerToken();
  localStorage.setItem(storageKey, nextToken);
  return nextToken;
}

function createPlayerToken(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const values = new Uint32Array(4);
  crypto.getRandomValues(values);
  return Array.from(values, (value) => value.toString(36)).join("-");
}
