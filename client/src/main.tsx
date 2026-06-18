import React from "react";
import { createRoot } from "react-dom/client";
import { io } from "socket.io-client";
import { landmarks, starterShop, type GameState } from "@dicetown/shared";
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

  function rollDice(diceCount: 1 | 2) {
    socket.emit("turn:roll", diceCount);
  }

  function passTurn() {
    socket.emit("turn:pass");
  }

  function buyCard(cardId: string) {
    socket.emit("shop:buy", cardId);
  }

  function buyLandmark(landmarkId: string) {
    socket.emit("landmark:buy", landmarkId);
  }

  const activePlayer = game?.players.find((player) => player.id === game.activePlayerId);
  const currentPlayer = game?.players.find((player) => player.id === playerToken);
  const winner = game?.players.find((player) => player.id === game.winnerId);
  const isMyTurn = Boolean(game && socket.connected && game.activePlayerId === playerToken);
  const hasTrainStation = Boolean(currentPlayer?.landmarks["train-station"]);

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
            {winner ? <p className="winner-message">{winner.name} won the game.</p> : null}
            <div className="turn-actions">
              <button type="button" onClick={() => rollDice(1)} disabled={!isMyTurn || game.phase !== "roll"}>
                Roll One Die
              </button>
              <button
                type="button"
                onClick={() => rollDice(2)}
                disabled={!isMyTurn || game.phase !== "roll" || !hasTrainStation}
              >
                Roll Two Dice
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

          <div className="panel cities-panel">
            <h2>Player Cities</h2>
            <div className="cities-grid">
              {game.players.map((player) => (
                <section
                  className={[
                    "city",
                    player.id === playerToken ? "current-player" : "",
                    player.connected ? "" : "disconnected"
                  ].join(" ")}
                  key={player.id}
                >
                  <div className="city-header">
                    <h3>{player.name}{player.id === playerToken ? " (You)" : ""}</h3>
                    <strong>{player.coins} coins</strong>
                  </div>
                  <div className="city-cards">
                    {starterShop
                      .filter((card) => (player.cards[card.id] ?? 0) > 0)
                      .map((card) => (
                        <article className={`city-card ${card.color}`} key={card.id}>
                          <span className="city-card-count">x{player.cards[card.id]}</span>
                          <span className="activation-numbers">{card.activationNumbers.join(", ")}</span>
                          <h4>{card.name}</h4>
                          <span className="card-family">{card.family}</span>
                          <p>{card.summary}</p>
                        </article>
                      ))}
                  </div>
                  <div className="city-landmarks">
                    {landmarks.map((landmark) => {
                      const isBuilt = Boolean(player.landmarks[landmark.id]);
                      return (
                        <article className={isBuilt ? "landmark built" : "landmark"} key={landmark.id}>
                          <div className="landmark-header">
                            <h4>{landmark.name}</h4>
                            <span>{isBuilt ? "Built" : `${landmark.cost} coins`}</span>
                          </div>
                          <p>{landmark.summary}</p>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="panel landmarks-panel">
            <h2>Landmarks</h2>
            <div className="landmarks-grid">
              {landmarks.map((landmark) => {
                const isBuilt = Boolean(currentPlayer?.landmarks[landmark.id]);
                const canAfford = Boolean(currentPlayer && currentPlayer.coins >= landmark.cost);
                return (
                  <article className={isBuilt ? "landmark-shop-item built" : "landmark-shop-item"} key={landmark.id}>
                    <div className="landmark-header">
                      <h3>{landmark.name}</h3>
                      <strong>{landmark.cost} coins</strong>
                    </div>
                    <p>{landmark.summary}</p>
                    <button
                      type="button"
                      onClick={() => buyLandmark(landmark.id)}
                      disabled={isBuilt || !isMyTurn || game.phase !== "buy" || !canAfford}
                    >
                      {isBuilt ? "Built" : "Construct"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="panel shop-panel">
            <h2>Shop</h2>
            <div className="shop-status">
              <span>{Object.keys(game.shop).length} unique cards</span>
              <span>{game.deck.length} cards in deck</span>
              <span>{game.discard.length} cards discarded</span>
              <span>{game.turnsSinceEstablishmentPurchase} turns without a card purchase</span>
            </div>
            <div className="shop-grid">
              {starterShop
                .filter((card) => (game.shop[card.id] ?? 0) > 0)
                .sort(
                  (left, right) =>
                    compareActivationNumbers(left.activationNumbers, right.activationNumbers) ||
                    left.cost - right.cost ||
                    left.name.localeCompare(right.name)
                )
                .map((card) => {
                const stock = game.shop[card.id] ?? 0;
                const canAffordCard = Boolean(currentPlayer && currentPlayer.coins >= card.cost);
                return (
                  <article className={`shop-card ${card.color}`} key={card.id}>
                    <div className="shop-card-header">
                      <span className="activation-numbers">{card.activationNumbers.join(", ")}</span>
                      <span className="card-color">{card.color} / {card.family}</span>
                    </div>
                    <h3>{card.name}</h3>
                    <p>{card.summary}</p>
                    <div className="shop-card-footer">
                      <span>{card.cost} coin{card.cost === 1 ? "" : "s"}</span>
                      <span>{stock} left</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => buyCard(card.id)}
                      disabled={!isMyTurn || game.phase !== "buy" || stock <= 0 || !canAffordCard}
                    >
                      Buy
                    </button>
                  </article>
                );
                })}
            </div>
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

function compareActivationNumbers(left: number[], right: number[]): number {
  const sharedLength = Math.min(left.length, right.length);

  for (let index = 0; index < sharedLength; index += 1) {
    const difference = left[index] - right[index];

    if (difference !== 0) {
      return difference;
    }
  }

  return left.length - right.length;
}
