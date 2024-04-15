// pages/movement-phase.js

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MovementPhase = () => {
  const [fallBackMode, setFallBackMode] = useState(false);
  const [desperateEscapeFailures, setDesperateEscapeFailures] = useState(0);
  const [unitCount, setUnitCount] = useState(1);
  const [moveStat, setMoveStat] = useState(6);
  const [advancingRoll, setAdvancingRoll] = useState(null);
  const [moveResult, setMoveResult] = useState('');
  const [reinforcementsStep, setReinforcementsStep] = useState(false);

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const advance = () => {
    const roll = rollDice();
    setAdvancingRoll(roll);
    setMoveResult(`Advance: Move stat + ${roll} = ${moveStat + roll}`);
  };

  const fallBack = () => {
    if (desperateEscapeFailures > 0) {
      alert('Unit cannot make a Fall Back move due to Desperate Escape failures.');
      return;
    }
    setFallBackMode(true);
    setMoveResult('Fall Back move initiated.');
  };

const makeMove = () => {
  if (!fallBackMode) {
    advance();
  } else {
    // Logic for Fall Back move
    const roll = rollDice();
    const totalMove = moveStat + roll;
    // Assuming successful fall back move, update move result accordingly
    setMoveResult(`Fall Back Move: Move stat + ${roll} = ${totalMove}`);
  }
};


  const handleDesperateEscape = () => {
  // Roll for each model in the unit
  let totalFailures = 0;
  for (let i = 0; i < unitCount; i++) {
    const roll = rollDice();
    if (roll <= 2) {
      totalFailures++;
    }
  }
  // Update desperate escape failures state accordingly
  setDesperateEscapeFailures(totalFailures);
};



  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Movement Phase" />
      <h2>Unit Movement</h2>
      <div>
        <label>
          Number of Units:
          <input type="number" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Move Stat:
          <input type="number" value={moveStat} onChange={(e) => setMoveStat(parseInt(e.target.value))} />
        </label>
      </div>
      <button onClick={makeMove}>Make Move</button>
      {advancingRoll !== null && (
        <p>{moveResult}</p>
      )}
      <div>
        <button onClick={fallBack}>Fall Back</button>
        {fallBackMode && (
          <button onClick={handleDesperateEscape}>Desperate Escape</button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MovementPhase;
