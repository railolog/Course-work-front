"use client"

import React, {useState} from "react";
import {ModalProps} from "@/types/modals";
import {ModalLayout} from "@/components/modals/ModalLayout";
import styles from "./styles.module.css";
import {Fight} from "@/types/fights";
import {useUser} from "@/context/user";
import {useFights} from "@/context/fight";
import {DEFAULT_TOAST_OPTIONS} from "@/constants/toast";
import toast from "react-hot-toast";

type BetModalProps = ModalProps & {
    onAccept?: () => void;
    fight?: Fight;
}

export const BetModal: React.FC<BetModalProps> = ({ onClose, fight, onAccept }) => {
    const { balance } = useUser();
    const { createBet } = useFights();

    const [inputValue, setInputValue] = useState<number>(0);
    const [error, setError] = useState<string | undefined>(undefined);
    const [firstPokemonChosen, setFirstPokemonChosen] = useState<boolean>(true);

    const handleSubmit = async (event: React.FormEvent): Promise<void> =>  {
        event.preventDefault();
        if (inputValue <= balance && fight) {
            createBet({
                fightId: fight.id,
                credits: inputValue,
                firstPokemonChosen
            })
            if (onAccept) {
                onAccept();
            }
            toast.success("Ставка сделана! Начните бой, чтобы довести дело до конца", DEFAULT_TOAST_OPTIONS);
            onClose();
        }
        else {
            setError("Введите сумму, не превышающую ваш баланс")
        }
    }

    return (
        <ModalLayout onClose={onClose}>
            <div className={styles.title}>Ставка</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p className={styles.subtitle}>Победителем будет:</p>
                <div className={styles.select}>
                    <input type="radio" id="firstPokemon" value="true" checked={firstPokemonChosen}
                           onChange={() => setFirstPokemonChosen(!firstPokemonChosen)}/>
                    <label htmlFor="firstPokemon">{fight?.firstPokemon.name}</label>
                </div>

                <div className={styles.select}>
                    <input type="radio" id="secondPokemon" value="false" checked={!firstPokemonChosen}
                           onChange={() => setFirstPokemonChosen(!firstPokemonChosen)}/>
                    <label htmlFor="secondPokemon">{fight?.secondPokemon.name}</label>
                </div>
                <div className={styles.textField}>
                    <label htmlFor="amount">Введите желаемую ставку</label>
                    <input
                        type="number"
                        id="amount"
                        value={inputValue}
                        onChange={(e) => setInputValue(Number(e.target.value))}
                        required
                    />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button type="submit" className={styles.submitButton}>Подтвердить</button>
            </form>
        </ModalLayout>
    )
}