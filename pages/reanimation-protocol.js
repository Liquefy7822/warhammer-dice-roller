import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReanimationProtocols = () => {
  const [unitCount, setUnitCount] = useState(1);
  const [allMaxHealth, setAllMaxHealth] = useState(false);
  const [reanimationResult, setReanimationResult] = useState('');

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const performReanimation = () => {
    let totalWounds = 0;
    let totalModelsAdded = 0;
    for (let i = 0; i < unitCount; i++) {
      const roll = rollDice();
      // Dividing the result by 2 and rounding up to get the D3 result
      const wounds = Math.ceil(roll / 2);
      totalWounds += wounds;
      if (roll === 1 && totalModelsAdded < unitCount) {
        totalModelsAdded++;
      }
    }

    if (allMaxHealth) {
      totalWounds += totalModelsAdded;
      totalModelsAdded = 0;
    }

    setReanimationResult(`Total wounds reanimated: ${totalWounds}. Total models added: ${totalModelsAdded}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Reanimation Protocols" />
      <h2>Unit Reanimation</h2>
      <div>
        <label>
          Number of Units:
          <input type="number" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} />
        </label>
      </div>
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

