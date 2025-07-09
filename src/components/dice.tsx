import React, { useState } from 'react'
import './dice.css'

// Add this interface to define the props
interface DiceProps {
  onRoll: (value: number) => void;  // Function that will be called when dice is rolled
  disabled?: boolean;
  diceCount?: 1 | 2;  // Number of dice to roll (1 or 2)
}

// Modify the component to accept props
function Dice({ onRoll, disabled = false, diceCount = 1 }: DiceProps): React.JSX.Element {
  // State to keep track of current dice value (1-6 for single die, 2-12 for double)
  const [value, setValue] = useState(diceCount === 1 ? 1 : 2)
  
  // Reset value when diceCount changes
  React.useEffect(() => {
    setValue(diceCount === 1 ? 1 : 2);
  }, [diceCount]);

  // Generate random number and update dice value when clicked
  const rollDice = () => {
    if (disabled) return;
    
    if (diceCount === 1) {
      // Single die roll (1-6)
      const newValue = Math.floor(Math.random() * 6) + 1
      setValue(newValue)
      onRoll(newValue)
    } else {
      // Two dice roll (2-12)
      const die1 = Math.floor(Math.random() * 6) + 1
      const die2 = Math.floor(Math.random() * 6) + 1
      const total = die1 + die2
      setValue(total)
      onRoll(total)
      console.log(`Rolled 2 dice: ${die1} + ${die2} = ${total}`)
    }
  }

  // Create dots based on the current value
  const renderDots = () => {
    // For 2 dice OR any value > 6, just show the total number
    if (diceCount === 2 || value > 6) {
      return <div className="dice-total">{value}</div>
    }

    // Define which grid areas should have dots for each value (single die only)
    const dotPositions: { [key: number]: string[] } = {
      1: ['e'],
      2: ['a', 'i'],
      3: ['a', 'e', 'i'],
      4: ['a', 'c', 'g', 'i'],
      5: ['a', 'c', 'e', 'g', 'i'],
      6: ['a', 'c', 'd', 'f', 'g', 'i']
    }

    // Get the dots for the current value, fallback to showing number if not found
    const currentDots = dotPositions[value]
    if (!currentDots) {
      return <div className="dice-total">{value}</div>
    }

    // Create an array of dots in their grid positions
    return currentDots.map((position) => (
      <div key={position} className="dot" style={{ gridArea: position }} />
    ))
  }

  return (
    // Clickable dice container with dot pattern based on current value
    <div 
      className={`dice ${disabled ? 'disabled' : ''}`} 
      onClick={rollDice}
    >
      {renderDots()}
    </div>
  )
}

export default Dice
