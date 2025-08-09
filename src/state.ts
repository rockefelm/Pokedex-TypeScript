import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

// holds the command type definition
// This file defines the structure of a CLI command used in the initState initializer
export type CLICommand = {
  name: string;
  description: string;
  callback: (State: State) => Promise<void>;
};

// holds the application state type
export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
};

// Function to initialize the application state
export function initState(): State {
    // Create a readline interface for user input
    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex > ",
  });
    // The state object holds the readline interface, command registry, PokeAPI instance, and
    // URLs for pagination of locations.
    const commandRegistry = getCommands();
    return { 
        readline: rl,
        commands: commandRegistry,
        pokeAPI: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
}