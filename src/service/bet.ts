import {Bet} from "@/types/user";
import axiosInstance from "@/service/index";
import {BASE_URL} from "@/constants/url";

type BetService = {
    userBets: () => Promise<Bet[]>;
    createBet: (input: BetInput) => Promise<Bet>;
    betsByFight: (id: number) => Promise<Bet[]>;
}

export type BetInput = {
    fightId: number;
    credits: number;
    firstPokemonChosen: boolean;
}

const betService: BetService = {
    userBets: async (): Promise<Bet[]> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/bets`);
            return response.data.bets;
        } catch (error) {
            throw error;
        }
    },
    createBet: async (input: BetInput): Promise<Bet> => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/bets`, input);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    betsByFight: async (id: number): Promise<Bet[]> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/bets/by-fight/${id}`);
            return response.data.bets;
        } catch (error) {
            throw error;
        }
    },
}

export default betService;