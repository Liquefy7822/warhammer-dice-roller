// pages/command-phase.js

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CommandPhase = () => {
  const [battleShockRoll, setBattleShockRoll] = useState(null);
  const [leadershipCharacteristic, setLeadershipCharacteristic] = useState(0);
  const [battleShockResult, setBattleShockResult] = useState('');

  const rollDice = () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const totalRoll = roll1 + roll2;
    setBattleShockRoll(totalRoll);
  };

  const handleLeadershipChange = (e) => {
    setLeadershipCharacteristic(parseInt(e.target.value));
  };

  const resolveBattleShock = () => {
    if (battleShockRoll === null || leadershipCharacteristic === 0) {
      alert('Please roll the dice and enter the unit\'s Leadership characteristic.');
      return;
    }

    if (battleShockRoll < leadershipCharacteristic) {
      setBattleShockResult('Battle-Shocked');
    } else {
      setBattleShockResult('No effects');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Command Phase" />
      <h2>Battle-Shock Test</h2>
      <p>Roll 2d6 to take a Battle-Shock test.</p>
      <button onClick={rollDice}>Roll Dice</button>
      {battleShockRoll !== null && (
        <p>Battle-Shock Roll: {battleShockRoll}</p>
      )}
      <div>
        <label>
          Leadership Characteristic:
          <input type="number" value={leadershipCharacteristic} onChange={handleLeadershipChange} />
        </label>
      </div>
      <button onClick={resolveBattleShock}>Resolve Battle-Shock</button>
      {battleShockResult !== '' && (
        <p>Battle-Shock Result: {battleShockResult}</p>
      )}
      <Footer />
    </div>
  );
};

export default CommandPhase;

