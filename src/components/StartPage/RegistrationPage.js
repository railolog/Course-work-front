import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Здесь должен быть запрос к API для регистрации
            await axios.post('http://backend-url.com/register', userData);
            navigate('/login');
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    };

    return (
        <div>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Имя пользователя"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    requiredA
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default RegistrationPage;