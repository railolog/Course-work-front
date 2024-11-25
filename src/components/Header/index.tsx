"use client"

import styles from './styles.module.css';
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { ProfileIcon, AddIcon } from "@/icons/index";
import DollarImg from '@/images/dollar.png';

export const Header = () => {
    const [userBalance, setUserBalance] = useState(5000);
    const [useLogin, setUserLogin] = useState<string>("dasha");

    return (
        <div className={styles.container}>
            <div className={styles.remains}>
                <Image src={DollarImg} height={16} width={16} alt="Dollar image"/>
                {userBalance.toFixed(2)}
            </div>
            <button className={styles.button}>
                <AddIcon className={styles.icon}/>
                Пополнить
            </button>
            <Link className={styles.profile} href="/profile">
                {useLogin}
                <ProfileIcon className={styles.icon}/>
            </Link>
        </div>
    )
}