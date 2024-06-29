type RemoveElement<Arr extends number[], Ele extends number> = Arr extends [
  infer Head,
  ...infer Tail
]
  ? Head extends Ele
    ? Tail extends number[]
      ? RemoveElement<Tail, Ele>
      : Tail
    : Tail extends number[]
    ? [Head, ...RemoveElement<Tail, Ele>]
    : never
  : [];

export type Result1 = RemoveElement<[1, 2, 6, 1], 1>;
//           ^?

export type Result2 = RemoveElement<[1, 1, 2, 3], 1>;
//           ^?

export type Result3 = RemoveElement<[1, 1, 1], 1>;
//           ^?

export type Result4 = RemoveElement<[1, 2, 3], 2>;
//           ^?

export type Result5 = RemoveElement<[1, 1, 1], 2>;
//           ^?
