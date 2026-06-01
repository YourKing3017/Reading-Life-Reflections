import { DetailPanel } from "./DetailPanel.js";
import { TreeCanvas } from "./TreeCanvas.js";

const detailPanel = new DetailPanel();
detailPanel.init();

const canvas = document.querySelector("#treeCanvas");
const tooltip = document.querySelector("#tooltip");
const tree = new TreeCanvas(canvas, detailPanel, tooltip);
tree.init();

document.querySelector("#resetButton").addEventListener("click", () => tree.reset());
