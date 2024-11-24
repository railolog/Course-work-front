import {Trainer} from "@/types/trainer";

export type Pokemon = {
    id: number;
    name: string;
    types: string[];
    trainer: Trainer;
}