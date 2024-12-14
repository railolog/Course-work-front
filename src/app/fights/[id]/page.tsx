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
import toast from "react-hot-toast";
import {DEFAULT_TOAST_OPTIONS} from "@/constants/toast";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
    const {fightById, getFightById, startFight} = useFights();

    function goBack() {
        redirect(FIGHTS_URL);
    }

    async function startFightHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        try {
            const resolvedParams = await params;
            const id = resolvedParams?.id;
            await startFight(id);
            await getFightById(id);
        } catch (error) {
            toast.error('Ошибка при запуске боя', DEFAULT_TOAST_OPTIONS);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedParams = await params;
                const id = resolvedParams?.id;
                await getFightById(id);
            } catch (error) {
                toast.error('Ошибка при загрузке данных', DEFAULT_TOAST_OPTIONS);
            }
        };

        fetchData();
    }, [params]);

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
                        className={fightById?.isCompleted && fightById?.firstWon ? styles.won : ''}>{fightById?.firstPokemon?.name ?? 'Неизвестный'}</span> vs <span
                        className={fightById?.isCompleted && !fightById?.firstWon ? styles.won : ''}>{fightById?.secondPokemon?.name ?? 'Неизвестный'}</span>
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
                    {fightById?.isCompleted && (
                        <div className={styles.title}>
                            Победитель:
                            <span
                                className={styles.text}>{fightById?.firstWon ? fightById?.firstPokemon?.name ?? 'Неизвестно' : fightById?.secondPokemon?.name ?? 'Неизвестно'}</span>
                        </div>
                    )}
                </div>
                <div className={styles.columnWrapper}>
                    <div className={styles.pokemons}>
                        <PokemonCard
                            pokemon={fightById?.firstPokemon}
                            image={PokeballImage}
                            coefficient={fightById?.coefficientFirst ?? 0}
                            won={fightById?.isCompleted && fightById?.firstWon}
                        />
                        <div className={styles.divider}>
                            vs
                        </div>
                        <PokemonCard
                            pokemon={fightById?.secondPokemon}
                            image={UltraballImage}
                            coefficient={fightById?.coefficientSecond ?? 0}
                            won={fightById?.isCompleted && !fightById?.firstWon}
                        />
                    </div>
                    {!fightById?.isCompleted && (
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={startFightHandler}>Начать бой</button>
                            <button className={styles.betButton}>Сделать ставку</button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}