import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReanimationProtocols = () => {
  const [fullWounds, setFullWounds] = useState(false);
  const [reanimationResult, setReanimationResult] = useState('');

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const performReanimation = () => {
    const roll = rollDice();
    const wounds = roll === 6 ? 3 : roll === 5 ? 2 : 1;

    if (fullWounds) {
      setReanimationResult(`Revive ${wounds} units`);
    } else {
      setReanimationResult(`Heal ${wounds} wounds`);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Reanimation Protocols" />
      <h2>Unit Reanimation</h2>
      <div>
        <input
          type="checkbox"
          id="fullWounds"
          checked={fullWounds}
          onChange={(e) => setFullWounds(e.target.checked)}
        />
        <label htmlFor="fullWounds">Units have full wounds</label>
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
