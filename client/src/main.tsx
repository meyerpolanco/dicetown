import React from "react";
import { createRoot } from "react-dom/client";
import { io } from "socket.io-client";
import { landmarks, starterShop, type CardColor, type GameState } from "@dicetown/shared";
import "./styles.css";

const serverUrl = import.meta.env.VITE_SERVER_URL ?? `${window.location.protocol}//${window.location.hostname}:3001`;
const socket = io(serverUrl, { autoConnect: false });
const playerToken = getOrCreatePlayerToken();
const CARD_COLORS: CardColor[] = ["blue", "green", "red", "purple"];

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

  function startGame() {
    socket.emit("room:start");
  }

  function rematch() {
    socket.emit("room:rematch");
  }

  function setBalancedDice(balancedDice: boolean) {
    socket.emit("room:set-balanced-dice", balancedDice);
  }

  function rollDice(diceCount: 1 | 2) {
    socket.emit("turn:roll", diceCount);
  }

  function passTurn() {
    socket.emit("turn:pass");
  }

  function keepRoll() {
    socket.emit("turn:keep-roll");
  }

  function reroll(diceCount: 1 | 2) {
    socket.emit("turn:reroll", diceCount);
  }

  function keepHarborRoll() {
    socket.emit("turn:keep-harbor-roll");
  }

  function useHarbor() {
    socket.emit("turn:use-harbor");
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
  const isHost = Boolean(game && game.hostPlayerId === playerToken);
  const canEditLobbySettings = Boolean(isHost && game?.status === "lobby");
  const hasTrainStation = Boolean(currentPlayer?.landmarks["train-station"]);
  const canBuy = Boolean(isMyTurn && game?.status === "playing" && game.phase === "buy");
  const lastRollDisplay =
    game?.lastRoll === null || game?.lastRoll === undefined
      ? "None yet"
      : game.lastDice.length > 1
        ? `${game.lastRoll} (${game.lastDice.join(" + ")})`
        : game.lastRoll;
  const topEarner = game ? getTopPlayerByStat(game, "coinsGained") : null;
  const topSpender = game ? getTopSpender(game) : null;
  const topCard = game ? getTopCardEarner(game) : null;
  const oneDieRollEntries = game ? getRollEntries(game.stats.oneDieRollTotals, 1, 6) : [];
  const twoDiceRollEntries = game ? getRollEntries(game.stats.twoDiceRollTotals, 2, 12) : [];
  const maxOneDieRollCount = Math.max(1, ...oneDieRollEntries.map(([, count]) => count));
  const maxTwoDiceRollCount = Math.max(1, ...twoDiceRollEntries.map(([, count]) => count));

  function renderTurnActions() {
    if (!game) {
      return null;
    }

    if (winner) {
      return <p className="turn-hint">Game over</p>;
    }

    if (!isMyTurn) {
      return <p className="turn-hint">Waiting for {activePlayer?.name ?? "the next player"}</p>;
    }

    switch (game.phase) {
      case "roll":
        return (
          <>
            <button type="button" onClick={() => rollDice(1)}>
              Roll One Die
            </button>
            {hasTrainStation ? (
              <button type="button" onClick={() => rollDice(2)}>
                Roll Two Dice
              </button>
            ) : null}
          </>
        );
      case "reroll":
        return (
          <>
            <button type="button" onClick={keepRoll}>
              Keep Roll
            </button>
            <button type="button" onClick={() => reroll(1)}>
              Reroll One Die
            </button>
            {hasTrainStation ? (
              <button type="button" onClick={() => reroll(2)}>
                Reroll Two Dice
              </button>
            ) : null}
          </>
        );
      case "harbor":
        return (
          <>
            <button type="button" onClick={keepHarborRoll}>
              Keep Roll
            </button>
            <button type="button" onClick={useHarbor}>
              Use Harbor
            </button>
          </>
        );
      case "buy":
        return (
          <button type="button" onClick={passTurn}>
            Pass Turn
          </button>
        );
      case "waiting":
        return <p className="turn-hint">Waiting for players</p>;
      case "game-over":
        return <p className="turn-hint">Game over</p>;
    }
  }

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
        <>
        {game.status === "lobby" ? (
          <section className="game-grid">
            <div className="panel">
              <h2>Room {game.roomCode} Lobby</h2>
              <p>{game.lockedPlayerIds ? "Rematch lobby" : "Waiting for players"}</p>
              <div className="turn-actions">
                {isHost ? (
                  <button type="button" onClick={startGame} disabled={game.players.length < 2}>
                    Start Game
                  </button>
                ) : (
                  <p className="turn-hint">Waiting for the host to start</p>
                )}
              </div>
            </div>

            <div className="panel">
              <h2>Connected Players</h2>
              {game.players.map((player) => (
                <div
                  className={["player-row", player.connected ? "" : "disconnected"].join(" ")}
                  key={player.id}
                >
                  <span className="player-name">
                    {player.name} {player.id === game.hostPlayerId ? <small>Host</small> : null}
                  </span>
                  <span className={player.connected ? "connection-badge connected" : "connection-badge"}>
                    {player.connected ? "Online" : "Offline"}
                  </span>
                  <strong>{player.id === playerToken ? "You" : ""}</strong>
                </div>
              ))}
            </div>

            <div className="panel lobby-panel">
              <h2>Game Options</h2>
              <div className="settings-grid">
                <div className="setting-row">
                  <span>Dice mode</span>
                  {canEditLobbySettings ? (
                    <label className="toggle-control">
                      <input
                        type="checkbox"
                        checked={game.settings.balancedDice}
                        onChange={(event) => setBalancedDice(event.target.checked)}
                      />
                      <span className="toggle-track" aria-hidden="true">
                        <span className="toggle-thumb" />
                      </span>
                      <strong>{game.settings.balancedDice ? "Balanced" : "Standard"}</strong>
                    </label>
                  ) : (
                    <strong>{game.settings.balancedDice ? "Balanced" : "Standard"}</strong>
                  )}
                </div>
                <div className="setting-row">
                  <span>Card availability</span>
                  <strong>{game.settings.cardAvailability}</strong>
                </div>
                <div className="setting-row">
                  <span>Player count</span>
                  <strong>{game.players.length} / 4</strong>
                </div>
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

        {game.status === "game-over" ? (
          <section className="game-grid">
            <div className="panel">
              <h2>{winner ? `${winner.name} Wins` : "Game Over"}</h2>
              <p>Room {game.roomCode}</p>
              <div className="turn-actions">
                {isHost ? (
                  <button type="button" onClick={rematch}>
                    Rematch
                  </button>
                ) : (
                  <p className="turn-hint">Waiting for the host to create a rematch</p>
                )}
              </div>
            </div>

            <div className="panel">
              <h2>Stats</h2>
              <div className="settings-grid">
                <div className="setting-row">
                  <span>Winner</span>
                  <strong>{winner?.name ?? "None"}</strong>
                </div>
                <div className="setting-row">
                  <span>Turns played</span>
                  <strong>{game.stats.totalTurns}</strong>
                </div>
                <div className="setting-row">
                  <span>Doubles rolled</span>
                  <strong>{game.stats.doublesRolled}</strong>
                </div>
                <div className="setting-row">
                  <span>Cards bought</span>
                  <strong>{game.stats.cardsBought}</strong>
                </div>
                <div className="setting-row">
                  <span>Landmarks built</span>
                  <strong>{game.stats.landmarksBuilt}</strong>
                </div>
                <div className="setting-row">
                  <span>Top earner</span>
                  <strong>{topEarner ? `${topEarner.name} (${topEarner.value})` : "None"}</strong>
                </div>
                <div className="setting-row">
                  <span>Top spender</span>
                  <strong>{topSpender ? `${topSpender.name} (${topSpender.value})` : "None"}</strong>
                </div>
                <div className="setting-row">
                  <span>Top card</span>
                  <strong>{topCard ? `${topCard.cardName} (${topCard.coins})` : "None"}</strong>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Final Players</h2>
              {game.players.map((player) => (
                <div className="player-row" key={player.id}>
                  <span className="player-name">{player.name}</span>
                  <span className={player.connected ? "connection-badge connected" : "connection-badge"}>
                    {player.connected ? "Online" : "Offline"}
                  </span>
                  <strong>{player.coins} coins</strong>
                </div>
              ))}
            </div>

            <div className="panel stats-panel">
              <h2>Player Stats</h2>
              <div className="player-stats-grid">
                {game.players.map((player) => {
                  const stats = game.stats.players[player.id];
                  const coinsSpent = (stats?.coinsSpentOnCards ?? 0) + (stats?.coinsSpentOnLandmarks ?? 0);
                  const coinsLost = Math.max(0, (stats?.coinsLost ?? 0) - coinsSpent);
                  const boughtCardsByColor = getBoughtCardsByColor(player);

                  return (
                    <article className="player-stat-card" key={player.id}>
                      <h3>{player.name}</h3>
                      <dl>
                        <div>
                          <dt>Coins earned</dt>
                          <dd>{stats?.coinsGained ?? 0}</dd>
                        </div>
                        <div>
                          <dt>Coins spent</dt>
                          <dd>{coinsSpent}</dd>
                        </div>
                        <div>
                          <dt>Coins lost</dt>
                          <dd>{coinsLost}</dd>
                        </div>
                        <div>
                          <dt>Cards bought</dt>
                          <dd>{stats?.cardsBought ?? 0}</dd>
                        </div>
                        {CARD_COLORS.map((color) => (
                          <div className="color-stat-row" key={color}>
                            <dt>
                              <span className={`color-swatch ${color}`} />
                              {capitalize(color)}
                            </dt>
                            <dd>{boughtCardsByColor[color]}</dd>
                          </div>
                        ))}
                      </dl>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="panel stats-panel">
              <h2>Roll Histograms</h2>
              <div className="roll-chart-grid">
                <RollHistogram
                  entries={oneDieRollEntries}
                  maxCount={maxOneDieRollCount}
                  title="One Die"
                  totalRolls={game.stats.oneDieRolls}
                />
                <RollHistogram
                  entries={twoDiceRollEntries}
                  maxCount={maxTwoDiceRollCount}
                  title="Two Dice"
                  totalRolls={game.stats.twoDiceRolls}
                />
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

        {game.status === "playing" ? (
        <section className="game-grid">
          <div className="panel">
            <h2>Room {game.roomCode}</h2>
            <p>Phase: {game.phase}</p>
            <p>Turn: {activePlayer?.name ?? "Waiting"}</p>
            <p>Last roll: {lastRollDisplay}</p>
            {winner ? <p className="winner-message">{winner.name} won the game.</p> : null}
            <div className="turn-actions">
              {renderTurnActions()}
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
                    {isBuilt ? <span className="action-status">Built</span> : null}
                    {!isBuilt && canBuy ? (
                      <button type="button" onClick={() => buyLandmark(landmark.id)} disabled={!canAfford}>
                        Construct
                      </button>
                    ) : null}
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
                    {canBuy ? (
                      <button type="button" onClick={() => buyCard(card.id)} disabled={stock <= 0 || !canAffordCard}>
                        Buy
                      </button>
                    ) : null}
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
        </>
      ) : null}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

function RollHistogram({
  entries,
  maxCount,
  title,
  totalRolls
}: {
  entries: [string, number][];
  maxCount: number;
  title: string;
  totalRolls: number;
}) {
  return (
    <section className="roll-chart">
      <div className="roll-chart-header">
        <h3>{title}</h3>
        <span>{totalRolls} roll{totalRolls === 1 ? "" : "s"}</span>
      </div>
      <div className="roll-histogram" aria-label={`${title} roll histogram`}>
        {entries.map(([roll, count]) => (
          <div className="roll-column" key={roll}>
            <strong>{count}</strong>
            <div className="roll-bar">
              <span style={{ height: `${(count / maxCount) * 100}%` }} />
            </div>
            <span>{roll}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

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

function getTopPlayerByStat(game: GameState, stat: "coinsGained" | "coinsLost") {
  return game.players
    .map((player) => ({
      name: player.name,
      value: game.stats.players[player.id]?.[stat] ?? 0
    }))
    .sort((left, right) => right.value - left.value)[0] ?? null;
}

function getTopSpender(game: GameState) {
  return game.players
    .map((player) => {
      const stats = game.stats.players[player.id];

      return {
        name: player.name,
        value: (stats?.coinsSpentOnCards ?? 0) + (stats?.coinsSpentOnLandmarks ?? 0)
      };
    })
    .sort((left, right) => right.value - left.value)[0] ?? null;
}

function getBoughtCardsByColor(player: GameState["players"][number]): Record<CardColor, number> {
  const counts = Object.fromEntries(CARD_COLORS.map((color) => [color, 0])) as Record<CardColor, number>;

  for (const card of starterShop) {
    const startingCopies = card.id === "wheat-field" || card.id === "bakery" ? 1 : 0;
    const boughtCopies = Math.max(0, (player.cards[card.id] ?? 0) - startingCopies);
    counts[card.color] += boughtCopies;
  }

  return counts;
}

function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function getTopCardEarner(game: GameState) {
  let topCard: { cardName: string; coins: number; playerName: string } | null = null;

  for (const player of game.players) {
    const playerStats = game.stats.players[player.id];

    if (!playerStats) {
      continue;
    }

    for (const [cardId, cardStats] of Object.entries(playerStats.cardStats)) {
      const card = starterShop.find((candidate) => candidate.id === cardId);
      const candidate = {
        cardName: card?.name ?? cardId,
        coins: cardStats.coinsGained,
        playerName: player.name
      };

      if (!topCard || candidate.coins > topCard.coins) {
        topCard = candidate;
      }
    }
  }

  return topCard && topCard.coins > 0
    ? { ...topCard, cardName: `${topCard.playerName}'s ${topCard.cardName}` }
    : null;
}

function getRollEntries(rollTotals: Record<string, number>, firstRoll: number, lastRoll: number): [string, number][] {
  return Array.from({ length: lastRoll - firstRoll + 1 }, (_, index) => {
    const roll = String(firstRoll + index);
    return [roll, rollTotals[roll] ?? 0];
  });
}
