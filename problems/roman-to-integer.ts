import type {
  Sum,
  Minus,
  IsLowerThan,
  Mult,
  LastCharacter,
} from "flat-type-samurai";
import type { LastCharacterWithRest } from "utils";

type LetterToInt<T extends string> = T extends "I"
  ? 1
  : T extends "V"
    ? 5
    : T extends "X"
      ? 10
      : T extends "L"
        ? 50
        : T extends "C"
          ? 100
          : T extends "D"
            ? 500
            : T extends "M"
              ? 1000
              : never;

type NewResult<
  Char extends string,
  R extends number,
  Num extends number = LetterToInt<Char>,
> = IsLowerThan<Mult<4, Num>, R> extends true ? Minus<R, Num> : Sum<R, Num>;

type RomanToInt<
  Roman extends string,
  R extends number = 0,
  L extends [string, string] = LastCharacterWithRest<Roman>,
> = Roman extends "" ? R : RomanToInt<L[1], NewResult<L[0], R>>;

export type Result1 = RomanToInt<"III">;
//           ^?

export type Result2 = RomanToInt<"LV">;
//           ^?

export type Result3 = RomanToInt<"MCMXCIV">;
//           ^?
