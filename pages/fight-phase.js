// pages/fight-phase.js

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './FightPhase.module.css'; // Import CSS file for styling

const FightPhase = () => {
  const [unitCount, setUnitCount] = useState(1);
  const [hits, setHits] = useState([]);
  const [wounds, setWounds] = useState([]);
  const [saves, setSaves] = useState([]);
  const [damage, setDamage] = useState([]);
  const [totalWounds, setTotalWounds] = useState(1);
  const [fnPEnabled, setFnPEnabled] = useState(false);
  const [fnPValue, setFnPValue] = useState(0);
  const [invulEnabled, setInvulEnabled] = useState(false);
  const [invulValue, setInvulValue] = useState(0);

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const handleAttack = () => {
    const hitsResult = [];
    const woundsResult = [];
    const savesResult = [];
    const damageResult = [];

    for (let i = 0; i < unitCount; i++) {
      const hitRoll = rollDice();
      const woundRoll = rollDice();
      const saveRoll = rollDice();
      const damageRoll = rollDice();
      
      const hitSuccess = hitRoll >= 3; // Assuming Weapon Skill (WS) or Ballistic Skill (BS) is 3+
      const woundSuccess = woundRoll >= 4; // Assuming Strength (S) > Target's Toughness (T)
      const saveSuccess = saveRoll >= 4; // Assuming average save roll

      hitsResult.push({ roll: hitRoll, success: hitSuccess });
      woundsResult.push({ roll: woundRoll, success: woundSuccess });
      savesResult.push({ roll: saveRoll, success: saveSuccess });
      damageResult.push(damageRoll);
    }

    setHits(hitsResult);
    setWounds(woundsResult);
    setSaves(savesResult);
    setDamage(damageResult);

    const total = damageResult.reduce((acc, curr) => acc + curr, 0);
    setTotalWounds(total);
  };

  const handleFnPToggle = () => {
    setFnPEnabled(!fnPEnabled);
  };

  const handleFnPChange = (e) => {
    setFnPValue(parseInt(e.target.value));
  };

  const handleInvulToggle = () => {
    setInvulEnabled(!invulEnabled);
  };

  const handleInvulChange = (e) => {
    setInvulValue(parseInt(e.target.value));
  };

  return (
    <div className={styles.container}>
      <Header title="Fight Phase" />
      <h2>Unit Attacking</h2>
      <div>
        <label>
          Number of Units:
          <input type="number" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <input type="checkbox" id="fnPToggle" checked={fnPEnabled} onChange={handleFnPToggle} />
        <label htmlFor="fnPToggle">Feel No Pain</label>
        {fnPEnabled && (
          <input type="number" value={fnPValue} onChange={handleFnPChange} placeholder="FNP Value" />
        )}
      </div>
      <div>
        <input type="checkbox" id="invulToggle" checked={invulEnabled} onChange={handleInvulToggle} />
        <label htmlFor="invulToggle">Invulnerable Save</label>
        {invulEnabled && (
          <input type="number" value={invulValue} onChange={handleInvulChange} placeholder="Invulnerable Save Value" />
        )}
      </div>
      <button onClick={handleAttack}>Perform Attacks</button>
      <h3>Attack Results</h3>
      {/* Display attack results here */}
      <Footer />
    </div>
  );
};

export default FightPhase;
