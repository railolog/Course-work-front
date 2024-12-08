"use client"

import styles from './styles.module.css';
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { ProfileIcon, AddIcon } from "@/icons/index";
import DollarImg from '@/images/dollar.png';
import LogoImg from '@/images/star.png';
import {useAuth} from "@/context/auth";
import {AuthModal} from "@/components/modals/AuthModal";
import {useUser} from "@/context/user";
import {redirect} from "next/navigation";

export const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const { balance, login } = useUser();

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <div className={styles.container}>
                <Link className={styles.logo} href="/">
                    <Image src={LogoImg} height={42} width={42} alt="Logo image"/>
                    Pokebet
                </Link>
                {isAuthenticated ? (
                    <div className={styles.balance}>
                        <div className={styles.remains}>
                            <Image src={DollarImg} height={16} width={16} alt="Dollar image"/>
                            {balance.toFixed(2)}
                        </div>
                        <button className={styles.button} onClick={() => redirect('/top-up')}>
                            <AddIcon className={styles.icon}/>
                            Пополнить
                        </button>
                    </div>
                ) : (
                    <div></div>
                )}
                {/*TODO: подумать как сюда вписать выход из системы*/}
                {isAuthenticated ? (
                    <div className={styles.profileContainer}>
                        <Link className={styles.profile} href="/src/app/profile/page">
                            {login}
                            <ProfileIcon className={styles.icon}/>
                        </Link>
                        <button className={styles.login} onClick={logout}>
                            Выйти
                        </button>
                    </div>
                ) : (
                    <button className={styles.login} onClick={() => setShowModal(true)}>
                        Войти
                    </button>
                )}
            </div>

            {showModal && <AuthModal onClose={() => setShowModal(false)} />}
        </>
    )
}