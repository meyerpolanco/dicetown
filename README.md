# DiceTown

DiceTown is a personal web version of Machi Koro for playing online with friends.

The project is intentionally being built in small, testable chunks. The first milestone is not the full game; it is a thin multiplayer foundation that can create a room, track players, and display a shared game state.

## First Milestone

- 2-4 player room model.
- Shareable room codes.
- Server-owned game state.
- Basic player names and coin counts.
- Browser refresh reconnects to the same player seat when the player rejoins the same room code.
- Disconnected players stay visible in the player list.
- Visible turn/event log.
- Starter shop and turn actions added incrementally after the scaffold is running.

## Recommended Stack

- TypeScript for shared types and game logic.
- React + Vite for the browser client.
- Node + Express + Socket.IO for the multiplayer server.
- npm workspaces for `client`, `server`, and `shared`.

## Project Layout

```text
client/   Browser UI
server/   Room server and multiplayer events
shared/   Game types, card definitions, and rules helpers
```

## Local Development

Install dependencies:

```powershell
npm install
```

Run the client and server together:

```powershell
npm run dev
```

The client will run on `http://localhost:5173` and the server will run on `http://localhost:3001`.

## Configuration

The client defaults to port `3001` on the same hostname used to load the page. For example, if you open:

```text
http://192.168.1.159:5173
```

the browser client will try to connect to:

```text
http://192.168.1.159:3001
```

To point it somewhere else manually, set:

```powershell
$env:VITE_SERVER_URL="http://YOUR_SERVER_HOST:3001"
npm run dev -w client
```

The server defaults to port `3001`, host `0.0.0.0`, and permissive CORS for development. To configure it:

```powershell
$env:PORT="3001"
$env:HOST="0.0.0.0"
$env:CORS_ORIGIN="http://localhost:5173"
npm run dev -w server
```

For local network testing, run `npm run dev`, find your computer's local IP address, then open this from another device on the same Wi-Fi:

```text
http://YOUR_LOCAL_IP:5173
```

If the other device can load the client but cannot connect to the room server, Windows Firewall may need to allow Node.js on private networks.

## Current Setup Note

On this machine, Git is installed at:

```text
C:\Program Files\Git\cmd\git.exe
```

If `git` is not recognized in PowerShell, add this folder to the Windows user PATH and reopen the terminal:

```text
C:\Program Files\Git\cmd
```
