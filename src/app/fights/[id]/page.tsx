"use client"

import styles from './page.module.css';
import {useFights} from "@/context/fight";
import React, {useEffect} from "react";
import Image from "next/image";
import PokeballImage from '@/images/pokeball.png';
import UltraballImage from '@/images/ultra-ball.png';
import {AngleRightIcon} from "@/icons/index";
import {redirect} from "next/navigation";
import {FIGHTS_URL} from "@/constants/url";

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
                    <div className={`${styles.pokemon} ${fightById?.firstWon ? styles.won : ''}`}>
                        <div className={styles.mainInfo}>
                            <Image className={styles.pokemonImage} height={80} width={80} src={PokeballImage}
                                   alt="Pokemon image"/>
                            <div className={styles.name}>
                                {fightById?.firstPokemon?.name ?? 'Неизвестный'}
                            </div>
                            <div className={styles.types}>
                                {fightById?.firstPokemon?.types.join(', ') ?? 'Стихии неизвестны'}
                            </div>
                            <div className={styles.trainer}>
                                Тренер: {fightById?.firstPokemon?.trainer?.name ?? 'Тренер неизвестен'}
                            </div>
                        </div>
                        <div className={styles.coefficient}>
                            {fightById?.coefficientFirst?.toFixed(2) ?? 0}
                        </div>
                    </div>
                    <div className={styles.divider}>
                        vs
                    </div>
                    <div className={`${styles.pokemon} ${fightById?.firstWon ? '' : styles.won}`}>
                        <div className={styles.mainInfo}>
                            <Image className={styles.pokemonImage} height={80} width={80} src={UltraballImage}
                                   alt="Pokemon image"/>
                            <div className={styles.name}>
                                {fightById?.secondPokemon?.name ?? 'Неизвестный'}
                            </div>
                            <div className={styles.types}>
                                {fightById?.secondPokemon?.types.join(', ') ?? 'Стихии неизвестны'}
                            </div>
                            <div className={styles.trainer}>
                                Тренер: {fightById?.secondPokemon?.trainer?.name ?? 'Тренер неизвестен'}
                            </div>
                        </div>
                        <div className={styles.coefficient}>
                            {fightById?.coefficientSecond?.toFixed(2) ?? 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}