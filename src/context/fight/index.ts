import {createContext, useContext} from "react";
import {Fight} from "@/types/fights";

interface FightContextProps {
    fights: Fight[];
    getFights: () => Promise<Fight[]>;
}

export const useFights = (): FightContextProps => {
    const context = useContext(FightContext);
    if (!context) {
        throw new Error('useFights must be used within an FightsProvider');
    }
    return context;
};

export const FightContext = createContext<FightContextProps | undefined>(undefined);
