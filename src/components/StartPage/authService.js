import axios from 'axios';
import cookieManager from './cookieManager';

const BASE_URL = 'http://localhost:6969';

const login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signin`, { username, password });
        const token = response.data.token;
        cookieManager.setToken(token);
        return token;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    cookieManager.removeToken();
};

const authService = {
    login,
    logout
};

export default authService;