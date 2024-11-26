"use client"

import React, {ReactNode, useState} from "react";
import { UserContext } from "./index";
import userService from "@/service/user";

type AuthProviderProps = {
    children: ReactNode;
}

export const UserProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [ login, setLogin] = useState<string>('');
    const [ balance, setBalance] = useState<number>(0);

    const getBalance = async () => {
        try {
            const balance = await userService.userBalance();
            setBalance(balance);
            return balance;
        } catch (error) {
            throw error;
        }
    }

    const getUserInfo = async () => {
        try {
            const user = await userService.userInfo();
            setBalance(user.balance);
            setLogin(user.login);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const topUp = async (amount: number) => {
        try {
            await userService.topUp(amount);
            getBalance();
        } catch (error) {
            throw error;
        }
    }

    return (
        <UserContext.Provider value={{ login, balance, topUp, getUserInfo, getBalance }}>
            {children}
        </UserContext.Provider>
    );
};
