import * as math from "mathjs";

export const getPoints = (): Points => {
  const input = document.getElementById("points") as HTMLTextAreaElement;
  const pts = input.value
    .split("\n")
    .map((p) => p.split(" ").map(parseFloat))
    .map((pa) => ({ x: pa[0], y: pa[1] }));

  return pts;
};

export const arrayRange = (n: number, to = 0) =>
  Array(n)
    .fill(null)
    .map((_, i) => i + to);

export const arrayRangeDesc = (n: number, to = 0) =>
  arrayRange(n, to).reverse();

export const evenCeil = (x: number) => x + (x % 2);

/**
 * Матричный метод решения СЛАУ
 * A * X = B
 * X = A^-1 * B
 */
export const solveLinearSystem = (A: math.Matrix, B: math.Matrix) =>
  math.multiply(math.inv(A), B);

export type Points = { x: number; y: number }[];
export type Fn = (x: number) => number;
