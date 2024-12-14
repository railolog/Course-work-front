"use client"

import styles from './page.module.css';
import {useFights} from "@/context/fight";
import {BetCard} from "@/components/BetCard";
import React, {useEffect, useState} from "react";

export default function Page() {
    const { bets, getUserBets } = useFights();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getUserBets();
        setLoading(false);
    }, []);

    if (loading) {
        return <div className={styles.loading}>Загрузка данных...</div>;
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Мои ставки</p>
            {bets.length ? (
                bets.map((bet) => {
                    return (
                        <BetCard bet={bet} key={bet.id}/>
                    )
                })
            ) : (
                <div className={styles.subtitle}>Начните ставить прямо сейчас! <br/>Создавайте бой и выигрывайте!</div>
            )}
            {}
        </div>
    )
}