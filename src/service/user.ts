import {User} from "@/types/user";
import {BASE_URL} from "@/constants/url";
import axiosInstance from "@/service/index";

type UserService = {
    userInfo: () => Promise<User>;
    userBalance: () => Promise<number>;
    topUp: (amount: number ) => Promise<void>;
}

const userService: UserService = {
    topUp: async (amount: number): Promise<void> => {
        try {
            await axiosInstance.post(`${BASE_URL}/payment`, {
                amount
            });
        } catch (error) {
            throw error;
        }
    },

    userInfo: async (): Promise<User> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/user/me`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    userBalance: async (): Promise<number> => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/user/balance`);
            return response.data.balance;
        } catch (error) {
            throw error;
        }
    }
}

export default userService;