import {Pokemon} from "@/types/pokemons";
import {Location} from "@/types/location";

export type Fight = {
    id: number;
    firstPokemon: Pokemon;
    secondPokemon: Pokemon;
    location: Location;
    coefficientFirst: number;
    coefficientSecond: number;
    isCompleted: boolean;
    firstWon: boolean;
}
