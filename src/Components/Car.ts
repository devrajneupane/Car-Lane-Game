import { CAR } from "../constants/constants";

export interface ICar {
  img: HTMLImageElement;
  imgPath: string;
  width: number;
  height: number;
  player: boolean;
  ctx: CanvasRenderingContext2D;
}

export default class Car implements ICar {
  x: number;
  y: number;
  img: HTMLImageElement;
  imgPath: string;
  width: number;
  height: number;
  player: boolean;
  ctx: CanvasRenderingContext2D;

  constructor(
    imgPath: string,
    x: number,
    y: number,
    player: boolean,
    ctx: CanvasRenderingContext2D,
  ) {
    this.imgPath = imgPath;
    this.x = x;
    this.y = y;
    this.player = player;
    this.ctx = ctx;

    this.width = CAR.dw;
    this.height = CAR.dh;
    this.img = new Image();
    this.img.src = this.imgPath;

    if (player) {
      this.y -= this.height;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      CAR.sx,
      CAR.sy,
      CAR.sw,
      CAR.sh,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
