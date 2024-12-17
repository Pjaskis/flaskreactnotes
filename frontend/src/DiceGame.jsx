import React, { useState } from 'react';
import axios from 'axios';
import './styles/DiceGame.css';
import { useNavigate } from 'react-router-dom';

function DiceGame() {
  const [diceResult, setDiceResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const rollDice = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:5000/roll_dice')
      .then(response => {
        setDiceResult(response.data.result);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error rolling the dice!", error);
        setLoading(false);
      });
  };

   
    const handleGoBack = () => {
        navigate('/home');
    };

  return (
    <div className="dice-game">
      <h2>Roll the Dice</h2>
      <button onClick={rollDice} disabled={loading}>
        {loading ? 'Rolling...' : 'Roll Dice'}
      </button>
      {diceResult !== null && (
        <div className="result">
          <p>You rolled a {diceResult}!</p>
        </div>
      )}
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default DiceGame;
