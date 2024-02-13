import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BalanceTopUp = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const handleTopUp = async (event) => {
        event.preventDefault();
        try {
            // Замените URL вашего API
            await axios.post('http://localhost:6969/payment', {
                cardNumber,
                expiryDate,
                cvv,
                amount
            });
            alert('Баланс успешно пополнен!');
            navigate('/main');
        } catch (error) {
            alert('Ошибка при пополнении баланса. Пожалуйста, попробуйте снова.');
        }
    };

    const handleReturn = () => {
        navigate('/main'); // Перенаправление на главную страницу
    };

    return (
        <div>
            <h2>Пополнение баланса</h2>
            <form onSubmit={handleTopUp}>
                <div>
                    <label>Номер карты:</label>
                    <input
                        type="number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Срок действия:</label>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>CVV:</label>
                    <input
                        type="number"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Сумма пополнения:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Пополнить</button>
            </form>
            <button onClick={handleReturn}>Вернуться на главную страницу</button>
        </div>
    );
};

export default BalanceTopUp;