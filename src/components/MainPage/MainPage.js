import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/MainPage.css';

const MainPage = () => {
    const [fights, setFights] = useState([]);
    const [userBalance, setUserBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFightsAndBalance = async () => {
            try {
                const fightsResponse = await axios.get('http://backend-url.com/fights');
                setFights(fightsResponse.data.fights);


                const userId = 1;
                const userBalanceResponse = await axios.get(`http://backend-url.com/user/balance/${userId}`);
                setUserBalance(userBalanceResponse.data.balance);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchFightsAndBalance();
    }, []);

    const handleBetClick = (fightId) => {
        navigate('/bet', { state: { fightId: fightId } });
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    return (
        <div>
            <div className="top-bar">
                <div className="balance">Баланс: {userBalance} кредитов</div>
                <div className="profile-icon" onClick={goToProfile}>Профиль</div>
            </div>
            <h1>Главная страница</h1>
            {fights.map((fight) => (
                <div key={fight.id}>
                    <h3>Бой №{fight.id}</h3>
                    <p>Первый Покемон: {fight.firstPokemon.name} (Тип: {fight.firstPokemon.type})</p>
                    <p>Второй Покемон: {fight.secondPokemon.name} (Тип: {fight.secondPokemon.type})</p>
                    <p>Тренер: {fight.trainer.name}</p>
                    <p>Место проведения: {fight.location.name}</p>
                    <p>Статус боя: {fight.isCompleted ? 'Завершен' : 'Не завершен'}</p>
                    <button onClick={() => handleBetClick(fight.id)}>Сделать ставку</button>
                </div>
            ))}
            <button onClick={() => navigate('/create-fight')}>Создать бой</button>
            <button onClick={() => navigate('/bet')}>Сделать ставку</button>
            <button onClick={() => navigate('/top-up')}>Пополнить баланс</button>
        </div>
    );
};

export default MainPage;
