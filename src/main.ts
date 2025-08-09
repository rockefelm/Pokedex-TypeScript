// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  // Start the REPL for the Pokedex application
  const state = initState(1000 * 60 * 5); // 5 minutes cache interval
  startREPL(state);
}

main();