"use client"

import React, { useState } from 'react';
import styles from './styles.module.css';
import authService from "@/service/auth";
import {CrossIcon} from "@/icons/index";
import {useAuth} from "@/context/auth";
import {useFights} from "@/context/fight";
import {useUser} from "@/context/user";

interface AuthModalProps {
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
    const { login, register } = useAuth();
    const { getFights } = useFights();
    const { getUserInfo } = useUser();

    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const toggleMode = (): void => {
        setIsLogin(!isLogin);
        setError(null);
    };

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        try {
            if (isLogin) {
                await login(username, password);
            } else {
                await register(username, password);
            }
            getFights();
            getUserInfo();
            onClose();
        } catch (err) {
            setError('Ошибка. Пожалуйста, проверьте ваши данные.');
        }
    };

    function onOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        onClose();
    }

    return (
        <div className={styles.overlay} onClick={(e) => onOverlayClick(e)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <CrossIcon className={styles.icon}/>
                </button>
                <div className={styles.title}>{isLogin ? 'Вход' : 'Регистрация'}</div>
                <form onSubmit={handleSubmit} className={styles.form} >
                    <div className={styles.textField}>
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.textField}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/*TODO: подумать над отображением ошибки*/}
                    {error && <div className={styles.error}>{error}</div>}
                    <button type="submit" className={styles.submitButton}>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                <button className={styles.toggleButton} onClick={toggleMode}>
                    {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт? Войти'}
                </button>
            </div>
        </div>
    );
};

