"use client"

import React, {ReactNode, useEffect, useState} from "react";
import { FightContext } from "./index";
import {Fight} from "@/types/fights";
import fightService from "@/service/fight";
import {Pokemon} from "@/types/pokemons";
import pokemonService from "@/service/pokemon";


type AuthProviderProps = {
    children: ReactNode;
}

export const FightsProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [fights, setFights] = useState<Fight[]>([]);
    const [fightById, setFightById] = useState<Fight>({} as Fight);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const getFights = async () => {
        try {
            const fightsResponse = await fightService.userFights();
            setFights(fightsResponse);
            return fightsResponse;
        } catch (error) {
            throw error;
        }
    }

    const getPokemons = async () => {
        try {
            const pokemonsResponse = await pokemonService.pokemons();
            setPokemons(pokemonsResponse);
            return pokemonsResponse;
        } catch (error) {
            throw error;
        }
    }

    const getFightById = async (id: number) => {
        try {
            const fightResponse = await fightService.fightById(id);
            setFightById(fightResponse);
            return fightResponse;
        } catch (error) {
            throw error;
        }
    }

    return (
        <FightContext.Provider value={{ fights, pokemons, getFights, getPokemons, fightById, getFightById }}>
            {children}
        </FightContext.Provider>
    );
};
