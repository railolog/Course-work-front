import {Pokemon} from "@/types/pokemons";
import axiosInstance from "@/service/index";
import {BASE_URL} from "@/constants/url";
import {Location} from "@/types/location";

type PokemonService = {
    pokemons: () => Promise<Pokemon[]>;
    locations: () => Promise<Location[]>;
}

const pokemonService: PokemonService = {
    pokemons: async (): Promise<Pokemon[]> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/pokemons`);
            return response.data.pokemons;
        } catch (error) {
            throw error;
        }
    },
    locations: async (): Promise<Location[]> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/locations`);
            return response.data.locations;
        } catch (error) {
            throw error;
        }
    },
}

export default pokemonService;