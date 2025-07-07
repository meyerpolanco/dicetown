# DiceTown

Created with Cursor

A web game inspired by MachiKoro, built with React and TypeScript.

## Project Structure

- `/src` - Main source code
  - `app.tsx` - Main game component with player management
  - `/components`
    - `dice.tsx` & `dice.css` - Interactive dice component
    - `PlayerCards.tsx` & `PlayerCards.css` - Card display component
  - `/types`
    - `player.ts` - Player interface definition
    - `card.ts` - Card interface definition
  - `/data`
    - `cards.ts` - Card definitions and helper functions

## Game Elements

- Players start with different coin amounts
- Turn-based gameplay with dice rolling
- Card system with different types (Blue, Red, Green, Purple)
- Card families (Wheat, Animal, Cup, Box) for special effects

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
``` 