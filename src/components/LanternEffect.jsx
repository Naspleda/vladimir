import React from 'react';
import './LanternEffect.css';

const LanternEffect = ({x, y}) => {
    const lanternStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: `radial-gradient(circle 25px at ${x}px ${y}px, transparent 100%, rgba(0, 0, 0, 0.75) 700%)`,
      };

    const lanternStyle2 = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: `radial-gradient(circle 100px at ${x}px ${y}px, transparent 30%, rgba(0, 0, 0, 0.6) 100%)`,
    }
    
      return <div style={lanternStyle2}>
        <div style={lanternStyle}></div>
      </div>;
};

export default LanternEffect;