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
import {BetModal} from "@/components/modals/BetModal";
import {useUser} from "@/context/user";

type FightCardProps = {
    fight: Fight;
}

export const FightCard: React.FC<FightCardProps> = ({ fight }) => {
    const { startFight, getFights } = useFights();
    const { getBalance } = useUser();
    const [showModal, setShowModal] = useState<boolean>(false);

    function openFightCard() {
        redirect(`${FIGHTS_URL}/${fight.id}`);
    }

    function openModal(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        setShowModal(true);
    }

    async function startFightHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        try {
            await startFight(fight.id);
            await getFights();
            await getBalance();
        } catch (error) {
            toast.error('Ошибка при запуске боя', DEFAULT_TOAST_OPTIONS);
        }
    }

    return (
        <>
            <div className={styles.container} onClick={openFightCard}>
                <div className={styles.pokemons}>
                    <Pokemon name={fight.firstPokemon.name} type={fight.firstPokemon.types?.join(', ')} image={PokeballImage} won={fight.isCompleted && fight.firstWon} coefficient={fight.coefficientFirst}/>
                    <p>vs</p>
                    <Pokemon name={fight.secondPokemon.name} type={fight.secondPokemon.types?.join(', ')} image={UltraballImage} won={fight.isCompleted && !fight.firstWon} coefficient={fight.coefficientSecond}/>
                </div>
                {fight.isCompleted ? (
                    <button disabled className={styles.button}>Завершен</button>
                ) : (
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={startFightHandler}>Начать бой</button>
                        <button className={styles.betButton} onClick={openModal}>Сделать ставку</button>
                    </div>
                )}
            </div>
            {showModal && <BetModal onClose={() => setShowModal(false)} fight={fight}/>}
        </>
    )
}