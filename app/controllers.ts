import { Pokemon } from "./interfaces";

interface IResult {
  name: string;
  url: string;
}
interface IResponse {
  count: number;
  next: string;
  previous: string;
  results: IResult[];
}

export async function getPokemonsPage(
  page: number = 0,
): Promise<Array<Pokemon>> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${page * 30}`,
  );
  const data: IResponse = await response.json();
  return Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return await res.json();
    }),
  );
}

export async function getPokemon(nameOrId: string): Promise<Pokemon | null> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  if (!response.ok) return null;
  const data = await response.json();
  if (data.results && data.results.length !== 1) return null;
  return data;
}
