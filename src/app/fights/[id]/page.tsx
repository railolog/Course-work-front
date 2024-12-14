"use client"

import styles from './page.module.css';
import {useFights} from "@/context/fight";
import React, {useEffect} from "react";
import PokeballImage from '@/images/pokeball.png';
import UltraballImage from '@/images/ultra-ball.png';
import {AngleRightIcon} from "@/icons/index";
import {redirect} from "next/navigation";
import {FIGHTS_URL} from "@/constants/url";
import {PokemonCard} from "@/components/PokemonCard";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
    const {fightById, getFightById} = useFights();

    function goBack() {
        redirect(FIGHTS_URL);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedParams = await params;
                const id = resolvedParams?.id;
                if (id) {
                    await getFightById(id);
                } else {
                    console.error('ID is not defined in params');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params, getFightById]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigationContainer}>
                <div className={styles.navigation} onClick={goBack}>
                    <span>Мои бои</span>
                    <AngleRightIcon className={styles.icon}/>
                </div>
                <div className={styles.here}>
                    <span># {fightById?.id ?? 'Неизвестно'}</span>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.fightName}>
                    <span
                        className={fightById?.firstWon ? styles.won : ''}>{fightById?.firstPokemon?.name ?? 'Неизвестный'}</span> vs <span
                        className={fightById?.firstWon ? '' : styles.won}>{fightById?.secondPokemon?.name ?? 'Неизвестный'}</span>
                    </div>
                    <div className={styles.title}>
                        Локация:
                        <span className={styles.text}>{fightById?.location?.name ?? 'Неизвестна'}</span>
                    </div>
                    <div className={styles.title}>
                        Описание локации:
                        <span className={styles.text}>{fightById?.location?.description ?? 'Не указано'}</span>
                    </div>
                    <div className={styles.title}>
                        Бой окончен?
                        <span className={styles.text}>{fightById?.isCompleted ? 'Да' : 'Нет'}</span>
                    </div>
                    <div className={styles.title}>
                        Победитель:
                        <span
                            className={styles.text}>{fightById?.firstWon ? fightById?.firstPokemon.name : fightById?.secondPokemon.name}</span>
                    </div>
                </div>
                <div className={styles.pokemons}>
                    <PokemonCard
                        pokemon={fightById?.firstPokemon}
                        image={PokeballImage}
                        coefficient={fightById?.coefficientFirst ?? 0}
                        won={fightById?.firstWon}
                    />
                    <div className={styles.divider}>
                        vs
                    </div>
                    <PokemonCard
                        pokemon={fightById?.secondPokemon}
                        image={UltraballImage}
                        coefficient={fightById?.coefficientSecond ?? 0}
                        won={!fightById?.firstWon}
                    />
                </div>
            </div>
        </div>
    )
}