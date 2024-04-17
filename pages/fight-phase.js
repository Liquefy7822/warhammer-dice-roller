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
  const [ws, setWs] = useState(3);
  const [s, setS] = useState(4);
  const [save, setSave] = useState(4);
  const [unitWounds, setUnitWounds] = useState(1);
  const [unitToughness, setUnitToughness] = useState(3);
  const [fnPRolls, setFnPRolls] = useState([]);
  const [damageResults, setDamageResults] = useState([]);

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const handleAttack = () => {
    const hitsResult = [];
    const woundsResult = [];
    const savesResult = [];
    const damageResult = [];
    const fnPRollsResult = [];
    const damageResults = [];

    for (let i = 0; i < unitCount; i++) {
      const hitRoll = rollDice();
      const woundRoll = rollDice();
      const saveRoll = rollDice();
      const damageRoll = rollDice();
      const fnPRoll = fnPEnabled ? rollDice() : null;

      const hitSuccess = hitRoll >= ws;
      const woundSuccess = woundRoll >= s;
      const saveSuccess = saveRoll >= save;

      hitsResult.push({ roll: hitRoll, success: hitSuccess });
      woundsResult.push({ roll: woundRoll, success: woundSuccess });
      savesResult.push({ roll: saveRoll, success: saveSuccess });
      damageResult.push(damageRoll);
      fnPRollsResult.push(fnPRoll);

      let remainingDamage = damageRoll;
      if (saveSuccess && !fnPEnabled) {
        remainingDamage = 0;
      } else if (saveSuccess && fnPEnabled) {
        const fnPCount = fnPValue > 0 ? fnPValue : 0;
        for (let j = 0; j < fnPCount; j++) {
          const fnPRoll = rollDice();
          if (fnPRoll >= 5) remainingDamage--;
        }
        remainingDamage = Math.max(0, remainingDamage);
      }
      damageResults.push(remainingDamage);
    }

    setHits(hitsResult);
    setWounds(woundsResult);
    setSaves(savesResult);
    setDamage(damageResult);
    setFnPRolls(fnPRollsResult);
    setDamageResults(damageResults);

    const total = damageResults.reduce((acc, curr) => acc + curr, 0);
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
        <label>
          Wounds per Unit:
          <input type="number" value={unitWounds} onChange={(e) => setUnitWounds(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Toughness per Unit:
          <input type="number" value={unitToughness} onChange={(e) => setUnitToughness(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Weapon Skill (WS):
          <input type="number" value={ws} onChange={(e) => setWs(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Strength (S):
          <input type="number" value={s} onChange={(e) => setS(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Save:
          <input type="number" value={save} onChange={(e) => setSave(parseInt(e.target.value))} />
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
      <div className={styles.resultContainer}>
        <div className={styles.column}>
          <h4>Hits</h4>
          <ul>
            {hits.map((hit, index) => (
              <li key={index}>Unit {index + 1}: {hit.roll} {hit.success ? "Success" : "Fail"}</li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Wounds</h4>
          <ul>
            {wounds.map((wound, index) => (
              <li key={index}>Unit {index + 1}: {wound.roll} {wound.success ? "Success" : "Fail"}</li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Saves</h4>
          <ul>
            {saves.map((save, index) => (
              <li key={index}>Unit {index + 1}: {save.roll} {save.success ? "Success" : "Fail"}</li>
            ))}
          </ul>
        </div>
        {fnPEnabled && (
          <div className={styles.column}>
            <h4>FNP</h4>
            <ul>
              {fnPRolls.map((roll, index) => (
                <li key={index}>Unit {index + 1}: {roll >= 5 ? "Success" : "Fail"}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.column}>
          <h4>Damage</h4>
          <ul>
            {damageResults.map((value, index) => (
              <li key={index}>Unit {index + 1}: {value}</li>
            ))}
          </ul>
        </div>
      </div>
      <p>Total Wounds: {totalWounds}</p>
      <Footer />
    </div>
  );
};

export default FightPhase;

