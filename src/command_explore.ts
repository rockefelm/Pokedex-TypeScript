import type { State } from "./state.js";

// Function to explore a location by name
// This function is called when the user wants to explore a specific location
// It fetches the location details and prints the names of Pokemon found there
export async function commandExplore(state: State, ...args: string[]) {
    // Ensure that exactly one argument is provided, which is the location name
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }

    const name = args[0];
    const location = await state.pokeAPI.fetchLocation(name);

    console.log(`Exploring ${name}...`);
    console.log("Found Pokemon:");
    for (const enc of location.pokemon_encounters) {
        console.log(` - ${enc.pokemon.name}`);
    }
}