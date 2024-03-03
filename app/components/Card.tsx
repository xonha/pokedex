import { Pokemon } from "../interfaces";
import Image from "next/image";

export interface PokemonProps {
  pokemon: Pokemon;
}

export function Card({ pokemon }: PokemonProps) {
  return (
    <div className="flex flex-col w-fit h-fit items-center space-y-2 border rounded-md p-4">
      <Image
        alt={pokemon.name}
        className="aspect-square object-contain overflow-hidden rounded-lg border"
        height="140"
        src={pokemon.sprites.front_default}
        width="140"
      />
      <div className="text-center">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          #{pokemon.id}
        </span>
        <h3 className="text-xl font-bold">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <div className="flex flex-row gap-2 justify-center">
          {pokemon.types.map((type) => (
            <div
              key={pokemon.id + type.type.name}
              className={`bg-pokemon-${type.type.name} w-fit px-1 rounded-md text-white font-bold`}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <p className="">Weight: {pokemon.weight / 10} kg</p>
      </div>
    </div>
  );
}
