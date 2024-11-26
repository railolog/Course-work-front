import Link from "next/link";
import styles from './styles.module.css';

export const SideBar = () => {
    return (
        <div className={styles.container}>
            <Link className={styles.link} href="/profile">
                Мой профиль
            </Link>
            <Link className={styles.link} href="/top-up">
                Пополнить счёт
            </Link>
            <Link className={styles.link} href="/bets">
                Мои ставки
            </Link>
            <Link className={styles.link} href="/fights">
                Мои бои
            </Link>
            <Link className={styles.link} href="/create-fight">
                Создать бой
            </Link>
            <Link className={styles.link} href="/pokemons">
                Все покемоны
            </Link>
        </div>
    )
}