import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReanimationProtocols = () => {
  const [allMaxHealth, setAllMaxHealth] = useState(false);
  const [reanimationResult, setReanimationResult] = useState('');

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const performReanimation = () => {
    const roll = rollDice();
    // Dividing the result by 2 and rounding up to get the D3 result
    const wounds = Math.ceil(roll / 2);

    if (allMaxHealth) {
      setReanimationResult(`Revive all units in the group`);
    } else {
      setReanimationResult(`Total wounds reanimated: ${wounds}`);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Reanimation Protocols" />
      <h2>Unit Reanimation</h2>
      <div>
        <input
          type="checkbox"
          id="allMaxHealth"
          checked={allMaxHealth}
          onChange={(e) => setAllMaxHealth(e.target.checked)}
        />
        <label htmlFor="allMaxHealth">All models are at max health</label>
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

