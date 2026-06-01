import { leafClusters } from "./TreeData.js";
import { LeafCluster } from "./LeafCluster.js";

export class TreeCanvas {
  constructor(canvas, detailPanel, tooltip) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.detailPanel = detailPanel;
    this.tooltip = tooltip;
    this.selected = "trunk";
    this.hovered = null;
    this.clusters = leafClusters.map((cluster) => new LeafCluster(cluster));

    this.hotspots = [
      { id: "apical", label: "Apical meristem", x: 450, y: 78, r: 42 },
      { id: "branches", label: "Branches", x: 225, y: 265, r: 74 },
      { id: "branches", label: "Branches", x: 676, y: 258, r: 74 },
      { id: "leaves", label: "Leaves", x: 238, y: 190, r: 90 },
      { id: "leaves", label: "Leaves", x: 612, y: 186, r: 90 },
      { id: "trunk", label: "Trunk", x: 455, y: 515, r: 86 },
      { id: "bark", label: "Bark", x: 505, y: 480, r: 42 },
      { id: "cambium", label: "Cambium", x: 394, y: 477, r: 42 },
      { id: "knots", label: "Knots/scars", x: 420, y: 425, r: 44 },
      { id: "roots", label: "Lateral roots", x: 330, y: 780, r: 78 },
      { id: "taproot", label: "Taproot", x: 450, y: 810, r: 76 },
      { id: "soil", label: "Soil", x: 450, y: 864, r: 90 }
    ];
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.canvas.addEventListener("click", (event) => this.handleClick(event));
    this.canvas.addEventListener("mousemove", (event) => this.handleMove(event));
    this.canvas.addEventListener("mouseleave", () => this.hideTooltip());
    this.draw();
  }

  reset() {
    this.selected = "trunk";
    this.detailPanel.show("trunk");
    this.draw();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
  }

  getScale() {
    const rect = this.canvas.getBoundingClientRect();
    return {
      sx: rect.width / 900,
      sy: rect.height / 900
    };
  }

  eventToTreePoint(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 900,
      y: ((event.clientY - rect.top) / rect.height) * 900,
      screenX: event.clientX - rect.left,
      screenY: event.clientY - rect.top
    };
  }

  handleClick(event) {
    const point = this.eventToTreePoint(event);
    const clickedCluster = this.clusters.find((cluster) => cluster.contains(point.x, point.y));

    if (clickedCluster) {
      this.selected = clickedCluster.cluster.section;
      this.detailPanel.show(clickedCluster.cluster.section);
      this.draw();
      return;
    }

    const clickedHotspot = this.findHotspot(point.x, point.y);
    if (clickedHotspot) {
      this.selected = clickedHotspot.id;
      this.detailPanel.show(clickedHotspot.id);
      this.draw();
    }
  }

  handleMove(event) {
    const point = this.eventToTreePoint(event);
    const cluster = this.clusters.find((item) => item.contains(point.x, point.y));
    const hotspot = cluster ? null : this.findHotspot(point.x, point.y);
    const hover = cluster?.cluster?.label || hotspot?.label || null;

    if (hover) {
      this.hovered = hover;
      this.tooltip.textContent = hover;
      this.tooltip.style.left = `${point.screenX}px`;
      this.tooltip.style.top = `${point.screenY}px`;
      this.tooltip.classList.remove("hidden");
    } else {
      this.hideTooltip();
    }
  }

  hideTooltip() {
    this.hovered = null;
    this.tooltip.classList.add("hidden");
  }

  findHotspot(x, y) {
    return this.hotspots.find((spot) => {
      const dx = x - spot.x;
      const dy = y - spot.y;
      return Math.sqrt(dx * dx + dy * dy) <= spot.r;
    });
  }

  draw() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, rect.width, rect.height);

    const { sx, sy } = this.getScale();
    ctx.save();
    ctx.scale(sx, sy);

    this.drawBackground(ctx);
    this.drawTreeBase(ctx);
    this.clusters.forEach((cluster) => cluster.draw(ctx, this.selected === cluster.cluster.section));
    this.drawHotspotMarkers(ctx);

    ctx.restore();
  }

  drawBackground(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, 900);
    sky.addColorStop(0, "rgba(84, 156, 121, 0.20)");
    sky.addColorStop(0.58, "rgba(19, 45, 31, 0.14)");
    sky.addColorStop(1, "rgba(86, 50, 24, 0.36)");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 900, 900);

    ctx.fillStyle = "rgba(110, 231, 245, 0.14)";
    ctx.beginPath();
    ctx.arc(450, 84, 92, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(86, 50, 24, 0.72)";
    ctx.fillRect(0, 800, 900, 100);
  }

  drawTreeBase(ctx) {
    this.drawRoots(ctx);
    this.drawBranches(ctx);
    this.drawTrunk(ctx);
    this.drawKnots(ctx);
    this.drawApical(ctx);
  }

  drawTrunk(ctx) {
    const gradient = ctx.createLinearGradient(0, 230, 0, 810);
    gradient.addColorStop(0, "#9a6331");
    gradient.addColorStop(0.55, "#6b3f22");
    gradient.addColorStop(1, "#3b2518");

    ctx.strokeStyle = gradient;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 82;
    ctx.beginPath();
    ctx.moveTo(450, 760);
    ctx.bezierCurveTo(430, 645, 464, 496, 448, 372);
    ctx.bezierCurveTo(442, 292, 450, 182, 450, 92);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(421, 740);
    ctx.bezierCurveTo(411, 592, 436, 485, 428, 356);
    ctx.stroke();

    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(480, 724);
    ctx.bezierCurveTo(508, 592, 474, 463, 488, 324);
    ctx.stroke();
  }

  drawBranches(ctx) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const branches = [
      [448, 365, 295, 286, 190, 190, 108, 95, 38],
      [456, 342, 592, 276, 672, 188, 770, 90, 38],
      [446, 476, 305, 470, 198, 414, 96, 318, 34],
      [462, 462, 600, 460, 690, 394, 810, 310, 34],
      [450, 268, 406, 218, 360, 174, 315, 136, 24],
      [450, 248, 501, 210, 542, 162, 585, 116, 24]
    ];

    branches.forEach(([x1, y1, x2, y2, x3, y3, x4, y4, width]) => {
      ctx.strokeStyle = "#6b3f22";
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = Math.max(3, width * 0.13);
      ctx.beginPath();
      ctx.moveTo(x1 - 4, y1 - 2);
      ctx.bezierCurveTo(x2 - 8, y2 - 8, x3 - 8, y3 - 4, x4 - 4, y4 - 5);
      ctx.stroke();
    });
  }

  drawRoots(ctx) {
    ctx.lineCap = "round";
    const roots = [
      [445, 760, 385, 815, 265, 825, 145, 890, 30],
      [455, 760, 505, 820, 628, 824, 760, 888, 30],
      [448, 762, 447, 820, 448, 860, 450, 920, 34],
      [418, 768, 360, 820, 330, 850, 285, 900, 16],
      [480, 768, 540, 820, 580, 850, 630, 900, 16]
    ];

    roots.forEach(([x1, y1, x2, y2, x3, y3, x4, y4, width]) => {
      ctx.strokeStyle = "#5a331d";
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4);
      ctx.stroke();
    });
  }

  drawKnots(ctx) {
    const knots = [
      [420, 425, 28],
      [488, 548, 22],
      [426, 606, 15]
    ];

    knots.forEach(([x, y, radius]) => {
      ctx.fillStyle = "#2a170f";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(214,163,84,0.44)";
      ctx.lineWidth = 4;
      ctx.stroke();
    });
  }

  drawApical(ctx) {
    ctx.fillStyle = "#6ee7f5";
    ctx.beginPath();
    ctx.arc(450, 78, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(110,231,245,0.52)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(450, 78, 32, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawHotspotMarkers(ctx) {
    this.hotspots.forEach((spot) => {
      const active = this.selected === spot.id;
      ctx.save();
      ctx.globalAlpha = active ? 0.92 : 0.38;
      ctx.strokeStyle = active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.35)";
      ctx.lineWidth = active ? 3 : 1;
      ctx.beginPath();
      ctx.arc(spot.x, spot.y, Math.min(spot.r, 36), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  }
}
