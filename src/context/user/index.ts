import {User} from "@/types/user";
import {createContext, useContext} from "react";

interface UserContextProps {
    login: string;
    balance: number;
    topUp: (amount: number) => Promise<void>;
    getBalance: () => Promise<number>;
    getUserInfo: () => Promise<User>;
}

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
};

export const UserContext = createContext<UserContextProps | undefined>(undefined);
