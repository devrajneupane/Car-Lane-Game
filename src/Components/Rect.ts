export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export default class Rect implements IRect {
  x: number;
  y: number;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.width = 8; // lane marker width
    this.height = 50; // lane marker height
    this.x = this.canvas.width / 3 - this.width / 2;
    this.y = 0;
  }

  makeLaneMarker() {
    for (let i = 0; i <= 10; i++) {
      if (this.y > this.canvas.height) {
        this.y = 5;
      }
      this.draw();
      this.draw(this.x);
      this.y += 100;
    }
  }

  draw(xOffset = 0) {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(this.x + xOffset, this.y, this.width, this.height);
  }
}
