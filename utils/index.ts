import type { FirstCharacter, LastCharacter } from "flat-type-samurai";

export type FirstCharacterWithRest<T extends string> = Exclude<
  FirstCharacter<T, { includeRest: true }>,
  T | string
>;

export type LastCharacterWithRest<T extends string> = Exclude<
  LastCharacter<T, { includeRest: true }>,
  T | string
>;
