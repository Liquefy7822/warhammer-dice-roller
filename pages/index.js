// pages/index.js

import React, { useState } from 'react';

const IndexPage = () => {
  const [diceCount, setDiceCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [rolls, setRolls] = useState([]);
  const [results, setResults] = useState([]);

  const rollDice = () => {
    let newRolls = [];
    let newResults = [];

    for (let i = 0; i < diceCount; i++) {
      const rollValue = Math.floor(Math.random() * 6) + 1;
      newRolls.push(rollValue);
      newResults.push(rollValue + modifier);
    }

    setRolls(newRolls);
    setResults(newResults);
  };

  const handleDiceCountChange = (e) => {
    setDiceCount(parseInt(e.target.value));
  };

  const handleModifierChange = (e) => {
    setModifier(parseInt(e.target.value));
  };

  return (
    <div>
      <h1>Warhammer Dice Roller</h1>
      <div>
        <label>
          Number of Dice:
          <input type="number" value={diceCount} onChange={handleDiceCountChange} />
        </label>
      </div>
      <div>
        <label>
          Modifier:
          <input type="number" value={modifier} onChange={handleModifierChange} />
        </label>
      </div>
      <button onClick={rollDice}>Roll Dice</button>
      <div>
        <h2>Rolls:</h2>
        <ul>
          {rolls.map((roll, index) => (
            <li key={index}>
              Roll {index + 1}: {roll} + {modifier} = {results[index]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;

