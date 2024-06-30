# Some notes for how to debug incredibly nested ts generics

Carry the result via a Log parameter:

```ts
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
  Log extends string = "",
> = Roman extends `${infer Head}${infer Tail}`
  ? RomanToInt<Tail, NewResult<Head, R>, `${Log} ${NewResult<Head, R>}`>
  : Log;

export type Result1 = RomanToInt<"I">;
//           ^? type Result1 = " 1"

export type Result2 = RomanToInt<"LV">;
//           ^? type Result2 = " 50 45"

export type Result3 = RomanToInt<"MCMXCIV">;
//           ^? type Result3 = " 1000 900 1900 1890 1790 1789 1784"
```
