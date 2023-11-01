import { pointsAlongLine, pixelArtLine } from "../utils.js";
// let eW = 6
// let eH = 10

class Brush {
  constructor(ctx, ctx2) {
    this.name = "brush";
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.isDrawing = false;
    this.r = 1;
  }
  select() {}
  drawStart({ x, y, lastX, lastY }) {
    this.drawMove({ x, y, lastX, lastY });
  }
  drawMove({ x, y, lastX, lastY }) {
    if (!lastX) {
      lastX = x;
      lastY = y;
    }
    let points = pointsAlongLine(x, y, lastX, lastY, 0.5);
    points.forEach((point, i) => {
      // ctx.beginPath();
      // ctx.arc(
      //   Math.round(point.x),
      //   Math.round(point.y),
      //   6,
      //   0, Math.PI * 2
      // );
      // ctx.fill()
      this.ctx.fillRect(
        Math.round(point.x) - this.r / 2,
        Math.round(point.y) - this.r / 2,
        this.r,
        this.r
      );
    });
  }
  drawEnd() {}
  tick({ lastX, lastY }) {
    let { ctx, ctx2 } = this;
    ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
    if (!lastX) return;

    // ctx2.beginPath()
    // ctx2.setLineDash([4, 4]);
    let dashLength = 2;
    let x1 = Math.round(lastX) - this.r / 2;
    let y1 = Math.round(lastY) - this.r / 2;
    let x2 = Math.round(lastX) + this.r / 2;
    let y2 = Math.round(lastY) + this.r / 2;
    let offset = pixelArtLine(ctx2, x1, y1, x2, y1, dashLength);
    offset = pixelArtLine(ctx2, x2, y1, x2, y2, dashLength, offset + 1);

    offset = pixelArtLine(ctx2, x1, y1, x1, y2, dashLength);
    pixelArtLine(ctx2, x1, y2, x2, y2, dashLength, offset + 1);
  }
}

export default Brush;
