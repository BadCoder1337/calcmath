import * as math from "mathjs";

const getRawPoints = () => {
  const input = document.getElementById("points") as HTMLTextAreaElement;
  return input.value
    .trim()
    .split("\n")
    .map((p) => p.trim().split(" ").map(Number));
};

const rawToPoint = (pa: number[]): Points[0] => ({ x: pa[0], y: pa[1] });

export const getPoints = (): Points =>
  getRawPoints()
    .filter((pa) => pa.length === 2 && !pa.some(isNaN))
    .map(rawToPoint);

export const interpolatePoints = (): Points =>
  getRawPoints()
    .filter((p) => !isNaN(p[0]) && isNaN(p[1]))
    .map(rawToPoint);

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
