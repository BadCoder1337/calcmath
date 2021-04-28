import {
  getPoints,
  Points,
  arrayRangeDesc,
  evenCeil,
  solveLinearSystem
} from "./utils/index";
import { chart } from "./utils/chart";
import * as math from "mathjs";
import { simpson } from "./integral";
import { formula } from "./utils/formula";

/**
 * Система-2
 * a*Σ(xi^2) + b*Σ(xi^1) = Σ(xi^1*yi)
 * a*Σ(xi^1) + b*Σ(xi^0) = Σ(xi^0*yi)
 *
 * Система-3
 * a*Σ(xi^4) + b*Σ(xi^3) + c*Σ(xi^2) = Σ(xi^2*yi)
 * a*Σ(xi^3) + b*Σ(xi^2) + c*Σ(xi^1) = Σ(xi^1*yi)
 * a*Σ(xi^2) + b*Σ(xi^1) + c*Σ(xi^0) = Σ(xi^0*yi)
 */
export const genericOLS = (pts: Points, power = 1) => {
  power++;
  const A = math.matrix(
    arrayRangeDesc(power).map((i) =>
      arrayRangeDesc(power, i).map((j) => math.sum(pts.map((p) => p.x ** j)))
    )
  );
  const B = math.matrix(
    arrayRangeDesc(power)
      .map((i) => math.sum(pts.map((p) => p.x ** i * p.y)))
      .map((v) => [v])
  );

  return solveLinearSystem(A, B);
};

export function main(power = 1) {
  const pts = getPoints();
  if (pts.length < 8) return alert("Мало точек!");

  chart.setInitialPts(pts);

  const OLS = (genericOLS(pts, power).toArray() as number[][])
    .map((d) => d[0])
    .reverse();

  const fn = (x: number) => math.sum(OLS.map((l, i) => l * x ** i));

  chart.addFunction(fn, `МНК степени ${power}`);
  formula.addEntry(
    `МНК степени ${power}`,
    OLS,
    chart.range,
    simpson(fn, chart.range, evenCeil(pts.length))
  );
}
