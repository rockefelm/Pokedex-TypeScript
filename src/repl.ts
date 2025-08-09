// the REPL (Read-Eval-Print Loop) module
// This file is responsible for starting the REPL and handling user input
// It allows users to interact with the Pokedex application through commands
import { State } from "./state.js";

export function startREPL(state: State) {
  // Display the initial prompt
  state.readline.prompt();
  // Listen for user input and is the core of the REPL logic loop
  state.readline.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.readline.prompt();
      return;
    }
    // Extract the command from the user input
    const command = words[0];
    const args = words.slice(1);

    if (command in state.commands) {
      try {
        // Execute the corresponding command callback function in the state object
        await state.commands[command].callback(state, ...args);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      } 
    } else {
      console.log('Unknown command.\nType "help" for a list of commands.');
    }
    state.readline.prompt();
  });  
    
}

// Function to clean and split user input into an array of words
// This function converts the input to lowercase, trims whitespace, and splits it by spaces
export function cleanInput(input: string): string[] {
  const inputList = input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
  return inputList;
}