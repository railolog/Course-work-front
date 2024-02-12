import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationLink = () => {
    const navigate = useNavigate();

    return (
        <div>
            Нет аккаунта? <span onClick={() => navigate('/register')}>Зарегистрируйтесь сейчас</span>
        </div>
    );
};

export default RegistrationLink;