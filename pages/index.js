// pages/index.js

import React, { useState } from 'react';

const IndexPage = () => {
  const [diceType, setDiceType] = useState("d6"); // State to track selected dice type
  const [diceCount, setDiceCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [rolls, setRolls] = useState([]);
  const [results, setResults] = useState([]);

  const rollDice = () => {
    let newRolls = [];
    let newResults = [];

    for (let i = 0; i < diceCount; i++) {
      let rollValue = 0;
      if (diceType === "d6") {
        rollValue = Math.floor(Math.random() * 6) + 1;
      } else if (diceType === "d3") {
        rollValue = Math.floor(Math.random() * 3) + 1;
      }
      newRolls.push(rollValue);
      newResults.push(rollValue + modifier);
    }

    setRolls(newRolls);
    setResults(newResults);
  };

  const rerollDie = (index) => {
    const newRolls = [...rolls];
    const newResults = [...results];

    if (diceType === "d6") {
      newRolls[index] = Math.floor(Math.random() * 6) + 1;
    } else if (diceType === "d3") {
      newRolls[index] = Math.floor(Math.random() * 3) + 1;
    }
    newResults[index] = newRolls[index] + modifier;

    setRolls(newRolls);
    setResults(newResults);
  };

  const handleDiceCountChange = (e) => {
    setDiceCount(parseInt(e.target.value));
  };

  const handleModifierChange = (e) => {
    setModifier(parseInt(e.target.value));
  };

  const handleDiceTypeChange = (e) => {
    setDiceType(e.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
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
      <div>
        <input type="radio" id="d6" name="diceType" value="d6" checked={diceType === "d6"} onChange={handleDiceTypeChange} />
        <label htmlFor="d6">d6</label>
        <input type="radio" id="d3" name="diceType" value="d3" checked={diceType === "d3"} onChange={handleDiceTypeChange} />
        <label htmlFor="d3">d3</label>
      </div>
      <button onClick={rollDice}>Roll Dice</button>
      <div>
        <h2>Rolls:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {rolls.map((roll, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              Roll {index + 1}: {roll} + {modifier} = {results[index]}
              <button onClick={() => rerollDie(index)}>Reroll</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
