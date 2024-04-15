// pages/shooting-phase.js

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ShootingPhase = () => {
  const [unitCount, setUnitCount] = useState(1);
  const [shootingResult, setShootingResult] = useState('');

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const performShooting = () => {
    let totalHits = 0;
    for (let i = 0; i < unitCount; i++) {
      const roll = rollDice();
      if (roll >= 4) {
        totalHits++;
      }
    }
    setShootingResult(`Total Hits: ${totalHits}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Shooting Phase" />
      <h2>Unit Shooting</h2>
      <div>
        <label>
          Number of Units:
          <input type="number" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} />
        </label>
      </div>
      <button onClick={performShooting}>Perform Shooting</button>
      {shootingResult && (
        <p>{shootingResult}</p>
      )}
      <Footer />
    </div>
  );
};

export default ShootingPhase;
