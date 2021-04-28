import { roundToFixed } from ".";

export const getK = (k) => {
  const sign = k >= 0 ? "+" : "-";
  const abs = Math.abs(k);
  // if (abs === 1) return sign;
  return sign + roundToFixed(abs);
};

export const getPower = (p) => {
  switch (p) {
    case 0:
      return "";
    case 1:
      return "x";

    default:
      return `x<sup>${p}</sup>`;
  }
};

export const getPart = (k, p) => {
  if (k === 0) return "";
  return getK(k) + getPower(p);
};

class FormulaOutput {
  root: HTMLDivElement;
  set: Set<string>;
  constructor() {
    this.set = new Set<string>();
    this.root = document.querySelector(".formula") as HTMLDivElement;
  }

  addEntry(label: string, K: number[], [a, b]: [number, number], S: number) {
    if (this.set.has(label)) return;
    this.set.add(label);

    K = K.slice().reverse(); // don't mutate original array
    const p = document.createElement("p");
    // p.innerHTML = `\\(${label} F(x)=${} \\)`;
    const result = K.map((v, i) => getPart(v, K.length - i - 1)).join(" ");
    p.innerHTML = `${label}: &nbsp;&nbsp; F(x)=${result} &nbsp;&nbsp; ∫<span class='supsub'><sup>${b}</sup><sub>${a}</sub></span>F(x)dx=${roundToFixed(
      S
    )}`;
    this.root.appendChild(p);

    // MathJax.typeset();
  }

  clear() {
    this.set.clear();
    this.root.innerHTML = "";
  }
}

export const formula = new FormulaOutput();
