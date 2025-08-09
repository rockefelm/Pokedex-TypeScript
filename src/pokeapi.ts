export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // If no pageURL is provided, use the default endpoint
    // page URL contains the offset and limit parameters.
    // essentially the start and finish points of the locations to be fetched.
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    // Fetch the location object from the PokeAPI
    const response = await fetch(url);
    const locations: ShallowLocations = await response.json();
    // Return the locations object of type ShallowLocations
    return locations;
  }

  // async fetchLocation(locationName: string): Promise<Location> {
    // implement this
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string, url: string }>;
};

export type Location = {
  // add properties here
};