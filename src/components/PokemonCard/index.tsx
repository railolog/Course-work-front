import styles from "./styles.module.css";
import Image, {StaticImageData} from "next/image";
import React from "react";
import {Pokemon} from "@/types/pokemons";

type PokemonCardProps = {
    image: StaticImageData;
    pokemon?: Pokemon;
    className?: string;
    coefficient?: number;
    won?: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ className, pokemon, image, coefficient, won}) => {
    return (
        <div className={`${styles.pokemon} ${won ? styles.won : ''} ${className}`}>
            <div className={styles.mainInfo}>
                <Image className={styles.pokemonImage} height={80} width={80} src={image}
                       alt="Pokemon image"/>
                <div className={styles.name}>
                    {pokemon?.name ?? 'Неизвестный'}
                </div>
                <div className={styles.types}>
                    {pokemon?.types.join(', ') ?? 'Стихии неизвестны'}
                </div>
                <div className={styles.trainer}>
                    Тренер: {pokemon?.trainer?.name ?? 'Тренер неизвестен'}
                </div>
            </div>
            {coefficient &&
                <div className={styles.coefficient}>
                    {coefficient.toFixed(2) ?? 0}
                </div>
            }
        </div>
    )
}