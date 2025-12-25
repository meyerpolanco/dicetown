## Dicetown

This project is a web implementation of the board game Machi Koro using the [boardgame.io](https://boardgame.io/) framework.

## Game Rules

### How to Play

1. Roll dice. 

2. Activate card effects based on dice roll in the following order. Red -> Blue -> Green -> Purple.

3. Either buy a landmark/card or pass your turn.

If at any point a player owns all of their landmarks, they win!

### Key Game Mechanics

- **Establishment Categories**:
  - **Red (Restaurants)**: Activate on opponents' turns, opponents pay the activated player
  - **Blue (Primary Industry)**: Activate on any player's turn
  - **Green (Secondary Industry)**: Activate only on the player's own turn
  - **Purple (Major Establishments)**: Have unique effects, typically activate only on the player's turn

- **Landmarks**: Provide special abilities (e.g., Train Station allows rolling 2 dice, Radio Tower allows rerolls)

## Implementation Notes for Development

- Game state is managed by boardgame.io's `G` object
- Game context (current player, turn number, etc.) is available via the `ctx` object
- Moves should be defined in the game configuration
- Phases can be used to structure the turn flow (e.g., roll phase, income phase, build phase)
- Multiplayer support is built-in via boardgame.io's server framework

## CURRENT LOC

- Working through tutorial. Stopped at 'Building a Board'
