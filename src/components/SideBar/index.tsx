"use client"

import Link from "next/link";
import styles from './styles.module.css';
import { usePathname } from 'next/navigation'
import {BETS_URL, CREATE_FIGHT_URL, FIGHTS_URL, POKEMONS_URL, PROFILE_URL, TOP_UP_URL} from "@/constants/url";

export const SideBar = () => {
    const pathname = usePathname();

    function isCurrentPage(page: string) {
        return pathname === page;
    }

    function getClassName(page: string) {
        return `${styles.link} ${isCurrentPage(page) ? styles.active : ""}`
    }

    return (
        <div className={styles.container}>
            <Link className={getClassName(PROFILE_URL)} href={PROFILE_URL}>
                Мой профиль
            </Link>
            <Link className={getClassName(TOP_UP_URL)} href={TOP_UP_URL}>
                Пополнить счёт
            </Link>
            <Link className={getClassName(BETS_URL)} href={BETS_URL}>
                Мои ставки
            </Link>
            <Link className={getClassName(FIGHTS_URL)} href={FIGHTS_URL}>
                Мои бои
            </Link>
            <Link className={getClassName(CREATE_FIGHT_URL)} href={CREATE_FIGHT_URL}>
                Создать бой
            </Link>
            <Link className={getClassName(POKEMONS_URL)} href={POKEMONS_URL}>
                Все покемоны
            </Link>
        </div>
    )
}