import type { State } from "./state.js";

// function to display the user's caught Pokemon
export async function commandPokedex(state: State) {
    console.log("Your Pokedex:");
    for (const pokemon of Object.values(state.caughtPokemon)) {
        console.log(` - ${pokemon.name}`);
    }
}