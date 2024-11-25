import React from "react";
import Image, {StaticImageData} from "next/image";
import styles from '../styles.module.css';

type PokemonProps = {
    name: string;
    type: string;
    image: StaticImageData;
    won?: boolean;
}

export const Pokemon: React.FC<PokemonProps> = ({name, type, image, won = false}) => {
    return (
        <div className={`${styles.pokemonContainer} ${won ? styles.won : ""}`}>
            <Image className={styles.pokemonImage} height={32} width={32} src={image} alt="Pokemon image"/>
            <div className={styles.pokemonText}>
                <div className={styles.name}>{name}</div>
                <div className={styles.type}>{type}</div>
            </div>
        </div>
    )
}