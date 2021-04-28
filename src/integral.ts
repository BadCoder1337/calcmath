import { Fn, arrayRange } from "./utils";
import * as math from "mathjs";

export const simpson = (fn: Fn, [a, b]: [number, number], parts: number) => {
  if (parts % 2 !== 0)
    throw new Error("Cannot use Simpson method for odd number of parts");

  const h = (b - a) / parts;
  const x = (n: number) => a + n * h;

  const partsHalf = arrayRange(parts / 2, 1);

  return (
    (h / 3) *
    (fn(a) +
      fn(b) +
      2 * math.sum(partsHalf.map((i) => fn(x(i * 2)))) +
      4 * math.sum(partsHalf.map((i) => fn(x(i * 2 - 1)))))
  );
};

// test: simpson(x => -(x**2)+1, [-1, 1], 10)
// expect: 4/3
