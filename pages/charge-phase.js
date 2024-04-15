// pages/charge-phase.js

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChargePhase = () => {
  const [unitCount, setUnitCount] = useState(1);
  const [chargeResult, setChargeResult] = useState('');

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const performCharge = () => {
    const chargeRoll1 = rollDice();
    const chargeRoll2 = rollDice();
    const totalChargeRoll = chargeRoll1 + chargeRoll2;
    setChargeResult(`Charge Roll: ${chargeRoll1} + ${chargeRoll2} = ${totalChargeRoll}`);

    // Logic to check if charge is successful
    // Assuming successful charge for demonstration
    setChargeResult(chargeResult + ' - Charge Successful');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Charge Phase" />
      <h2>Unit Charging</h2>
      <div>
        <label>
          Number of Units:
          <input type="number" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} />
        </label>
      </div>
      <button onClick={performCharge}>Perform Charge</button>
      {chargeResult && (
        <p>{chargeResult}</p>
      )}
      <Footer />
    </div>
  );
};

export default ChargePhase;
