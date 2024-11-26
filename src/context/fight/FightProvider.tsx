"use client"

import React, {ReactNode, useState} from "react";
import { FightContext } from "./index";
import {Fight} from "@/types/fights";
import fightService from "@/service/fight";

type AuthProviderProps = {
    children: ReactNode;
}

export const FightsProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [fights, setFights] = useState<Fight[]>([]);

    const getFights = async () => {
        try {
            const fightsResponse = await fightService.userFights();
            setFights(fightsResponse);
            return fightsResponse;
        } catch (error) {
            throw error;
        }
    }

    return (
        <FightContext.Provider value={{ fights, getFights }}>
            {children}
        </FightContext.Provider>
    );
};
