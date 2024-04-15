// pages/charge-phase.js

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChargePhase = () => {
  const [unitCount, setUnitCount] = useState(1);
  const [chargeRoll, setChargeRoll] = useState(null);

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const performCharge = () => {
    const chargeRoll1 = rollDice();
    const chargeRoll2 = rollDice();
    const totalChargeRoll = chargeRoll1 + chargeRoll2;
    setChargeRoll(totalChargeRoll);
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
      <p>Charge Roll: {chargeRoll !== null ? chargeRoll : 'N/A'}</p>
      <Footer />
    </div>
  );
};

export default ChargePhase;
