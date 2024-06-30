import type {
  Sum,
  Minus,
  IsLowerThan,
  Mult,
  LastCharacter,
  Split,
  Slice,
  Join,
  IsEmptyArray,
} from "flat-type-samurai";

type TrimLastChar<
  T extends string,
  S extends string[] = Slice<Split<T, "">, 0, -1>,
> = IsEmptyArray<S> extends true ? "" : Join<S, "">;

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

type RomanToInt<Roman extends string, R extends number = 0> = Roman extends ""
  ? R
  : RomanToInt<TrimLastChar<Roman>, NewResult<LastCharacter<Roman>, R>>;

export type Result1 = RomanToInt<"III">;
//           ^?

export type Result2 = RomanToInt<"LV">;
//           ^?

export type Result3 = RomanToInt<"MCMXCIV">;
//           ^?
