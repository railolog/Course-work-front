import Cookies from 'js-cookie';

const setToken = (token) => {
    Cookies.set('authToken', token, { expires: 1 }); // Токен сохраняется на 1 день
};

const getToken = () => {
    return Cookies.get('authToken');
};

const removeToken = () => {
    Cookies.remove('authToken');
};

const cookieManager = {
    setToken,
    getToken,
    removeToken
};

export default cookieManager;