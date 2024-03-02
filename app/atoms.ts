import { atom } from "recoil";

export const searchAtom = atom<string>({
  key: "search",
  default: "",
});

export const filterTypesAtom = atom<string[]>({
  key: "filterTypes",
  default: [],
});
