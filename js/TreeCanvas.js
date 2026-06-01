import { branches, leafClusters } from "./TreeData.js";
import { LeafCluster } from "./LeafCluster.js";

export class TreeCanvas {
  constructor(canvas, detailPanel, tooltip) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.detailPanel = detailPanel;
    this.tooltip = tooltip;
    this.selected = "trunk";
    this.view = "overview";
    this.activeBranch = null;
    this.selectedClusterId = null;
    this.clusters = leafClusters.map((cluster) => new LeafCluster(cluster));

    this.partHotspots = [
      { id: "apical", label: "Apical meristem", x: 450, y: 86, r: 42 },
      { id: "trunk", label: "Trunk", x: 452, y: 525, r: 82 },
      { id: "taproot", label: "Taproot", x: 452, y: 805, r: 76 },
      { id: "roots", label: "Lateral roots", x: 585, y: 780, r: 86 },
      { id: "roots", label: "Lateral roots", x: 325, y: 780, r: 86 }
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
    this.activeBranch = null;
    this.selected = "trunk";
    this.selectedClusterId = null;
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

  getActiveBranch() {
    return branches.find((branch) => branch.id === this.activeBranch) || null;
  }

  getZoomTransform() {
    const branch = this.getActiveBranch();
    if (!branch) return { scale: 1, cx: 450, cy: 450 };

    return {
      scale: 1.85,
      cx: branch.zoomCenter[0],
      cy: branch.zoomCenter[1]
    };
  }

  eventToPoint(event) {
    const rect = this.canvas.getBoundingClientRect();
    const canonicalX = ((event.clientX - rect.left) / rect.width) * 900;
    const canonicalY = ((event.clientY - rect.top) / rect.height) * 900;

    let x = canonicalX;
    let y = canonicalY;

    if (this.view === "branch") {
      const { scale, cx, cy } = this.getZoomTransform();
      x = (canonicalX - 450) / scale + cx;
      y = (canonicalY - 450) / scale + cy;
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

    if (this.view === "branch") {
      const activeClusters = this.clusters.filter((cluster) => cluster.cluster.branch === this.activeBranch);
      const clickedCluster = activeClusters.find((cluster) => cluster.contains(point.x, point.y));

      if (clickedCluster) {
        this.selected = clickedCluster.cluster.id;
        this.selectedClusterId = clickedCluster.cluster.id;
        this.detailPanel.showCluster(clickedCluster.cluster);
        this.draw();
        return;
      }

      const branch = this.getActiveBranch();
      if (branch && this.isNearBranch(point.x, point.y, branch)) {
        this.selected = branch.id;
        this.selectedClusterId = null;
        this.detailPanel.showBranch(branch.id);
        this.draw();
        return;
      }

      return;
    }

    const clickedBranch = this.findBranch(point.x, point.y);
    if (clickedBranch) {
      this.view = "branch";
      this.activeBranch = clickedBranch.id;
      this.selected = clickedBranch.id;
      this.selectedClusterId = null;
      this.detailPanel.showBranch(clickedBranch.id);
      this.draw();
      return;
    }

    const clickedPart = this.findPart(point.x, point.y);
    if (!clickedPart) return;

    this.view = "overview";
    this.activeBranch = null;
    this.selectedClusterId = null;
    this.selected = clickedPart.id;
    this.detailPanel.show(clickedPart.id);
    this.draw();
  }

  handleMove(event) {
    const point = this.eventToPoint(event);
    let hover = null;

    if (this.view === "branch") {
      const activeClusters = this.clusters.filter((cluster) => cluster.cluster.branch === this.activeBranch);
      const cluster = activeClusters.find((item) => item.contains(point.x, point.y));
      hover = cluster?.cluster?.label || null;

      if (!hover) {
        const branch = this.getActiveBranch();
        if (branch && this.isNearBranch(point.x, point.y, branch)) hover = branch.label;
      }
    } else {
      const branch = this.findBranch(point.x, point.y);
      const part = this.findPart(point.x, point.y);
      hover = branch?.label || part?.label || null;
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

  findPart(x, y) {
    return this.partHotspots.find((spot) => {
      const dx = x - spot.x;
      const dy = y - spot.y;
      return Math.sqrt(dx * dx + dy * dy) <= spot.r;
    });
  }

  findBranch(x, y) {
    return branches.find((branch) => {
      const labelHit = this.isInsideLabel(x, y, branch);
      const anchorHit = Math.hypot(x - branch.anchorX, y - branch.anchorY) <= 62;
      const pathHit = this.isNearBranch(x, y, branch);
      return labelHit || anchorHit || pathHit;
    });
  }

  isInsideLabel(x, y, branch) {
    const width = this.measureLabelWidth(branch.label) + 28;
    const height = 38;
    return x >= branch.labelX - width / 2 &&
      x <= branch.labelX + width / 2 &&
      y >= branch.labelY - height / 2 &&
      y <= branch.labelY + height / 2;
  }

  isNearBranch(x, y, branch) {
    const [x1, y1, x2, y2, x3, y3, x4, y4, width] = branch.path;
    let previous = { x: x1, y: y1 };
    const threshold = Math.max(34, width * 1.25);

    for (let t = 0.04; t <= 1; t += 0.04) {
      const current = this.cubicPoint(x1, y1, x2, y2, x3, y3, x4, y4, t);
      if (this.distanceToSegment(x, y, previous.x, previous.y, current.x, current.y) < threshold) return true;
      previous = current;
    }

    return false;
  }

  cubicPoint(x1, y1, x2, y2, x3, y3, x4, y4, t) {
    const mt = 1 - t;
    return {
      x: mt ** 3 * x1 + 3 * mt ** 2 * t * x2 + 3 * mt * t ** 2 * x3 + t ** 3 * x4,
      y: mt ** 3 * y1 + 3 * mt ** 2 * t * y2 + 3 * mt * t ** 2 * y3 + t ** 3 * y4
    };
  }

  distanceToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0) return Math.hypot(px - ax, py - ay);

    let t = ((px - ax) * dx + (py - ay) * dy) / lengthSquared;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx;
    const cy = ay + t * dy;
    return Math.hypot(px - cx, py - cy);
  }

  measureLabelWidth(text) {
    return Math.max(120, text.length * 9.5);
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

    if (this.view === "branch") {
      this.drawBranchZoom(ctx);
    } else {
      this.drawOverview(ctx);
    }

    ctx.restore();
  }

  drawOverview(ctx) {
    this.drawTree({ ctx, dimTree: false, activeBranchId: null });
    this.drawSoftCanopy(ctx);
    this.drawPartCallouts(ctx);
    this.drawBranchCallouts(ctx);
  }

  drawBranchZoom(ctx) {
    const branch = this.getActiveBranch();
    const { scale, cx, cy } = this.getZoomTransform();

    ctx.save();
    ctx.translate(450, 450);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);

    this.drawTree({ ctx, dimTree: true, activeBranchId: branch?.id });
    this.drawSoftCanopy(ctx, 0.13);
    this.drawBranchLeafClusters(ctx, branch?.id);
    if (branch) this.drawBranchCallout(ctx, branch, true);

    ctx.restore();

    if (branch) {
      this.drawZoomHeader(ctx, branch);
    }
  }

  drawTree({ ctx, dimTree = false, activeBranchId = null }) {
    this.drawRoots(ctx, dimTree);
    this.drawTrunk(ctx, dimTree);
    branches.forEach((branch) => this.drawBranch(ctx, branch, activeBranchId === branch.id, dimTree));
    this.drawApical(ctx, dimTree);
  }

  drawBackground(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, 900);
    sky.addColorStop(0, "#f7fbf3");
    sky.addColorStop(0.72, "#fffdf6");
    sky.addColorStop(1, "#efe0c6");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 900, 900);

    ctx.fillStyle = "rgba(154, 109, 49, 0.18)";
    ctx.fillRect(0, 815, 900, 85);
  }

  drawTrunk(ctx, dim = false) {
    const alpha = dim ? 0.25 : 0.98;
    const gradient = ctx.createLinearGradient(0, 180, 0, 790);
    gradient.addColorStop(0, "#a36d34");
    gradient.addColorStop(0.55, "#7a4a26");
    gradient.addColorStop(1, "#4a2c18");

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = gradient;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 70;
    ctx.beginPath();
    ctx.moveTo(450, 770);
    ctx.bezierCurveTo(425, 640, 450, 520, 438, 400);
    ctx.bezierCurveTo(430, 300, 444, 190, 450, 88);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(422, 744);
    ctx.bezierCurveTo(410, 610, 427, 498, 418, 365);
    ctx.stroke();

    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(482, 735);
    ctx.bezierCurveTo(500, 610, 468, 470, 486, 312);
    ctx.stroke();
    ctx.restore();
  }

  drawBranch(ctx, branch, active = false, dimTree = false) {
    const [x1, y1, x2, y2, x3, y3, x4, y4, width] = branch.path;
    const alpha = active ? 1 : dimTree ? 0.18 : 0.92;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = active ? "#8b5429" : "#7a4a26";
    ctx.lineWidth = active ? width + 8 : width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4);
    ctx.stroke();

    ctx.strokeStyle = active ? "rgba(255,255,255,0.36)" : "rgba(255,255,255,0.18)";
    ctx.lineWidth = Math.max(3, width * 0.12);
    ctx.beginPath();
    ctx.moveTo(x1 - 3, y1 - 2);
    ctx.bezierCurveTo(x2 - 5, y2 - 5, x3 - 5, y3 - 3, x4 - 4, y4 - 2);
    ctx.stroke();
    ctx.restore();
  }

  drawRoots(ctx, dim = false) {
    ctx.save();
    ctx.globalAlpha = dim ? 0.22 : 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const roots = [
      [448, 760, 382, 815, 292, 828, 150, 885, 28],
      [454, 760, 520, 814, 610, 828, 760, 885, 28],
      [450, 762, 450, 820, 448, 858, 450, 920, 32],
      [425, 770, 362, 820, 332, 848, 285, 900, 16],
      [480, 770, 540, 820, 580, 850, 632, 900, 16]
    ];

    roots.forEach(([x1, y1, x2, y2, x3, y3, x4, y4, width]) => {
      ctx.strokeStyle = "#5a331d";
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4);
      ctx.stroke();
    });
    ctx.restore();
  }

  drawApical(ctx, dim = false) {
    ctx.save();
    ctx.globalAlpha = dim ? 0.3 : 1;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#006eff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(450, 86, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawSoftCanopy(ctx, alpha = 0.45) {
    const canopyLeaves = [
      [185, 145, 42], [230, 118, 40], [285, 130, 44], [340, 100, 42], [395, 138, 45],
      [460, 116, 44], [520, 135, 43], [575, 108, 42], [640, 146, 44], [706, 128, 39],
      [165, 215, 44], [238, 225, 44], [310, 210, 45], [382, 230, 48], [450, 220, 46],
      [520, 218, 45], [590, 228, 45], [662, 218, 43], [744, 226, 41],
      [215, 315, 44], [285, 318, 43], [356, 308, 44], [522, 312, 44], [594, 320, 43], [675, 315, 41],
      [222, 430, 43], [310, 438, 42], [585, 410, 43], [675, 432, 42],
      [196, 545, 44], [286, 575, 42], [604, 520, 43], [704, 540, 42]
    ];

    ctx.save();
    ctx.globalAlpha = alpha;
    canopyLeaves.forEach(([x, y, r], index) => {
      ctx.fillStyle = index % 3 === 0 ? "#7fcf6d" : index % 3 === 1 ? "#99d887" : "#60bd52";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  drawBranchLeafClusters(ctx, branchId) {
    this.clusters.forEach((cluster) => {
      const activeBranch = cluster.cluster.branch === branchId;
      cluster.draw(ctx, {
        selected: this.selectedClusterId === cluster.cluster.id,
        dimmed: !activeBranch,
        labels: activeBranch,
        visible: true
      });
    });
  }

  drawPartCallouts(ctx) {
    this.drawCallout(ctx, "Apical meristem", 620, 78, 450, 86, "right", this.selected === "apical");
    this.drawCallout(ctx, "Trunk", 585, 575, 452, 525, "right", this.selected === "trunk");
    this.drawCallout(ctx, "Taproot", 185, 760, 452, 805, "left", this.selected === "taproot");
    this.drawCallout(ctx, "Lateral roots", 715, 760, 585, 780, "right", this.selected === "roots");
  }

  drawBranchCallouts(ctx) {
    branches.forEach((branch) => this.drawBranchCallout(ctx, branch, this.selected === branch.id));
  }

  drawBranchCallout(ctx, branch, active = false) {
    this.drawCallout(ctx, branch.label, branch.labelX, branch.labelY, branch.anchorX, branch.anchorY, branch.labelX < branch.anchorX ? "left" : "right", active);
  }

  drawCallout(ctx, text, labelX, labelY, anchorX, anchorY, side = "left", active = false) {
    ctx.save();
    const blue = active ? "#004dd6" : "#006eff";
    ctx.strokeStyle = blue;
    ctx.lineWidth = active ? 5 : 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const textWidth = this.measureLabelWidth(text);
    const lineEnd = side === "left" ? labelX + textWidth / 2 + 18 : labelX - textWidth / 2 - 18;
    const textLineStart = side === "left" ? labelX - textWidth / 2 - 10 : labelX + textWidth / 2 + 10;

    ctx.beginPath();
    ctx.moveTo(textLineStart, labelY + 18);
    ctx.lineTo(lineEnd, labelY + 18);
    ctx.lineTo(anchorX, anchorY);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(anchorX, anchorY, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = blue;
    ctx.lineWidth = active ? 5 : 4;
    ctx.stroke();

    ctx.fillStyle = active ? "#003c9e" : "#050505";
    ctx.font = active ? "800 24px Inter, system-ui, sans-serif" : "700 23px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, labelX, labelY);
    ctx.restore();
  }

  drawZoomHeader(ctx, branch) {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.strokeStyle = "rgba(0,110,255,0.28)";
    ctx.lineWidth = 2;
    this.roundRect(ctx, 38, 30, 824, 66, 22);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1f2a1f";
    ctx.font = "800 24px Inter, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`${branch.label}: highlighted evidence clusters`, 62, 62);
    ctx.fillStyle = "#5d665b";
    ctx.font = "600 14px Inter, system-ui, sans-serif";
    ctx.fillText("Click a leaf cluster to show its books, artifacts, and significance. Use Whole tree to zoom out.", 62, 84);
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
