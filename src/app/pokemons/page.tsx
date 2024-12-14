"use client"

import {useFights} from "@/context/fight";
import React, {useEffect} from "react";
import {PokemonCard} from "@/components/PokemonCard";
import PokeballImage from '@/images/pokeball.png';
import UltraballImage from '@/images/ultra-ball.png';
import styles from './page.module.css';

export default function Page() {
    const { pokemons, getPokemons }= useFights();

    const images = [PokeballImage, UltraballImage];

    useEffect(() => {
        getPokemons();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Все покемоны</div>
            <div className={styles.subtitle}>Всего - {pokemons?.length ?? 0}</div>
            <div className={styles.container}>
                {pokemons?.map((pokemon, index) => {
                    return (
                        <PokemonCard
                            className={styles.pokemon}
                            key={pokemon.id}
                            pokemon={pokemon}
                            image={images[index % 2]}
                        />
                    )
                })}
            </div>
        </div>
    )
}