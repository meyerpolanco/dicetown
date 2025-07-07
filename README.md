# DiceTown

A web-based board game inspired by MachiKoro, built with React and TypeScript. This local multiplayer game features turn-based gameplay where players roll dice, buy establishments, and build their economic engine.

## Features

- 🎲 Interactive dice rolling system
- 🏪 Dynamic shop with purchasable cards
- 👥 Support for 3+ players
- 🎮 Turn-based gameplay mechanics
- 💳 Card management with stacking display
- 🎯 Intuitive player state management

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

## Future Plans

- Card activation effects
- Online multiplayer support
- Additional card types and mechanics
- Victory conditions
- Game statistics 
