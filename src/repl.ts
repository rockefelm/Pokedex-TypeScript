// the REPL (Read-Eval-Print Loop) module
// This file is responsible for starting the REPL and handling user input
// It allows users to interact with the Pokedex application through commands
import { createInterface } from "readline";
import { getCommands } from "./commands.js";

export function startREPL() {
  // Create a readline interface for user input
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex > ",
  });
  // Display the initial prompt
  rl.prompt();
  // Listen for user input
  rl.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const command = words[0];
    const commands = getCommands();
    if (command in commands) {
      try {
        commands[command].callback(commands);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      } 
    } else {
      console.log('Unknown command.\nType "help" for a list of commands.');
    }
    rl.prompt();
  });  
    
}

// Function to clean and split user input into an array of words
// This function converts the input to lowercase, trims whitespace, and splits it by spaces
export function cleanInput(input: string): string[] {
  const inputList = input.toLowerCase().trim().split(/\s+/);
  return inputList;
}