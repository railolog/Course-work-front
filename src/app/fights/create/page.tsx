"use client"

import styles from './page.module.css';
import {useFights} from "@/context/fight";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {DEFAULT_TOAST_OPTIONS} from "@/constants/toast";
import {Fight} from "@/types/fights";
import {FightCard} from "@/components/FightCard";

export default function Page() {
    const { pokemons, locations, getPokemons, getLocations, createFight, getFightById } = useFights();

    const [firstPokemonId, setFirstPokemonId] = useState<number | undefined>(undefined);
    const [secondPokemonId, setSecondPokemonId] = useState<number | undefined>(undefined);
    const [locationId, setLocationId] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [fight, setFight] = useState<Fight | undefined>(undefined);

    useEffect(() => {
        async function fetchData() {
            await Promise.all([getPokemons(), getLocations()]);
            setLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            setFirstPokemonId(pokemons[0]?.id ?? null);
            setSecondPokemonId(pokemons[1]?.id ?? null);
            setLocationId(locations[0]?.id ?? null);
        }
    }, [loading, pokemons, locations]);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (firstPokemonId !== undefined && secondPokemonId !== undefined && locationId !== undefined) {
            if (firstPokemonId !== secondPokemonId) {
                const result = await createFight({
                    firstPokemonId,
                    secondPokemonId,
                    locationId
                });
                const fight = await getFightById(result.id);
                setFight(fight);
            } else {
                toast.error("Необходимо выбрать разных покемонов", DEFAULT_TOAST_OPTIONS);
            }
        }
    }

    if (loading) {
        return <div className={styles.loading}>Загрузка данных...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Создание боя</div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <label className={styles.label}>
                        Выберите первого покемона
                        <select required className={styles.select} value={firstPokemonId || ""}
                                onChange={(event) => setFirstPokemonId(Number(event.target.value))}>
                            {pokemons?.map((pokemon) => {
                                return (
                                    <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
                                )
                            })}
                        </select>
                    </label>
                    <label className={styles.label}>
                        Выберите второго покемона
                        <select required className={styles.select} value={secondPokemonId || ""}
                                onChange={(event) => setSecondPokemonId(Number(event.target.value))}>
                            {pokemons?.map((pokemon) => {
                                return (
                                    <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
                                )
                            })}
                        </select>
                    </label>
                    <label className={styles.label}>
                        Выберите локацию
                        <select required className={styles.select} value={locationId || ""}
                                onChange={(event) => setLocationId(Number(event.target.value))}>
                            {locations?.map((location) => {
                                return (
                                    <option key={location.id} value={location.id}>{location.name}</option>
                                )
                            })}
                        </select>
                    </label>
                    <button className={styles.button} type="submit">Создать бой</button>
                </form>
                <div className={styles.result}>
                    <div className={styles.subtitle}>Результат</div>
                    {fight ? (
                        <FightCard fight={fight}/>
                    ) : (
                        <div className={styles.text}>Нажмите "Создать бой", чтобы начать выигрывать!</div>
                    )}
                </div>
            </div>
        </div>
    )
}
