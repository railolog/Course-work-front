import {createContext, useContext} from "react";
import {Fight} from "@/types/fights";
import {Pokemon} from "@/types/pokemons";

interface FightContextProps {
    fights: Fight[];
    pokemons: Pokemon[];
    getFights: () => Promise<Fight[]>;
    getPokemons: () => Promise<Pokemon[]>;
    fightById: Fight | undefined;
    getFightById: (id: number) => Promise<Fight>;
}

export const useFights = (): FightContextProps => {
    const context = useContext(FightContext);
    if (!context) {
        throw new Error('useFights must be used within an FightsProvider');
    }
    return context;
};

export const FightContext = createContext<FightContextProps | undefined>(undefined);
