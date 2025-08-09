// function to display help for commands
// This function is called when the user requests help in the REPL
import { getCommands } from "./commands.js";

export function commandHelp(): void {
    console.log("Welcome to the Pokedex!\nUsage:\n\n");
    const commands = getCommands();
    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}