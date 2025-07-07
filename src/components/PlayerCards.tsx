import React from 'react';
import { Card } from '../types/card';
import { getCardById } from '../data/cards';
import './PlayerCards.css';

interface PlayerCardsProps {
    cardIds: number[];
}

function PlayerCards({ cardIds }: PlayerCardsProps): React.JSX.Element {
    return (
        <div className="player-cards">
            <h3>Owned Cards:</h3>
            <div className="card-list">
                {cardIds.map(id => {
                    const card = getCardById(id);
                    return card ? (
                        <div key={id} className={`card ${card.card_type.toLowerCase()}`}>
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