# DiceTown

DiceTown is a browser-based multiplayer adaptation of Machi Koro for personal play with friends.

## Current Features

- Online rooms for 2-4 players using two-character room codes.
- Cross-device play over a local network.
- Player reconnects and online/offline status.
- Server-enforced turns, dice rolls, coins, purchases, and card activation.
- One- and two-dice rolling, with two dice unlocked by Train Station.
- Randomized establishment deck and a market containing 10 unique card stacks.
- Market discard, refill, and inactivity-reset rules.
- Player cities showing establishment quantities and landmarks.
- Data-driven establishment effects, including income, transfers, family counts, and conditions.
- Counter-clockwise red-card activation.
- Landmark construction and seven-landmark victory condition.
- Implemented City Hall, Train Station, Shopping Mall, and Airport effects.
- Detailed event log for rolls, income, transfers, purchases, market draws, and connections.

## Tech Stack

- TypeScript
- React and Vite
- Node.js, Express, and Socket.IO
- npm workspaces

## Project Structure

```text
client/   React browser interface
server/   Multiplayer server and game rules
shared/   Shared types, cards, landmarks, and market helpers
```

## Local Development

Install dependencies:

```powershell
npm install
```

Start the client and server:

```powershell
npm run dev
```

Open:

```text
http://localhost:5173
```

The Socket.IO server runs on port `3001`.

## Local Network Play

Find the host computer's local IPv4 address and open the following URL from another device on the same network:

```text
http://HOST_IP_ADDRESS:5173
```

The client automatically connects to port `3001` on the same host. Windows Firewall may need to allow Node.js on private networks.

## Configuration

Optional environment variables:

```powershell
$env:VITE_SERVER_URL="http://HOST:3001"
$env:PORT="3001"
$env:HOST="0.0.0.0"
$env:CORS_ORIGIN="http://localhost:5173"
$env:STARTING_COINS="10"
```

Run checks:

```powershell
npm run typecheck
npm run build
```

## Development Approach

The game is being implemented in small, testable pieces. Card definitions and common effects are data-driven so the full establishment catalog can be added without creating a separate resolver for every card.
