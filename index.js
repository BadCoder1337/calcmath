import { main as lagrange } from "./src/lagrange";
import { main as OLS } from "./src/OLS";
import { chart } from "./src/utils/chart";

import * as math from "mathjs";
import { simpson } from "./src/integral";
import { formula } from "./src/utils/formula";

window.math = math;
window.simpson = simpson;
window.formula = formula;

document.querySelector(".controls").addEventListener("click", (event) => {
  const { target } = event;

  console.log(target);

  switch (target.dataset.method) {
    case "lagrange":
      return lagrange();

    case "ols":
      return OLS(Number(target.dataset.power));

    case "reset": {
      formula.clear();
      chart.reset();
      return;
    }

    default:
      console.error("WTF?");
  }
});

const textarea = document.getElementById("points");
textarea.addEventListener("drop", (e) => {
  e.preventDefault();
  console.log("drop", e);
});
textarea.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("dragover", e);
});
