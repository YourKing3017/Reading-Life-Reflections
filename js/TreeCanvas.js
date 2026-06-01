import { leafClusters } from "./TreeData.js";
import { LeafCluster } from "./LeafCluster.js";

export class TreeCanvas {
  constructor(canvas, detailPanel, tooltip) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.detailPanel = detailPanel;
    this.tooltip = tooltip;
    this.selected = "trunk";
    this.view = "overview";
    this.clusters = leafClusters.map((cluster) => new LeafCluster(cluster));

    this.zoom = {
      scale: 1.58,
      tx: -260,
      ty: -36
    };

    this.hotspots = [
      { id: "apical", label: "Apical meristem", x: 450, y: 78, r: 45 },
      { id: "branches", label: "Branches / canopy", x: 225, y: 265, r: 88 },
      { id: "branches", label: "Branches / canopy", x: 676, y: 258, r: 88 },
      { id: "trunk", label: "Trunk", x: 455, y: 515, r: 92 },
      { id: "roots", label: "Lateral roots", x: 330, y: 780, r: 82 },
      { id: "taproot", label: "Taproot", x: 450, y: 810, r: 80 }
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
    this.view = "overview";
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

  eventToPoint(event) {
    const rect = this.canvas.getBoundingClientRect();
    const canonicalX = ((event.clientX - rect.left) / rect.width) * 900;
    const canonicalY = ((event.clientY - rect.top) / rect.height) * 900;

    let x = canonicalX;
    let y = canonicalY;

    if (this.view === "branches") {
      x = (canonicalX - this.zoom.tx) / this.zoom.scale;
      y = (canonicalY - this.zoom.ty) / this.zoom.scale;
    }

    return {
      x,
      y,
      canonicalX,
      canonicalY,
      screenX: event.clientX - rect.left,
      screenY: event.clientY - rect.top
    };
  }

  handleClick(event) {
    const point = this.eventToPoint(event);

    if (this.view === "branches") {
      const clickedCluster = this.clusters.find((cluster) => cluster.contains(point.x, point.y));

      if (clickedCluster) {
        this.selected = clickedCluster.cluster.id;
        this.detailPanel.showCluster(clickedCluster.cluster);
        this.draw();
      }

      return;
    }

    const clickedHotspot = this.findHotspot(point.x, point.y);
    if (!clickedHotspot) return;

    this.selected = clickedHotspot.id;
    this.detailPanel.show(clickedHotspot.id);

    if (clickedHotspot.id === "branches") {
      this.view = "branches";
    }

    this.draw();
  }

  handleMove(event) {
    const point = this.eventToPoint(event);
    let hover = null;

    if (this.view === "branches") {
      const cluster = this.clusters.find((item) => item.contains(point.x, point.y));
      hover = cluster?.cluster?.label || null;
    } else {
      const hotspot = this.findHotspot(point.x, point.y);
      hover = hotspot?.label || null;
    }

    if (hover) {
      this.tooltip.textContent = hover;
      this.tooltip.style.left = `${point.screenX}px`;
      this.tooltip.style.top = `${point.screenY}px`;
      this.tooltip.classList.remove("hidden");
    } else {
      this.hideTooltip();
    }
  }

  hideTooltip() {
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

    if (this.view === "branches") {
      ctx.save();
      ctx.translate(this.zoom.tx, this.zoom.ty);
      ctx.scale(this.zoom.scale, this.zoom.scale);
      this.drawTreeBase(ctx);
      this.clusters.forEach((cluster) => cluster.draw(ctx, this.selected === cluster.cluster.id));
      ctx.restore();
      this.drawBranchViewLabel(ctx);
    } else {
      this.drawTreeBase(ctx);
      this.clusters.forEach((cluster) => cluster.draw(ctx, false, 0.55));
      this.drawHotspotMarkers(ctx);
      this.drawOverviewLabel(ctx);
    }

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
      ctx.globalAlpha = active ? 0.94 : 0.45;
      ctx.strokeStyle = active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)";
      ctx.lineWidth = active ? 3 : 1.5;
      ctx.beginPath();
      ctx.arc(spot.x, spot.y, Math.min(spot.r, 39), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  }

  drawOverviewLabel(ctx) {
    this.drawLabel(ctx, "Click the apical meristem, trunk, branches, taproot, or lateral roots.", 450, 34);
  }

  drawBranchViewLabel(ctx) {
    this.drawLabel(ctx, "Branch view: click a leaf cluster, or use Whole tree to zoom out.", 450, 34);
  }

  drawLabel(ctx, text, x, y) {
    ctx.save();
    ctx.fillStyle = "rgba(7,17,12,0.76)";
    this.roundRect(ctx, x - 255, y - 18, 510, 36, 18);
    ctx.fill();
    ctx.fillStyle = "#f4f1e8";
    ctx.font = "700 15px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
