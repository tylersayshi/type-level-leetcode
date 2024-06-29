import type { IsGreaterThan, IsEmptyArray } from "type-samurai";

type MergeArrays<
  A extends number[],
  B extends number[],
  R extends number[] = []
> = A extends [infer A1, ...infer ARest]
  ? B extends [infer B1, ...infer BRest]
    ? A1 extends number
      ? B1 extends number
        ? ARest extends number[]
          ? BRest extends number[]
            ? IsGreaterThan<A1, B1> extends false
              ? MergeArrays<ARest, B, [...R, A1]>
              : MergeArrays<A, BRest, [...R, B1]>
            : never
          : never
        : never
      : never
    : IsEmptyArray<B> extends true
    ? [...R, A1, ...ARest]
    : never
  : IsEmptyArray<A> extends true
  ? [...R, ...B]
  : never;

export type Result1 = MergeArrays<[1, 2, 6], [1, 2, 3]>;
//           ^?

export type Result2 = MergeArrays<[1, 2, 3], [1, 2, 3]>;
//           ^?

export type Result3 = MergeArrays<[4, 5, 6], [1, 2, 3]>;
//           ^?

export type Result4 = MergeArrays<[1, 2, 3], [4, 5, 6]>;
//           ^?
