"use client"

import Link from "next/link";
import styles from './styles.module.css';
import { usePathname } from 'next/navigation'

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
            <Link className={getClassName("/profile")} href="/profile">
                Мой профиль
            </Link>
            <Link className={getClassName("/top-up")} href="/top-up">
                Пополнить счёт
            </Link>
            <Link className={getClassName("/bets")} href="/bets">
                Мои ставки
            </Link>
            <Link className={getClassName("/fights")} href="/fights">
                Мои бои
            </Link>
            <Link className={getClassName("/create-fight")} href="/create-fight">
                Создать бой
            </Link>
            <Link className={getClassName("/pokemons")} href="/pokemons">
                Все покемоны
            </Link>
        </div>
    )
}