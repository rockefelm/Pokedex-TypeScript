import type { State } from "./state.js";

// Function to catch a Pokémon by name
export async function commandCatch(state: State, ...args: string[]) {
    // Ensure that exactly one argument is provided, which is the Pokémon name
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name");
    }

    const name = args[0];
    const pokemon = await state.pokeAPI.fetchPokemon(name);

    console.log(`Throwing a Pokeball at ${pokemon.name}...`);
    // Simulate a catch attempt with a random chance based on the pokemons base experience
    const res = Math.floor(Math.random() * pokemon.base_experience);
    if (res > 40) {
        console.log(`${pokemon.name} escaped!`);
        return;
    }

    console.log(`${pokemon.name} was caught!`);
    console.log("You may now inspect it with the inspect command.");
    // Add the caught Pokémon to the state
    state.caughtPokemon[pokemon.name] = pokemon;
}