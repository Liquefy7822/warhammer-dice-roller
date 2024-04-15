import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useState } from 'react';

const IndexPage = () => {
  const [diceCount, setDiceCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [rolls, setRolls] = useState([]);
  const [result, setResult] = useState(0);

  const rollDice = () => {
    let total = 0;
    let newRolls = [];

    for (let i = 0; i < diceCount; i++) {
      const rollValue = Math.floor(Math.random() * 6) + 1;
      total += rollValue;
      newRolls.push(rollValue);
    }

    total += modifier;
    setResult(total);
    setRolls(newRolls);
  };

  const rerollDie = (index) => {
    const newRolls = [...rolls];
    newRolls[index] = Math.floor(Math.random() * 6) + 1;
    setRolls(newRolls);

    let total = 0;
    newRolls.forEach((roll) => {
      total += roll;
    });
    total += modifier;
    setResult(total);
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
              Roll {index + 1}: {roll}
              <button onClick={() => rerollDie(index)}>Reroll</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
};

export default IndexPage;
