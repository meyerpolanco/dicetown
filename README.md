# DiceTown

A web-based board game inspired by MachiKoro.

## Project Structure

- `/src` - Main source code
  - `app.tsx` & `app.css` - Main game component and global styles
  - `/components`
    - `dice.tsx` & `dice.css` - Interactive dice component
    - `PlayerCards.tsx` & `PlayerCards.css` - Card display with stacking
    - `Shop.tsx` & `Shop.css` - Shop interface component
  - `/types`
    - `player.ts` - Player interface definition
    - `card.ts` - Card interface definition
  - `/data`
    - `cards.ts` - Card definitions and helper functions

## Game Rules

1. On your turn:
   - Roll the dice (required first action)
   - Buy one establishment (optional)
   - Pass your turn
2. Buying cards:
   - Must roll dice before purchasing
   - Must have sufficient coins
   - Turn ends after purchase

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## TODO

- Card activation effects [ALL] (update with which need to be done as necessary)
- Landmark effects and win condition
- Online functionality
- Game statistics 
