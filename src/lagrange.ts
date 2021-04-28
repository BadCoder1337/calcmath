import * as math from "mathjs";
import {
  getPoints,
  Points,
  evenCeil,
  solveLinearSystem,
  roundToFixed,
  getRawPoints,
  arrayRange
} from "./utils";
import { chart } from "./utils/chart";
import { formula } from "./utils/formula";
import { simpson } from "./integral";

export function calc(pts: Points) {
  const indices = arrayRange(pts.length);
  const A = math.matrix(
    pts.map((p) => p.x).map((x) => indices.map((i) => x ** i))
  );
  const B = math.matrix(pts.map((p) => [p.y]));

  return solveLinearSystem(A, B);
}

export function main() {
  const pts = getPoints();
  if (pts.length < 2) return alert("Мало точек!");

  chart.setInitialPts(pts);

  const lagrange = calc(pts).toArray() as number[];

  const fn = (x: number) => math.sum(lagrange.map((l, i) => l * x ** i));

  chart.addFunction(fn, "Полином Лагранжа");
  formula.addEntry(
    "Полином Лагранжа",
    lagrange,
    chart.range,
    simpson(fn, chart.range, evenCeil(pts.length))
  );

  const textarea = document.getElementById("points") as HTMLTextAreaElement;
  textarea.value = getRawPoints()
    .map((p) => (isNaN(p[1]) ? [p[0], roundToFixed(fn(p[0]))] : p))
    .map((p) => p.join(" "))
    .join("\n");
}
