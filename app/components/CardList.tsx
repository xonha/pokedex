"use client";
import { Pokemon } from "@/interfaces/pokemon";
import { Card } from "./Card";
import { useState, useEffect, useRef } from "react";
import { getPokemonsPage } from "./Content";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onLoadMore }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.5 },
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, [onLoadMore]);

  return (
    <button
      ref={buttonRef}
      className="text-red-500 hover:text-red-600 font-bold"
    >
      Load more...
    </button>
  );
};

interface CardListProps {
  pokemonData: Pokemon[];
}

export function CardList(props: CardListProps) {
  const [pokemons, setPokemons] = useState(props.pokemonData);
  const [page, setPage] = useState(1);

  async function loadMore() {
    console.log("load more...");
    const newPokemonPage = await getPokemonsPage(page);
    setPage(page + 1);
    setPokemons([...pokemons, ...newPokemonPage]);
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
