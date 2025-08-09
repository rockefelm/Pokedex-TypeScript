import { S } from "vitest/dist/chunks/config.d.D2ROskhv.js";
import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor(cacheInterval: number = 300000) { // default 5 minutes
        this.#cache = new Cache(cacheInterval);
    }

    closeCache() {
        this.#cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        // If no pageURL is provided, use the default endpoint
        // page URL contains the offset and limit parameters.
        // essentially the start and finish points of the locations to be fetched.
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        // Check if the URL is already cached and return it instead if it is.
        const cached = this.#cache.get<ShallowLocations>(url);
        if (cached) {
            return cached;
        }
        try{
            // Fetch the location object from the PokeAPI
            const response = await fetch(url);
            // Check if the response is ok (status code 200-299)
            // If not, throw an error with the status code and status text
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const locations: ShallowLocations = await response.json();
            this.#cache.add(url, locations);
            
            // Return the locations object of type ShallowLocations
            return locations;
        } catch (err) {
            throw new Error(`Error fetching locations: ${(err as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.#cache.get<Location>(url);
        if (cached) {
            return cached;
        }

        try {
            const resp = await fetch(url);

            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const location: Location = await resp.json();
            this.#cache.add(url, location);
            return location;
        } catch (e) {
            throw new Error(
                `Error fetching location '${locationName}': ${(e as Error).message}`,
            );
        }
    }

}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string, url: string }>;
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};