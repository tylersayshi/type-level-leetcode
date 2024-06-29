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

export type Result1 = RemoveElement<[3, 2, 2, 3], 3>;
//           ^?

export type Result2 = RemoveElement<[0, 1, 2, 2, 3, 0, 4, 2], 2>;
//           ^?
