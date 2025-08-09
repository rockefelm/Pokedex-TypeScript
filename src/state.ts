import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

// holds the command type definition
// This file defines the structure of a CLI command used in the initState initializer
export type CLICommand = {
  name: string;
  description: string;
  callback: (State: State) => void;
};

// holds the application state type
export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
}

// Function to initialize the application state
// This function sets up the readline interface and registers commands
export function initState(): State {
    // Create a readline interface for user input
    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex > ",
  });
    // Register commands
    const commandRegistry = getCommands();
    return { readline: rl, commands: commandRegistry };
}