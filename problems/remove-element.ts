type RemoveElement<Arr extends number[], Ele extends number> =
  Arr extends [infer Head, ...infer Tail extends number[]] ?
    Head extends Ele ?
      RemoveElement<Tail, Ele>
    : [Head, ...RemoveElement<Tail, Ele>]
  : [];

export type Result1 = RemoveElement<[3, 2, 2, 3], 3>;
//           ^?

export type Result2 = RemoveElement<[0, 1, 2, 2, 3, 0, 4, 2], 2>;
//           ^?
