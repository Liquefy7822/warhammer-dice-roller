import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReanimationProtocols = () => {
  const [unitsWithWounds, setUnitsWithWounds] = useState(true);
  const [reanimationResult, setReanimationResult] = useState('');

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const performReanimation = () => {
    const roll = rollDice();
    const wounds = roll === 6 ? 3 : roll === 5 ? 2 : 1;

    if (unitsWithWounds) {
      setReanimationResult(`Revive ${wounds} units with 1 wound each`);
    } else {
      setReanimationResult(`Revive ${wounds} units`);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Reanimation Protocols" />
      <h2>Unit Reanimation</h2>
      <div>
        <input
          type="checkbox"
          id="unitsWithWounds"
          checked={unitsWithWounds}
          onChange={(e) => setUnitsWithWounds(e.target.checked)}
        />
        <label htmlFor="unitsWithWounds">Units have remaining wounds</label>
      </div>
      <button onClick={performReanimation}>Perform Reanimation</button>
      {reanimationResult && (
        <p>{reanimationResult}</p>
      )}
      <Footer />
    </div>
  );
};

export default ReanimationProtocols;
