// this holds the command registration logic
// This file is responsible for registering commands in the REPL
import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBack } from "./command_map.js";

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
        // can add more commands here
    }
};
