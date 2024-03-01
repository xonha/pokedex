"use server";

import { Pokemon } from "../interfaces";
import { CardList } from "./CardList";

export interface IResult {
  name: string;
  url: string;
}

export interface IResponse {
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

export async function Content() {
  return <CardList pokemonData={await getPokemonsPage()} />;
}
