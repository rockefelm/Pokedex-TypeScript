import { type State } from "./state.js";

export async function commandMapForward(state: State) {
    // Fetch locations using the stored nextLocationsURL (or default if empty)
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL || undefined);

    // Update the state with the new URLs for pagination
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    // Print each location name
    for (const loc of locations.results) {
        console.log(loc.name);
    }
}

export async function commandMapBack(state: State) {
  // Check if we can go back
  if (!state.prevLocationsURL) {
    throw new Error("you're on the first page");
  }

  // Fetch the previous page
  const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

  // Update the state
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  // Print each location name
  for (const loc of locations.results) {
    console.log(loc.name);
  }
}