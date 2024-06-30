import type {
  IsLetter,
  ParseNumber,
  Or,
  And,
  IsEqual,
  Not,
  StringLength,
} from "flat-type-samurai";
import type { FirstCharacterWithRest, LastCharacterWithRest } from "utils";

type IsNumber<T extends string> = ParseNumber<T> extends never ? false : true;

type IsAlphaNumeric<T extends string> = And<
  Or<IsLetter<T>, IsNumber<T>>,
  Not<IsEqual<T, " ">>
>;

type ValidEndChars<
  T extends string,
  First extends [string, string] = FirstCharacterWithRest<T>,
  Last extends [string, string] = LastCharacterWithRest<First[1]>,
> =
  And<IsAlphaNumeric<First[0]>, IsAlphaNumeric<Last[0]>> extends true
    ? IsEqual<First[0], Last[0]>
    : false;

type TrimEnds<T extends string> = T extends `${string}${infer Rest}`
  ? LastCharacterWithRest<Rest>[1]
  : T;

type _IsPalindrome<T extends string> = T extends ""
  ? true
  : StringLength<T> extends 1 | 2
    ? true
    : ValidEndChars<T> extends true
      ? _IsPalindrome<TrimEnds<T>>
      : false;

type Clean<T extends string> = T extends `${infer First}${infer Rest}`
  ? IsAlphaNumeric<First> extends true
    ? `${Lowercase<First>}${Clean<Rest>}`
    : Clean<Rest>
  : T;

type IsPalindrome<T extends string> = _IsPalindrome<Clean<T>>;

export type Result1 = IsPalindrome<"A man, a plan, a canal: Panama">;
//           ^?

export type Result2 = IsPalindrome<"race a car">;
//           ^?

export type Result3 = IsPalindrome<" ">;
//           ^?
