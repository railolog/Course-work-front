import React, {useState} from 'react';
import styles from './styles.module.css';
import {Pokemon} from "@/components/FightCard/elements/Pokemon";
import PokeballImage from '@/images/pokeball.png';
import UltraballImage from '@/images/ultra-ball.png';
import {Fight} from "@/types/fights";
import {redirect} from "next/navigation";
import {FIGHTS_URL} from "@/constants/url";
import {useFights} from "@/context/fight";
import toast from "react-hot-toast";
import {DEFAULT_TOAST_OPTIONS} from "@/constants/toast";

type FightCardProps = {
    fight: Fight;
}

export const FightCard: React.FC<FightCardProps> = ({ fight: { id, firstPokemon, secondPokemon, isCompleted, coefficientFirst, coefficientSecond, firstWon }}) => {
    const { startFight, getFights } = useFights();

    function openFightCard() {
        redirect(`${FIGHTS_URL}/${id}`);
    }

    async function startFightHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        try {
            await startFight(id);
            await getFights();
        } catch (error) {
            toast.error('Ошибка при запуске боя', DEFAULT_TOAST_OPTIONS);
        }
    }

    return (
        <div className={styles.container} onClick={openFightCard}>
            <div className={styles.pokemons}>
                <Pokemon name={firstPokemon.name} type={firstPokemon.types?.join(', ')} image={PokeballImage} won={isCompleted && firstWon} coefficient={coefficientFirst}/>
                <p>vs</p>
                <Pokemon name={secondPokemon.name} type={secondPokemon.types?.join(', ')} image={UltraballImage} won={isCompleted && !firstWon} coefficient={coefficientSecond}/>
            </div>
            {isCompleted ? (
                <button disabled className={styles.button}>Завершен</button>
            ) : (
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={startFightHandler}>Начать бой</button>
                    <button className={styles.betButton}>Сделать ставку</button>
                </div>
            )}
        </div>
    )
}