import React, { useState } from 'react'
import './dice.css'

// Add this interface to define the props
interface DiceProps {
  onRoll: (value: number) => void;  // Function that will be called when dice is rolled
  disabled?: boolean;
}

// Modify the component to accept props
function Dice({ onRoll, disabled = false }: DiceProps): React.JSX.Element {
  // State to keep track of current dice value (1-6)
  const [value, setValue] = useState(1)

  // Generate random number and update dice value when clicked
  const rollDice = () => {
    if (disabled) return;
    
    // Random number between 1 and 6
    const newValue = Math.floor(Math.random() * 6) + 1
    setValue(newValue)
    onRoll(newValue)  // Call the function passed in from the parent
  }

  // Create dots based on the current value
  const renderDots = () => {
    // Define which grid areas should have dots for each value
    const dotPositions = {
      1: ['e'],
      2: ['a', 'i'],
      3: ['a', 'e', 'i'],
      4: ['a', 'c', 'g', 'i'],
      5: ['a', 'c', 'e', 'g', 'i'],
      6: ['a', 'c', 'd', 'f', 'g', 'i']
    }

    // Get the dots for the current value
    const currentDots = dotPositions[value]

    // Create an array of dots in their grid positions
    return currentDots.map((position) => (
      <div key={position} className="dot" style={{ gridArea: position }} />
    ))
  }

  return (
    // Clickable dice container with dot pattern based on current value
    <div 
      className={`dice dice-${value} ${disabled ? 'disabled' : ''}`} 
      onClick={rollDice}
    >
      {renderDots()}
    </div>
  )
}

export default Dice
