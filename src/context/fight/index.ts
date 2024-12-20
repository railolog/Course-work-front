import {createContext, useContext} from "react";
import {Fight} from "@/types/fights";
import {Pokemon} from "@/types/pokemons";
import {Location} from "@/types/location";
import {createFightInput} from "@/service/fight";
import {Bet} from "@/types/user";
import {BetInput} from "@/service/bet";

interface FightContextProps {
    fights: Fight[];
    pokemons: Pokemon[];
    locations: Location[];
    getFights: () => Promise<Fight[]>;
    createFight: (input: createFightInput) => Promise<Fight>;
    startFight: (id: number) => Promise<Fight>;
    getPokemons: () => Promise<Pokemon[]>;
    getLocations: () => Promise<Location[]>;
    fightById: Fight | undefined;
    getFightById: (id: number) => Promise<Fight>;
    bets: Bet[];
    getUserBets: () => Promise<Bet[]>;
    createBet: (input: BetInput) => Promise<Bet>;
    getBetsByFight: (id: number) => Promise<Bet[]>;
}

export const useFights = (): FightContextProps => {
    const context = useContext(FightContext);
    if (!context) {
        throw new Error('useFights must be used within an FightsProvider');
    }
    return context;
};

export const FightContext = createContext<FightContextProps | undefined>(undefined);
