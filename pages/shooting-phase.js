// pages/shooting-phase.js

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ShootingPhase = () => {
  const [unitCount, setUnitCount] = useState(1);
  const [ws, setWs] = useState(3);
  const [s, setS] = useState(4);
  const [save, setSave] = useState(4);
  const [invul, setInvul] = useState(0);
  const [fnp, setFnp] = useState(0);
  const [shootingResult, setShootingResult] = useState('');

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const performShooting = () => {
    let totalHits = 0;
    for (let i = 0; i < unitCount; i++) {
      const hitRoll = rollDice();
      if (hitRoll >= ws) {
        const woundRoll = rollDice();
        if (woundRoll >= s) {
          const saveRoll = rollDice();
          if (saveRoll >= save) {
            let actualWounds = 1;
            if (invul > 0 && rollDice() >= invul) {
              actualWounds = 0;
            } else if (fnp > 0) {
              for (let j = 0; j < actualWounds; j++) {
                if (rollDice() >= fnp) {
                  actualWounds--;
                }
              }
            }
            totalHits += actualWounds;
          }
        }
      }
    }
    setShootingResult(`Total Hits: ${totalHits}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Shooting Phase" />
      <h2>Unit Shooting</h2>
      <div>
        <label>
          Number of Units:
          <input type="number" value={unitCount} onChange={(e) => setUnitCount(parseInt(e.target.value))} />
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
        <label>
          Invulnerable Save (Invul):
          <input type="number" value={invul} onChange={(e) => setInvul(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Feel No Pain (FNP):
          <input type="number" value={fnp} onChange={(e) => setFnp(parseInt(e.target.value))} />
        </label>
      </div>
      <button onClick={performShooting}>Perform Shooting</button>
      {shootingResult && (
        <p>{shootingResult}</p>
      )}
      <Footer />
    </div>
  );
};

export default ShootingPhase;
