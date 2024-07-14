import type { Minus, Decrement, Increment, Max } from "flat-type-samurai";

/*
(-2, 3)-----(-1, 3)----( 0, 3)----( 1, 3)----( 2, 3)----( 3, 3)
    |                                                       |
    |                                                       |
(-2, 2)     (-1, 2)----( 0, 2)----( 1, 2)-----( 2, 2)       .
    |          |                                 |          .
    |          |                                 |          .
(-2, 1)     (-1, 1)    ( 0, 1)----( 1, 1)     ( 2, 1)
    |          |           |         |           |
    |          |           |         |           |
(-2, 0)     (-1, 0)    ( 0, 0)    ( 1, 0)     ( 2, 0)
    |          |                     |           |
    |          |                     |           |
(-2,-1)     (-1,-1)----( 0,-1)----( 1,-1)     ( 2,-1)
    |                                            |
    |                                            |
(-2,-2)-----(-1,-2)----( 0,-2)----( 1,-2)-----( 2,-2)

Given a positive integer N, return the N-th coordinate of the spiral above.
*/

type MovePos<
  Pos extends [number, number],
  Dir extends "up" | "right" | "down" | "left",
> =
  Dir extends "up" ? [Pos[0], Increment<Pos[1]>]
  : Dir extends "right" ? [Increment<Pos[0]>, Pos[1]]
  : Dir extends "down" ? [Pos[0], Decrement<Pos[1]>]
  : [Decrement<Pos[0]>, Pos[1]];

type NextDirection<Dir extends "up" | "right" | "down" | "left"> =
  Dir extends "up" ? "right"
  : Dir extends "right" ? "down"
  : Dir extends "down" ? "left"
  : "up";

type MoveForSteps<
  N extends number,
  Pos extends [number, number],
  Dir extends "up" | "right" | "down" | "left",
  StepCount extends number,
> =
  N extends 0 ? Pos
  : StepCount extends 0 ? Pos
  : MoveForSteps<Decrement<N>, MovePos<Pos, Dir>, Dir, Decrement<StepCount>>;

type Spiral<
  N extends number,
  Pos extends [number, number] = [0, 0],
  Dir extends "up" | "right" | "down" | "left" = "up",
  StepCount extends number = 1,
> =
  N extends 0 ? Pos
  : Spiral<
      Max<0, Minus<N, StepCount>>,
      MoveForSteps<N, Pos, Dir, StepCount>,
      NextDirection<Dir>,
      NextDirection<Dir> extends "up" | "down" ? Increment<StepCount>
      : StepCount
    >;

export type Result1 = Spiral<0>;
//           ^?

export type Result2 = Spiral<1>;
//           ^?

export type Result3 = Spiral<2>;
//           ^?

export type Result4 = Spiral<3>;
//           ^?

export type Result5 = Spiral<4>;
//           ^?

export type Result6 = Spiral<5>;
//           ^?

export type Result7 = Spiral<6>;
//           ^?

export type Result8 = Spiral<7>;
//           ^?

export type Result9 = Spiral<8>;
//           ^?

export type Result10 = Spiral<9>;
//           ^?

export type Result11 = Spiral<10>;
//           ^?

export type Result12 = Spiral<11>;
//           ^?

export type Result13 = Spiral<12>;
//           ^?

export type Result14 = Spiral<13>;
//           ^?

export type Result15 = Spiral<14>;
//           ^?
