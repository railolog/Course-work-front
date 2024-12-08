"use client"

import React, {useState} from "react";
import {ModalProps} from "@/types/modals";
import {ModalLayout} from "@/components/modals/ModalLayout";
import styles from "./styles.module.css";
import {useUser} from "@/context/user";

type ConfirmModalProps = ModalProps & {
    onAccept: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ onClose, onAccept }) => {
    const {  login } = useUser();
    const [ inputValue, setInputValue ] = useState<string>("")
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        if (inputValue.trim() === login) {
            onAccept();
            onClose();
            return;
        }
        setError("Введено неверное значение, попробуйте снова");
    };

    return (
        <ModalLayout onClose={onClose}>
            <div className={styles.title}>Чтобы подтвердить пополнение счёта, введите свой логин без кавычек и знаков препинания</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.textField}>
                    <label htmlFor="username">Введите имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                    />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button type="submit" className={styles.submitButton}>Подтвердить</button>
            </form>
        </ModalLayout>
    )
}