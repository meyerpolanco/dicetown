import React from 'react';
import { Card } from '../types/card';
import { getCardById } from '../data/cards';
import './PlayerCards.css';

interface PlayerCardsProps {
    cardIds: number[];
}

function PlayerCards({ cardIds }: PlayerCardsProps): React.JSX.Element {
    // Group cards by their ID and count occurrences
    const cardCounts = cardIds.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });

    return (
        <div className="player-cards">
            <h3>Owned Cards:</h3>
            <div className="card-list">
                {Object.entries(cardCounts).map(([id, count]) => {
                    const card = getCardById(parseInt(id));
                    return card ? (
                        <div key={id} className={`card ${card.card_type.toLowerCase()}`}>
                            <div className="card-count">{count}x</div>
                            <h4>{card.name}</h4>
                            <p>Cost: {card.cost}</p>
                            <p>Type: {card.card_type}</p>
                            <p>Family: {card.family}</p>
                            <p>Activates on: {card.activationNumbers.join(', ')}</p>
                            <p>{card.effect}</p>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
}

export default PlayerCards; 