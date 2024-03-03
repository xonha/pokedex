"use client";

import { useRef } from "react";
import TailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { TypeButton } from "./TypeButton";

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
