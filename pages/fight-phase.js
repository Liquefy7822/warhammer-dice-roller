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
  const [invulnerableSaves, setInvulnerableSaves] = useState([]);
  const [fnpSaves, setFnPSaves] = useState([]);
  const [finalDamage, setFinalDamage] = useState([]);

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const handleAttack = () => {
    const hitsResult = [];
    const woundsResult = [];
    const savesResult = [];
    const damageResult = [];
    const invulnerableSavesResult = [];
    const fnpSavesResult = [];
    const finalDamageResult = [];

    for (let i = 0; i < unitCount; i++) {
      const hitRoll = rollDice();
      const woundRoll = rollDice();
      const saveRoll = rollDice();
      const damageRoll = rollDice();

      const hitSuccess = hitRoll >= 3; // Assuming Weapon Skill (WS) or Ballistic Skill (BS) is 3+
      const woundSuccess = woundRoll >= 4; // Assuming Strength (S) > Target's Toughness (T)
      const saveSuccess = saveRoll >= 4; // Assuming average save roll
      const isCriticalHit = hitRoll === 6;
      const isCriticalWound = woundRoll === 6;
      const invulnerableSaveRoll = rollDice();
      const fnpRolls = [rollDice(), rollDice(), rollDice(), rollDice()];

      hitsResult.push({ roll: hitRoll, success: hitSuccess, isCritical: isCriticalHit });
      woundsResult.push({ roll: woundRoll, success: woundSuccess, isCritical: isCriticalWound });
      savesResult.push({ roll: saveRoll, success: saveSuccess });
      damageResult.push(damageRoll);
      invulnerableSavesResult.push(invulnerableSaveRoll);
      fnpSavesResult.push(fnpRolls);
      
      let finalDamage = damageRoll;
      for (let j = 0; j < fnpRolls.length; j++) {
        if (fnpRolls[j] >= 5) {
          finalDamage--;
        }
      }
      finalDamageResult.push(finalDamage);
    }

    setHits(hitsResult);
    setWounds(woundsResult);
    setSaves(savesResult);
    setDamage(damageResult);
    setInvulnerableSaves(invulnerableSavesResult);
    setFnPSaves(fnpSavesResult);
    setFinalDamage(finalDamageResult);

    const total = finalDamageResult.reduce((acc, curr) => acc + curr, 0);
    setTotalWounds(total);
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
      <button onClick={handleAttack}>Perform Attacks</button>
      <h3>Attack Results</h3>
      <div className={styles.resultsContainer}>
        <div className={styles.column}>
          <p>Hits:</p>
          <ul>
            {hits.map((hit, index) => (
              <li key={index}>
                Roll: {hit.roll} - {hit.success ? 'Success' : 'Fail'}
                {hit.isCritical && ' (Critical Hit)'}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p>Wounds:</p>
          <ul>
            {wounds.map((wound, index) => (
              <li key={index}>
                Roll: {wound.roll} - {wound.success ? 'Success' : 'Fail'}
                {wound.isCritical && ' (Critical Wound)'}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p>Saves:</p>
          <ul>
            {saves.map((save, index) => (
              <li key={index}>
                Roll: {save.roll} - {save.success ? 'Success' : 'Fail'}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p>Invulnerable Saves:</p>
          <ul>
            {invulnerableSaves.map((invulnerableSave, index) => (
              <li key={index}>
                Roll: {invulnerableSave}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p>Final Damage:</p>
          <ul>
            {finalDamage.map((damage, index) => (
              <li key={index}>
                {damage}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p>Total Wounds Inflicted: {totalWounds}</p>
      <Footer />
    </div>
  );
};

export default FightPhase;
