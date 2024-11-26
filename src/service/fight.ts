import {Fight} from "@/types/fights";
import axios from "axios";
import {BASE_URL} from "@/constants/url";
import axiosInstance from "@/service/index";

type FightService = {
    userFights: () => Promise<Fight[]>
}

const fightService: FightService = {
    userFights: async (): Promise<Fight[]> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/fights`);
            return response.data.fights;
        } catch (error) {
            throw error;
        }
    }
}

export default fightService;