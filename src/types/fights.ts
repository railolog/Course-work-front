import {Pokemon} from "@/types/pokemons";
import {Location} from "@/types/location";

export type Fight = {
    id: number;
    firstPokemon: Pokemon;
    secondPokemon: Pokemon;
    location: Location;
    coefficientFirst: number;
    coefficientSecond: number;
    isCompleted: boolean;
    firstWon: boolean;
}

export const FightsMock: Fight[] = [
    {
        id: 1,
        firstPokemon: {
            id: 1,
            name: "Pikachu",
            types: ["Electric"],
            trainer: { id: 1, name: "Ash" },
        },
        secondPokemon: {
            id: 2,
            name: "Charmander",
            types: ["Fire"],
            trainer: { id: 2, name: "Brock" },
        },
        location: {
            id: 1,
            name: "Viridian Forest",
            description: "A lush forest full of Bug-type Pokémon.",
        },
        coefficientFirst: 1.2,
        coefficientSecond: 1.5,
        isCompleted: true,
        firstWon: true,
    },
    {
        id: 2,
        firstPokemon: {
            id: 3,
            name: "Bulbasaur",
            types: ["Grass", "Poison"],
            trainer: { id: 3, name: "Misty" },
        },
        secondPokemon: {
            id: 4,
            name: "Squirtle",
            types: ["Water"],
            trainer: { id: 4, name: "Gary" },
        },
        location: {
            id: 2,
            name: "Cerulean City Gym",
            description: "A water-themed Pokémon gym.",
        },
        coefficientFirst: 1.3,
        coefficientSecond: 1.4,
        isCompleted: false,
        firstWon: false,
    },
    {
        id: 3,
        firstPokemon: {
            id: 5,
            name: "Jigglypuff",
            types: ["Fairy", "Normal"],
            trainer: { id: 5, name: "Lilly" },
        },
        secondPokemon: {
            id: 6,
            name: "Zubat",
            types: ["Poison", "Flying"],
            trainer: { id: 6, name: "James" },
        },
        location: {
            id: 3,
            name: "Mt. Moon",
            description: "A mysterious mountain cave.",
        },
        coefficientFirst: 1.8,
        coefficientSecond: 1.2,
        isCompleted: true,
        firstWon: false,
    },
    {
        id: 4,
        firstPokemon: {
            id: 7,
            name: "Eevee",
            types: ["Normal"],
            trainer: { id: 7, name: "Dawn" },
        },
        secondPokemon: {
            id: 8,
            name: "Meowth",
            types: ["Normal"],
            trainer: { id: 8, name: "Jessie" },
        },
        location: {
            id: 4,
            name: "Team Rocket's Hideout",
            description: "A secret base filled with traps.",
        },
        coefficientFirst: 1.0,
        coefficientSecond: 1.7,
        isCompleted: true,
        firstWon: true,
    },
    {
        id: 5,
        firstPokemon: {
            id: 9,
            name: "Gengar",
            types: ["Ghost", "Poison"],
            trainer: { id: 9, name: "Agatha" },
        },
        secondPokemon: {
            id: 10,
            name: "Machamp",
            types: ["Fighting"],
            trainer: { id: 10, name: "Bruno" },
        },
        location: {
            id: 5,
            name: "Elite Four Arena",
            description: "A prestigious arena for elite trainers.",
        },
        coefficientFirst: 2.0,
        coefficientSecond: 1.0,
        isCompleted: false,
        firstWon: false,
    },
    {
        id: 6,
        firstPokemon: {
            id: 11,
            name: "Dragonite",
            types: ["Dragon", "Flying"],
            trainer: { id: 11, name: "Lance" },
        },
        secondPokemon: {
            id: 12,
            name: "Togepi",
            types: ["Fairy"],
            trainer: { id: 12, name: "Misty" },
        },
        location: {
            id: 6,
            name: "Indigo Plateau",
            description: "The location of the Pokémon League.",
        },
        coefficientFirst: 3.0,
        coefficientSecond: 0.5,
        isCompleted: true,
        firstWon: true,
    },
    {
        id: 7,
        firstPokemon: {
            id: 13,
            name: "Snorlax",
            types: ["Normal"],
            trainer: { id: 13, name: "May" },
        },
        secondPokemon: {
            id: 14,
            name: "Onix",
            types: ["Rock", "Ground"],
            trainer: { id: 14, name: "Brock" },
        },
        location: {
            id: 7,
            name: "Pewter City Gym",
            description: "A gym specializing in Rock-type Pokémon.",
        },
        coefficientFirst: 1.6,
        coefficientSecond: 1.3,
        isCompleted: false,
        firstWon: false,
    },
    {
        id: 8,
        firstPokemon: {
            id: 15,
            name: "Alakazam",
            types: ["Psychic"],
            trainer: { id: 15, name: "Sabrina" },
        },
        secondPokemon: {
            id: 16,
            name: "Blastoise",
            types: ["Water"],
            trainer: { id: 16, name: "Gary" },
        },
        location: {
            id: 8,
            name: "Saffron City Gym",
            description: "A gym with a Psychic theme.",
        },
        coefficientFirst: 1.4,
        coefficientSecond: 1.5,
        isCompleted: true,
        firstWon: false,
    },
    {
        id: 9,
        firstPokemon: {
            id: 17,
            name: "Charizard",
            types: ["Fire", "Flying"],
            trainer: { id: 1, name: "Ash" },
        },
        secondPokemon: {
            id: 18,
            name: "Venusaur",
            types: ["Grass", "Poison"],
            trainer: { id: 3, name: "Misty" },
        },
        location: {
            id: 9,
            name: "Cerulean Cave",
            description: "A challenging cave for trainers.",
        },
        coefficientFirst: 1.7,
        coefficientSecond: 1.8,
        isCompleted: false,
        firstWon: false,
    },
    {
        id: 10,
        firstPokemon: {
            id: 19,
            name: "Lapras",
            types: ["Water", "Ice"],
            trainer: { id: 17, name: "Serena" },
        },
        secondPokemon: {
            id: 20,
            name: "Ditto",
            types: ["Normal"],
            trainer: { id: 18, name: "James" },
        },
        location: {
            id: 10,
            name: "Seafoam Islands",
            description: "A chilly cave system near the sea.",
        },
        coefficientFirst: 1.9,
        coefficientSecond: 1.3,
        isCompleted: true,
        firstWon: true,
    },
];
