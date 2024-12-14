import React from 'react';
import styles from './styles.module.css';
import {Pokemon} from "@/components/FightCard/elements/Pokemon";
import PokeballImage from '@/images/pokeball.png';
import UltraballImage from '@/images/ultra-ball.png';
import {Fight} from "@/types/fights";
import {redirect} from "next/navigation";
import {FIGHTS_URL} from "@/constants/url";

type FightCardProps = {
    fight: Fight;
}

export const FightCard: React.FC<FightCardProps> = ({ fight: { id, firstPokemon, secondPokemon, isCompleted, coefficientFirst, coefficientSecond, firstWon }}) => {
    function openFightCard(id: number) {
        redirect(`${FIGHTS_URL}/${id}`);
    }

    return (
        <div className={styles.container} onClick={() => openFightCard(id)}>
            <div className={styles.pokemons}>
                <Pokemon name={firstPokemon.name} type={firstPokemon.types?.join(', ')} image={PokeballImage} won={isCompleted && firstWon}/>
                <p>vs</p>
                <Pokemon name={secondPokemon.name} type={secondPokemon.types?.join(', ')} image={UltraballImage} won={isCompleted && !firstWon}/>
            </div>
            <div className={styles.coefficients}>
                <div className={styles.coefficient}>{coefficientFirst.toFixed(2)}</div>
                <div className={styles.coefficient}>{coefficientSecond.toFixed(2)}</div>
            </div>
            {isCompleted ? (
                <button disabled className={styles.button}>Завершен</button>
            ) : (
                <>
                    <button className={styles.button}>Начать бой</button>
                    <button className={styles.betButton}>Сделать ставку</button>
                </>
            )}
        </div>
    )
}