import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const BetPage = () => {
    const [betAmount, setBetAmount] = useState('');
    const [firstPokemonChoosen, setFirstPokemonChoosen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const fightId = location.state?.fightId;

    const handleBetSubmit = async () => {
        if (!fightId || !betAmount) {
            alert('Пожалуйста, введите сумму ставки.');
            return;
        }
        try {
            await axios.post('http://backend-url.com/bets/bet', {
                bet: {
                    fightId: fightId,
                    credits: betAmount,
                    firstPokemonChoosen: firstPokemonChoosen
                }
            });
            alert('Ставка сделана!');
        } catch (error) {
            alert('Ошибка при размещении ставки. Пожалуйста, попробуйте снова.');
        }
    };

    const handleStartFight = async () => {
        try {
            await axios.post('http://backend-url.com/fights/start', { fightId: fightId });
            alert('Бой запущен!');
            navigate('/main');
        } catch (error) {
            alert('Ошибка при запуске боя. Пожалуйста, попробуйте снова.');
        }
    };

    return (
        <div>
            <h2>Сделать ставку на бой №{fightId}</h2>
            <input
                type="number"
                placeholder="Сумма ставки"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
            />
            <div>
                <label>
                    <input
                        type="radio"
                        name="pokemonChoice"
                        checked={firstPokemonChoosen}
                        onChange={() => setFirstPokemonChoosen(true)}
                    />
                    Первый покемон
                </label>
                <label>
                    <input
                        type="radio"
                        name="pokemonChoice"
                        checked={!firstPokemonChoosen}
                        onChange={() => setFirstPokemonChoosen(false)}
                    />
                    Второй покемон
                </label>
            </div>
            <button onClick={handleBetSubmit}>Сделать ставку</button>
            <button onClick={handleStartFight}>Запустить бой</button>
        </div>
    );
};

export default BetPage;