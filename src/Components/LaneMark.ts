import { CANVAS } from "../constants/constants";

export interface ILaneMark {
  x: number;
  y: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
}

export default class LaneMark implements ILaneMark {
  x: number;
  y: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;

  constructor( ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.width = 8; // lane marker width
    this.height = 50; // lane marker height
    this.x = CANVAS.width / 3 - this.width / 2;
    this.y = 0;
  }

  makeLaneMarker() {
    for (let i = 0; i <= 10; i++) {
      if (this.y > CANVAS.height) {
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
