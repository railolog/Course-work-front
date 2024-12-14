"use client"

import styles from './page.module.css';
import {useFights} from "@/context/fight";
import {FightCard} from "@/components/FightCard";
import React from "react";
import {CREATE_FIGHT_URL, FIGHTS_URL} from "@/constants/url";
import {redirect} from "next/navigation";

export default function Page() {
    const { fights } = useFights();

    return (
        <>
            {fights.length ? (
                <div className={styles.fightsContainer} >
                    <div className={styles.fightsTitle}>Мои бои</div>
                    <div className={styles.fightsSubtitle}>Всего - {fights.length}</div>
                    <div className={styles.fights}>
                        {fights.map((fight) => (
                            <FightCard fight={fight} key={fight.id}/>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.emptyContainer}>
                    <p className={styles.emptyTitle}>Тут будут ваши проведенные бои, давайте начнём!</p>
                    <button className={styles.button} onClick={() => redirect(CREATE_FIGHT_URL)}>Создать бой</button>
                </div>
            )}
        </>
    )
}