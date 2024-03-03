"use client";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { filterTypesAtom, searchAtom } from "../atoms";
import { getPokemonsPage } from "../controllers";
import { Pokemon } from "../interfaces";
import { Card } from "./Card";
import { LoadMoreButton } from "./LoadMoreButton";

interface CardListProps {
  pokemonData: Pokemon[];
}

export function CardList(props: CardListProps) {
  const [pokemons, setPokemons] = useState(props.pokemonData);
  const types = useRecoilValue(filterTypesAtom);
  const [filteredPokemons, setFilteredPokemons] =
    useState<Array<Pokemon>>(pokemons);
  const [page, setPage] = useState(1);
  const searchInput = useRecoilValue(searchAtom);

  async function loadMore() {
    const newPokemonPage = await getPokemonsPage(page);
    setPage(page + 1);
    setPokemons([...pokemons, ...newPokemonPage]);
  }

  function filterPokemons() {
    const filtered = pokemons.filter((pokemon) => {
      const nameMatch = pokemon.name.includes(searchInput.toLowerCase().trim());
      const typeMatch1 = pokemon.types.some((type) =>
        type.type.name.includes(types[0]),
      );
      const typeMatch2 = pokemon.types.some((type) =>
        type.type.name.includes(types[1]),
      );
      if (!types[0] && !types[1]) return nameMatch;
      if (!types[0]) return nameMatch && typeMatch2;
      if (!types[1]) return nameMatch && typeMatch1;
      return nameMatch && typeMatch1 && typeMatch2;
    });
    return filtered;
  }

  useEffect(() => {
    setFilteredPokemons(filterPokemons());
  }, [types, searchInput, pokemons]);

  return (
    <div className="flex flex-wrap gap-6 p-6 overflow-x-auto h-screen justify-center">
      {filteredPokemons.map((pokemon: Pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
      {filteredPokemons.length === pokemons.length ? (
        <LoadMoreButton onLoadMore={loadMore} />
      ) : null}
    </div>
  );
}
