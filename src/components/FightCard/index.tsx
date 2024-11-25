import styles from './styles.module.css';
import {Pokemon} from "@/components/FightCard/elements/Pokemon";
import PokeballImage from '@/images/pokeball.png';
import UltraballImage from '@/images/ultra-ball.png';
import {Fight} from "@/types/fights";

type FightCardProps = {
    fight: Fight;
}

export const FightCard = ({ fight: { firstPokemon, secondPokemon, coefficientFirst, coefficientSecond, isCompleted, firstWon }}: FightCardProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.pokemons}>
                <Pokemon name={firstPokemon.name} type={firstPokemon.types[0]} image={PokeballImage} won={firstWon}/>
                <p>vs</p>
                <Pokemon name={secondPokemon.name} type={secondPokemon.types[0]} image={UltraballImage} won={!firstWon}/>
            </div>
            <div className={styles.coefficients}>
                <div className={styles.coefficient}>{coefficientFirst}</div>
                <div className={styles.coefficient}>{coefficientSecond}</div>
            </div>
        </div>
    )
}