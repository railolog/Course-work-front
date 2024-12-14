import {Pokemon} from "@/types/pokemons";
import axiosInstance from "@/service/index";
import {BASE_URL} from "@/constants/url";

type PokemonService = {
    pokemons: () => Promise<Pokemon[]>;
}

const pokemonService: PokemonService = {
    pokemons: async (): Promise<Pokemon[]> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/pokemons`);
            return response.data.pokemons;
        } catch (error) {
            throw error;
        }
    }
}

export default pokemonService;