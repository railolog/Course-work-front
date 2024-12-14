import {Fight} from "@/types/fights";
import {BASE_URL} from "@/constants/url";
import axiosInstance from "@/service/index";

type FightService = {
    userFights: () => Promise<Fight[]>;
    fightById: (id: number) => Promise<Fight>;
}

const fightService: FightService = {
    userFights: async (): Promise<Fight[]> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/fights`);
            return response.data.fights;
        } catch (error) {
            throw error;
        }
    },
    fightById: async (id: number): Promise<Fight> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/fights/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default fightService;