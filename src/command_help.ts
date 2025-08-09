import { type State } from "./state.js";
// function to display help for commands
// This function is called when the user requests help in the REPL
export async function commandHelp(state: State){
    console.log("Welcome to the Pokedex!\nUsage:\n\n");
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}