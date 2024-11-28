import React from 'react';
import './LanternEffect.css';

const LanternEffect = ({x, y}) => {
    return (
        <div className="lantern"
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        />
    )
};

export default LanternEffect;