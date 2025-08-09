import { type State } from "./state.js";
// function to exit the Pokedex application
 // This function is called when the user wants to exit the application
 export async function commandExit(state: State){
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close();
    // Exit the process with a success code
    process.exit(0);
    // Note: The process.exit(0) is used to terminate the Node.js process
};