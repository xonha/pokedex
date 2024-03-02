"use client";

import { useRef } from "react";
import { useRecoilState } from "recoil";
import { filterTypesAtom } from "../atoms";
import TailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

function TypeButton(props: { color: string }) {
  const [types, setTypes] = useRecoilState(filterTypesAtom);

  const handleTypeButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newType = event.currentTarget.innerText;

    if (types.indexOf(newType) === -1) {
      if (types.length === 2) setTypes([types[1], newType]);
      else setTypes([...types, newType]);
    } else {
      setTypes(types.filter((type) => type !== newType));
    }
  };

  if (types.indexOf(props.color) !== -1) {
    return (
      <button
        className={`bg-white text-pokemon-${props.color} border border-pokemon-${props.color} w-fit px-1 rounded-md`}
        onClick={handleTypeButton}
      >
        {props.color}
      </button>
    );
  }

  return (
    <button
      className={`bg-pokemon-${props.color} w-fit px-1 rounded-md`}
      onClick={handleTypeButton}
    >
      {props.color}
    </button>
  );
}

export function TypesList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tailwindConfig = resolveConfig(TailwindConfig);
  // TODO: fix type, should not be any
  const colors = tailwindConfig.theme.colors as Record<string, any>;
  const pokemonColors = Object.keys(colors.pokemon);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollLeft += event.deltaY < 0 ? -50 : 50;
  };

  return (
    <div
      className="flex items-center space-x-4 overflow-hidden text-white font-bold"
      onWheel={handleWheel}
      ref={scrollContainerRef}
    >
      {pokemonColors.map((type) => (
        <TypeButton key={type} color={type} />
      ))}
    </div>
  );
}
