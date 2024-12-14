import styles from './styles.module.css';
import Image from "next/image";
import {Bet} from "@/types/user";
import PokeballImage from '@/images/pokeball.png';
import UltraballImage from '@/images/ultra-ball.png';
import DollarImg from "@/images/dollar.png";
import React from "react";
import toast from "react-hot-toast";
import {DEFAULT_TOAST_OPTIONS} from "@/constants/toast";
import {useFights} from "@/context/fight";
import {useUser} from "@/context/user";

type BetCardProps = {
    bet: Bet;
}

export const BetCard: React.FC<BetCardProps> = ({ bet: { id, fight, profit, credits, betCoef, firstPokemonChosen}}) => {
    const { startFight, getUserBets } = useFights();
    const { getBalance } = useUser();

    async function startFightHandler() {
        try {
            await startFight(fight.id);
            await getUserBets();
            await getBalance();
        } catch (error) {
            toast.error('Ошибка при запуске боя', DEFAULT_TOAST_OPTIONS);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.id}># {id}</div>
                <div className={styles.pokemons}>
                    <div className={styles.pokemon}>
                        <Image className={styles.pokemonImage} height={24} width={24} src={PokeballImage}
                               alt="Pokemon image"/>
                        {fight.firstPokemon.name}
                    </div>
                    <p className={styles.shade}>vs</p>
                    <div className={styles.pokemon}>
                        <Image className={styles.pokemonImage} height={24} width={24} src={UltraballImage}
                               alt="Pokemon image"/>
                        {fight.secondPokemon.name}
                    </div>
                </div>
                <div className={styles.column}>
                    <span className={styles.shade}>Ставка:</span>
                    <Image src={DollarImg} height={16} width={16} alt="Dollar image"/>
                    <span>{credits}</span>
                </div>
                <div className={styles.column}>
                    <span className={styles.shade}>Победа:</span>
                    <span>{firstPokemonChosen ? fight.firstPokemon.name : fight.secondPokemon.name}</span>
                </div>
                <div className={styles.column}>
                    <span className={styles.shade}>Коэффициент:</span>
                    <span>{betCoef.toFixed(2)}</span>
                </div>
                {fight.isCompleted && (
                    <div className={styles.result}>
                        <span>Выигрыш:</span>
                        <Image src={DollarImg} height={16} width={16} alt="Dollar image"/>
                        <span>{profit?.toFixed(2)}</span>
                    </div>
                )}
            </div>
            {!fight.isCompleted && (
                <button className={styles.button} onClick={startFightHandler}>Начать бой</button>
            )}
        </div>

    )
}