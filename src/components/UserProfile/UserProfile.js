import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState({ login: '', balance: 0 });
    const [bets, setBets] = useState([]);

    useEffect(() => {

        const userId = 1;

        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://backend-url.com/user/${userId}`);
                setUser(userResponse.data);

                // Получение ставок пользователя
                const betsResponse = await axios.get(`http://backend-url.com/bets/${userId}`);
                setBets(betsResponse.data.bets);
            } catch (error) {
                console.error('Ошибка при получении данных о пользователе:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h2>Профиль пользователя</h2>
            <p>Логин: {user.login}</p>
            <p>Баланс: {user.balance}</p>
            <h3>Сделанные ставки:</h3>
            {bets.map((bet) => (
                <div key={bet.id}>
                    <p>Бой: {bet.fight.id}</p>
                    <p>Сумма ставки: {bet.credits}</p>
                    <p>Ставка на первого покемона: {bet.firstPokemonChoosen ? 'Да' : 'Нет'}</p>
                </div>
            ))}
        </div>
    );
};

export default UserProfile;