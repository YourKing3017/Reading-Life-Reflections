export class LeafCluster {
  constructor(cluster) {
    this.cluster = cluster;
    this.leaves = this.makeLeaves(cluster);
  }

  makeLeaves(cluster) {
    const leaves = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < cluster.count; i++) {
      const radius = 8 + Math.sqrt(i) * 8;
      const angle = i * goldenAngle;
      const jitterX = Math.cos(angle) * radius;
      const jitterY = Math.sin(angle) * radius * 0.72;

      leaves.push({
        x: cluster.x + jitterX,
        y: cluster.y + jitterY,
        rx: 18 + (i % 3) * 3,
        ry: 9 + (i % 2) * 2,
        rotation: angle,
        color: cluster.color
      });
    }

    return leaves;
  }

  draw(ctx, selected) {
    this.leaves.forEach((leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.rx, leaf.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = leaf.color;
      ctx.globalAlpha = selected ? 1 : 0.88;
      ctx.fill();
      ctx.strokeStyle = selected ? "rgba(255,255,255,0.85)" : "rgba(7,17,12,0.28)";
      ctx.lineWidth = selected ? 2 : 1;
      ctx.stroke();
      ctx.restore();
    });

    ctx.save();
    ctx.fillStyle = "rgba(7,17,12,0.72)";
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1;
    this.roundRect(ctx, this.cluster.x - 52, this.cluster.y + 45, 104, 28, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f4f1e8";
    ctx.font = "700 13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.cluster.label, this.cluster.x, this.cluster.y + 59);
    ctx.restore();
  }

  contains(x, y) {
    const dx = x - this.cluster.x;
    const dy = y - this.cluster.y;
    return Math.sqrt(dx * dx + dy * dy) < 82;
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
