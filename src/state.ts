import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

// holds the command type definition
// This file defines the structure of a CLI command used in the initState initializer
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

// holds the application state type
export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    caughtPokemon: Record<string, Pokemon>;
};

// Function to initialize the application state
export function initState(cacheInterval: number): State {
    // Create a readline interface for user input
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    // The state object holds the readline interface, command registry, PokeAPI instance, and
    // URLs for pagination of locations.
    // It also keeps track of caught Pokémon.
    return { 
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        nextLocationsURL: null,
        prevLocationsURL: null,
        caughtPokemon: {},
    };
}