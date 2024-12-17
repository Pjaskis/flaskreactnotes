import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Lottery() {
    const [lotteryResult, setLotteryResult] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [chosenNumber, setChosenNumber] = useState('');
    const [rolled, setRolled] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/lottery/${chosenNumber}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        console.log(response.data)
        if (response.data !== null) {
            setLotteryResult(response.data);
            setLoading(false);
        } else {
            console.error("There was an error rolling the dice!");
            setLoading(false);
        }
    }

    const handleGoBack = () => {
        navigate('/home');
    };

    return <div className="lottery-game">
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="chosenNumbers">Choose your number:</label>
                <input
                    type="text"
                    id="chosenNumber"
                    value={chosenNumber}
                    onChange={(e) => setChosenNumber(e.target.value)}
                />
            </div>
            <button onClick={onSubmit} disabled={loading}>
                {loading ? 'Checking...' : 'Check Lottery'}
            </button>
            <button onClick={handleGoBack}>Go Back</button>

            {lotteryResult !== null && (
                <div className="result">
                    <p>{lotteryResult}</p>
                </div>
            )}
        </form>
    </div>


}

export default Lottery;