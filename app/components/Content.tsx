"use server";

import { getPokemonsPage } from "../controllers";
import { CardList } from "./CardList";

export async function Content() {
  return <CardList pokemonData={await getPokemonsPage()} />;
}
