// this holds the command registration logic
// This file is responsible for registering commands in the REPL
import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI } from "./pokeapi.js";

// a command registry function
export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Get the next page of locations",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Get the previous page of locations",
            callback: commandMapBack,
        },
        explore: {
            name: "explore <location_name>",
            description: "Explore a location",
            callback: commandExplore
        },
        catch: {
            name: "catch <pokemon_name>",
            description: "Catch a pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect <pokemon_name>",
            description: "View details about a caught pokemon",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "View your caught pokemon",
            callback: commandPokedex,
        },
        // can add more commands here
    }
};
