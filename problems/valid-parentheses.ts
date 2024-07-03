type Tail<T extends unknown[]> = T extends [...infer _, infer Last]
  ? Last
  : never;

type Head<T extends unknown[]> = T extends [infer First, ...infer _]
  ? First
  : never;

type RemoveLast<T extends unknown[]> = T extends [...infer Rest, infer _]
  ? Rest
  : never;

type InvertOpen<T extends string> = T extends "("
  ? ")"
  : T extends "["
    ? "]"
    : T extends "{"
      ? "}"
      : never;

type ValidClose<
  Current extends string,
  Stack extends string[],
> = Current extends ")" | "}" | "]"
  ? InvertOpen<Tail<Stack>> extends Current
    ? true
    : false
  : false;

type IsValidParentheses<
  S extends string,
  Stack extends string[] = [],
> = S extends `${infer F}${infer R}`
  ? F extends "(" | "{" | "["
    ? IsValidParentheses<R, [...Stack, F]>
    : ValidClose<F, Stack> extends true
      ? IsValidParentheses<R, RemoveLast<Stack>>
      : false
  : Stack["length"] extends 0
    ? true
    : false;

type Result1 = IsValidParentheses<"()">;
//   ^?

type Result2 = IsValidParentheses<"()[]{}">;
//   ^?

type Result3 = IsValidParentheses<"(]">;
//   ^?
