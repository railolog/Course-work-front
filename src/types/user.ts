import {Fight} from "@/types/fights";

export type User = {
    login: string;
    balance: number;
}

export type Bet = {
    id: number;
    fight: Fight;
    credits: number;
    firstPokemonChosen: boolean;
    betCoef: number;
    profit?: number;
}