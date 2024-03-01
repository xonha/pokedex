"use client";
import { Pokemon } from "@/interfaces/pokemon";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import { getPokemonsPage } from "./Content";
import { LoadMoreButton } from "./LoadMoreButton";
import { useRecoilValue } from "recoil";
import { searchAtom } from "../atoms";
import { toast } from "sonner";

interface CardListProps {
  pokemonData: Pokemon[];
}

export async function getPokemon(nameOrId: string): Promise<Pokemon | null> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data;
}

export function CardList(props: CardListProps) {
  const [pokemons, setPokemons] = useState(props.pokemonData);
  const [filteredPokemons, setFilteredPokemons] = useState<Array<Pokemon>>([]);
  const [page, setPage] = useState(1);
  const searchInput = useRecoilValue(searchAtom);

  async function loadMore() {
    const newPokemonPage = await getPokemonsPage(page);
    setPage(page + 1);
    setPokemons([...pokemons, ...newPokemonPage]);
  }

  useEffect(() => {
    async function handleInput() {
      if (searchInput !== "") {
        const filtered = pokemons.filter((pokemon) =>
          pokemon.name.includes(searchInput.toLowerCase().trim()),
        );

        if (filtered.length === 0) {
          const foundPokemon = await getPokemon(searchInput);

          if (foundPokemon) {
            setFilteredPokemons([foundPokemon]);
          } else {
            toast.error("No pokemon found with that name");
          }
        } else setFilteredPokemons(filtered);
      } else if (searchInput === "") {
        setFilteredPokemons([]);
      }
    }
    handleInput();
  }, [searchInput]);

  if (filteredPokemons.length > 0) {
    return (
      <div className="flex flex-wrap gap-6 p-6 overflow-x-auto h-screen justify-center">
        {filteredPokemons.map((pokemon: Pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 p-6 overflow-x-auto h-screen justify-center">
      {pokemons.map((pokemon: Pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
      <LoadMoreButton onLoadMore={loadMore} />
    </div>
  );
}
