import type { IsGreaterThan, IsEmptyArray } from "flat-type-samurai";

type MergeArrays<
  A extends number[],
  B extends number[],
  R extends number[] = [],
> =
  A extends [infer A1 extends number, ...infer ARest extends number[]] ?
    B extends [infer B1 extends number, ...infer BRest extends number[]] ?
      IsGreaterThan<A1, B1> extends false ?
        MergeArrays<ARest, B, [...R, A1]>
      : MergeArrays<A, BRest, [...R, B1]>
    : IsEmptyArray<B> extends true ? [...R, A1, ...ARest]
    : []
  : IsEmptyArray<A> extends true ? [...R, ...B]
  : [];

export type Result1 = MergeArrays<[1, 2, 3], [2, 5, 6]>;
//           ^?

export type Result2 = MergeArrays<[1], []>;
//           ^?

export type Result3 = MergeArrays<[0], [1]>;
//           ^?

export type Result4 = MergeArrays<[4, 5, 6], [1, 2, 3]>;
//           ^?
