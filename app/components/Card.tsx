import { Pokemon, TypeColors } from "@/interfaces/pokemon";
import Image from "next/image";

export interface PokemonProps {
  pokemon: Pokemon;
}

export function Card({ pokemon }: PokemonProps) {
  return (
    <div className="flex flex-col w-fit items-center space-y-2 border rounded-md p-4">
      <Image
        alt={pokemon.name}
        className="aspect-square object-contain overflow-hidden rounded-lg border"
        height="200"
        src={pokemon.sprites.front_default}
        width="200"
      />
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          #{pokemon.id}
        </p>
        <h3 className="text-xl font-bold">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <div className="flex flex-row gap-2 justify-center">
          {pokemon.types.map((type) => (
            <div
              key={pokemon.id + type.type.name}
              className={`bg-${type.type.name} w-fit px-1 rounded-md text-white`}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <p className="">Weight: {pokemon.weight}</p>
      </div>
    </div>
  );
}
