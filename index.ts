import { main as lagrange } from "./src/lagrange";
import { main as OLS } from "./src/OLS";
import { chart } from "./src/utils/chart";

import { formula } from "./src/utils/formula";

const controls = document.querySelector(".controls") as HTMLDivElement;
controls.addEventListener("click", (event) => {
  const target = event.target as HTMLInputElement;

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

const textarea = document.getElementById("points") as HTMLTextAreaElement;

textarea.addEventListener("drop", async (ev) => {
  ev.preventDefault();

  const file = ev.dataTransfer.files[0];
  textarea.value = await file.text();
});

textarea.addEventListener("dragover", (ev) => ev.preventDefault());

textarea.addEventListener("click", (ev) => {
  if (ev.ctrlKey) {
    const blob = new Blob(
      [
        textarea.value
          .trim()
          .split("\n")
          .map((s) => s.trim())
          .join("\n")
      ],
      {
        type: "text/plain"
      }
    );

    const a = document.createElement("a");
    a.download = "result.txt";
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
    a.click();
  }
});
