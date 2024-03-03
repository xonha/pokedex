"use client";

import { useRecoilState } from "recoil";
import { filterTypesAtom } from "../atoms";

export function TypeButton(props: { color: string }) {
  const [types, setTypes] = useRecoilState(filterTypesAtom);

  const handleTypeButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newType = event.currentTarget.innerText;
    console.log(newType);

    if (types.indexOf(newType) === -1) {
      if (types.length === 2) {
        setTypes([types[1], newType]);
      } else {
        setTypes([...types, newType]);
      }
    } else {
      const filteredTypes = types.filter((type) => type !== newType);
      setTypes(filteredTypes);
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
