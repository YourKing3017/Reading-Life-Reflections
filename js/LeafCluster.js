export class LeafCluster {
  constructor(cluster) {
    this.cluster = cluster;
    this.leaves = this.makeLeaves(cluster);
  }

  makeLeaves(cluster) {
    const leaves = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < cluster.count; i++) {
      const radius = 9 + Math.sqrt(i) * 8.5;
      const angle = i * goldenAngle;
      const jitterX = Math.cos(angle) * radius;
      const jitterY = Math.sin(angle) * radius * 0.68;

      leaves.push({
        x: cluster.x + jitterX,
        y: cluster.y + jitterY,
        rx: 16 + (i % 3) * 4,
        ry: 10 + (i % 2) * 2,
        rotation: angle,
        color: cluster.color
      });
    }

    return leaves;
  }

  draw(ctx, options = {}) {
    const {
      selected = false,
      dimmed = false,
      labels = false,
      visible = true
    } = options;

    if (!visible) return;

    const alpha = selected ? 0.98 : dimmed ? 0.18 : 0.48;

    this.leaves.forEach((leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.rx, leaf.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = leaf.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.strokeStyle = selected ? "rgba(0,101,255,0.75)" : "rgba(44,96,39,0.18)";
      ctx.lineWidth = selected ? 2.2 : 0.8;
      ctx.stroke();
      ctx.restore();
    });

    if (selected) {
      ctx.save();
      ctx.strokeStyle = "#006eff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(this.cluster.x, this.cluster.y, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    if (labels) this.drawLabel(ctx, selected);
  }

  drawLabel(ctx, selected) {
    ctx.save();
    ctx.fillStyle = selected ? "#006eff" : "#123315";
    ctx.font = "800 15px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 5;
    ctx.strokeText(this.cluster.label, this.cluster.x, this.cluster.y + 70);
    ctx.fillText(this.cluster.label, this.cluster.x, this.cluster.y + 70);
    ctx.restore();
  }

  contains(x, y) {
    const dx = x - this.cluster.x;
    const dy = y - this.cluster.y;
    return Math.sqrt(dx * dx + dy * dy) < 82;
  }
}
