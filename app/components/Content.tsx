import { Pokemon } from "@/interfaces/pokemon";
import { Card } from "./Card";

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

export async function Content() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data: IResponse = await response.json();
  const pokemonData = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return await res.json();
    }),
  );

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {pokemonData.map((pokemon: Pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
