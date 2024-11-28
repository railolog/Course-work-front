"use client"

import React, {ReactNode, useEffect, useState} from "react";
import authService, {cookieManager} from "@/service/auth";
import { AuthContext } from "./index";
import {useUser} from "@/context/user";
import {useFights} from "@/context/fight";

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const { getUserInfo } = useUser();
    const { getFights } = useFights();

    useEffect(() => {
        const token = cookieManager.getToken();
        setIsAuthenticated(!!token);
        if (token) {
            getFights();
            getUserInfo();
        }
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
        try {
            await authService.login(username, password);
            setUsername(username);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    const register = async (username: string, password: string): Promise<void> => {
        try {
            await authService.register(username, password);
            setUsername(username);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    const logout = (): void => {
        authService.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
