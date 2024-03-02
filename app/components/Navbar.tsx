"use client";

import { useSetRecoilState } from "recoil";
import { useDebouncedCallback } from "use-debounce";
import { searchAtom } from "../atoms";
import { TypesList } from "./TypesList";

export default function Navbar() {
  const setInput = useSetRecoilState(searchAtom);
  const debounced = useDebouncedCallback((value) => {
    setInput(value.toLowerCase().trim());
  }, 1000);

  return (
    <nav className="h-16 w-full px-6 flex items-center sm:grid-cols-2 bg-white border-b">
      <div className="flex flex-grow items-center space-x-4 pr-6">
        <input
          className="max-w-sm h-10 rounded-md border-zinc-200 border px-4"
          id="search"
          placeholder="Search for id or name"
          onChange={(e) => debounced(e.target.value)}
        />
      </div>
      <TypesList />
    </nav>
  );
}
