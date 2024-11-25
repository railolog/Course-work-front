import axios from 'axios';
import Cookies from 'js-cookie';
import {BASE_URL} from "@/constants/url";

type CookieManager = {
    setToken: (token: string) => void;
    getToken: () => string | undefined;
    removeToken: () => void;
};

export const cookieManager: CookieManager = {
    setToken: (token: string) => {
        Cookies.set('authToken', token, { expires: 1 }); // Токен сохраняется на 1 день
    },
    getToken: () => {
        return Cookies.get('authToken');
    },
    removeToken: () => {
        Cookies.remove('authToken');
    },
};

type AuthService = {
    login: (username: string, password: string) => Promise<string>;
    register: (username: string, password: string) => Promise<string>;
    logout: () => void;
};

const authService: AuthService = {
    login: async (username: string, password: string): Promise<string> => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/signin`, { username, password });
            const token: string = response.data.token;
            cookieManager.setToken(token);
            return token;
        } catch (error) {
            throw error;
        }
    },

    register: async (username: string, password: string): Promise<string> => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, { username, password });
            const token: string = response.data.token;
            cookieManager.setToken(token);
            return token;
        } catch (error) {
            throw error;
        }
    },

    logout: (): void => {
        cookieManager.removeToken();
    },
};

export default authService;