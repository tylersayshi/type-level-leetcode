import type {
  IsGreaterThan,
  IsLowerThan,
  Sum,
  Negate,
} from "flat-type-samurai";

type Minus<A extends number, B extends number> = Sum<A, Negate<B>>;

type MaxProfit<
  Prices extends number[],
  Profit extends number = 0,
  MinPrice extends number = 10e4,
> = Prices extends [infer Head, ...infer Tail]
  ? Head extends number
    ? MinPrice extends number
      ? Tail extends number[]
        ? IsLowerThan<Head, MinPrice> extends true
          ? MaxProfit<Tail, Profit, Head>
          : IsGreaterThan<Minus<Head, MinPrice>, Profit> extends true
            ? MaxProfit<Tail, Minus<Head, MinPrice>, MinPrice>
            : MaxProfit<Tail, Profit, MinPrice>
        : never
      : never
    : never
  : Profit;

export type Result1 = MaxProfit<[7, 1, 5, 3, 6, 4]>;
//           ^?

export type Result2 = MaxProfit<[7, 6, 4, 3, 1]>;
//           ^?
