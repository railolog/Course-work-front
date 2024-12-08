"use client"

import styles from './page.module.css';
import Image from "next/image";
import DollarImg from "@/images/dollar.png";
import React, {useState} from "react";
import {useUser} from "@/context/user";
import {ConfirmModal} from "@/components/modals/ConfirmModal";
import toast from "react-hot-toast";
import {DEFAULT_TOAST_OPTIONS} from "@/constants/toast";

export default function Page() {
    const { balance, login, topUp } = useUser();

    const [topUpAmount, setTopUpAmount] = useState<number | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(false);

    function randomAmount() {
        setTopUpAmount(Math.floor(Math.random() * 10000));
    }

    function openModal(event: React.FormEvent) {
        event.preventDefault();

        if (topUpAmount) {
            setShowModal(true);
        }
        else {
            toast.error("Пожалуйста, введите сумму для пополнения", DEFAULT_TOAST_OPTIONS);
        }
    }

    async function handleSubmit() {
        if (topUpAmount) {
            try {
                await topUp(topUpAmount);
            }
            catch (e) {
                toast.error("Что-то пошло не так, попробуйте позже", DEFAULT_TOAST_OPTIONS);
                return;
            }
            toast.success(`Успешно пополнили баланс на ${topUpAmount} 💰`, DEFAULT_TOAST_OPTIONS);
        }
    }

    return (
        <>
        <div className={styles.container}>
            <form onSubmit={openModal} className={styles.form}>
                <div className={styles.balance}>
                    Ваш баланс:
                    <span className={styles.money}>
                    <Image src={DollarImg} height={16} width={16} alt="Dollar image"/>
                        {balance.toFixed(2)}
                </span>
                </div>
                <div className={styles.input}>
                    <label htmlFor="top-up">Введите сумму для пополнения</label>
                    <input
                        type="number"
                        id="top-up"
                        value={topUpAmount ?? 0}
                        onChange={(e) => setTopUpAmount(Number(e.target.value))}
                        required
                    />
                </div>
                <div className={styles.buttons}>
                    <button className={styles.randomButton} onClick={(e) => {
                        e.preventDefault();
                        randomAmount();
                    }}>Ввести случайное число</button>
                    <button type="submit" className={styles.submitButton}>Пополнить</button>
                </div>
            </form>
        </div>
        {showModal && <ConfirmModal onClose={() => setShowModal(false)} onAccept={handleSubmit}/>}
        </>
    )
}