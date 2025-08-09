import type { State } from "./state.js";

// Function to inspect a caught Pokémon
// This function is called when the user wants to view details of a caught Pokémon
export async function commandInspect(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name");
    }
    // Extract the Pokémon name from the arguments and ensures that you have actually caught it
    const name = args[0];
    const pokemon = state.caughtPokemon[name];
    if (!pokemon) {
        throw new Error("you have not caught that pokemon");
    }
    // Print the details of the caught Pokémon
    console.log("Name:", pokemon.name);
    console.log("Height:", pokemon.height);
    console.log("Weight:", pokemon.weight);
    console.log("Stats:");
    for (const stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const typeInfo of pokemon.types) {
        console.log("  -", typeInfo.type.name);
    }
}