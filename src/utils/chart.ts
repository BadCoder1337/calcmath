import {
  Chart,
  CategoryScale,
  LinearScale,
  ScatterController,
  PointElement,
  LineElement,
  ChartDataset,
  Legend,
  Title,
  Tooltip
} from "chart.js";
import * as math from "mathjs";
import { Fn, Points } from "./";

Chart.register(
  CategoryScale,
  LinearScale,
  ScatterController,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

class MathChart {
  plot: Chart;
  pts: Points;
  sortedPts: Points;
  range: [number, number];

  constructor() {
    const axis = (text: string) => ({
      display: true,
      title: {
        display: true,
        text
      }
    });
    this.plot = new Chart(
      document.getElementById("plot") as HTMLCanvasElement,
      {
        type: "scatter",
        data: {
          datasets: []
        },
        options: {
          scales: {
            x: axis("X"),
            y: axis("Y")
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );
  }

  reset() {
    this.plot.data.datasets = [];
    this.plot.update();
  }

  setInitialPts(pts: Points) {
    this.pts = pts;
    this.sortedPts = this.pts.sort((p1, p2) => p1.x - p2.x);
    this.range = [
      this.sortedPts[0].x,
      this.sortedPts[this.sortedPts.length - 1].x
    ];

    this.upsertDataset({
      label: "Заданные точки",
      backgroundColor: "rgb(255, 99, 132)",
      data: pts
      // showLine: true
    });

    this.plot.update();
  }

  addFunction(fn: Fn, label: string) {
    const data = (math
      .range(...this.range, (this.range[1] - this.range[0]) / 100, true)
      .toArray() as number[]).map((x) => ({ x, y: fn(x) }));

    this.upsertDataset({
      label,
      borderColor:
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
      data,
      showLine: true,
      pointRadius: 0
    });

    this.plot.update();
  }

  upsertDataset(dataset: ChartDataset<"scatter">) {
    const existing = this.plot.data.datasets.find(
      (d) => d.label === dataset.label
    );
    if (existing) {
      Object.assign(existing, dataset);
    } else {
      this.plot.data.datasets.push(dataset);
    }
  }
}

export const chart = new MathChart();
