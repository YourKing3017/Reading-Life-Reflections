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

  draw(ctx, selected, opacity = 0.92) {
    this.leaves.forEach((leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.rx, leaf.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = leaf.color;
      ctx.globalAlpha = selected ? 1 : opacity;
      ctx.fill();
      ctx.strokeStyle = selected ? "rgba(255,255,255,0.9)" : "rgba(7,17,12,0.28)";
      ctx.lineWidth = selected ? 2.5 : 1;
      ctx.stroke();
      ctx.restore();
    });

    ctx.save();
    ctx.globalAlpha = selected ? 1 : Math.max(0.72, opacity);
    ctx.fillStyle = selected ? "rgba(255,255,255,0.92)" : "rgba(7,17,12,0.78)";
    ctx.strokeStyle = "rgba(255,255,255,0.24)";
    ctx.lineWidth = 1;
    this.roundRect(ctx, this.cluster.x - 58, this.cluster.y + 48, 116, 30, 15);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = selected ? "#07110c" : "#f4f1e8";
    ctx.font = "800 13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.cluster.label, this.cluster.x, this.cluster.y + 63);
    ctx.restore();
  }

  contains(x, y) {
    const dx = x - this.cluster.x;
    const dy = y - this.cluster.y;
    return Math.sqrt(dx * dx + dy * dy) < 86;
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
