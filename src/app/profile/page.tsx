"use client"

import styles from './styles.module.css';
import {useUser} from "@/context/user";
import Image from "next/image";
import DollarImg from "@/images/dollar.png";
import React from "react";
import {useAuth} from "@/context/auth";
import {redirect} from "next/navigation";

export default function Page() {
    const { logout } = useAuth();
    const { balance, login } = useUser();

    function onLogoutClick() {
        logout();
        redirect('/');
    }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.login}>Имя пользователя:
                    <span>{login}</span>
                </div>
                <div className={styles.balance}>Баланс:
                    <span className={styles.money}>
                    <Image src={DollarImg} height={16} width={16} alt="Dollar image"/>
                        {balance.toFixed(2)}
                </span>
                </div>
            </div>
            <button className={styles.logout} onClick={onLogoutClick}>
                Выйти
            </button>
        </div>
    )
}