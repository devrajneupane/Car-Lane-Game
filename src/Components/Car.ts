export interface ICar {
  img: HTMLImageElement;
  imgPath: string;
  width: number;
  player: boolean;
}

export default class Car implements ICar {
  x: number;
  y: number;
  img: HTMLImageElement;
  imgPath: string;
  width: number;
  player: boolean;

  constructor(
    imgPath: string,
    x: number,
    y: number,
    width: number,
    player: boolean,
  ) {
    this.imgPath = imgPath;
    this.x = x;
    this.y = y;
    this.width = width;
    this.player = player;

    this.img = new Image();
    this.img.src = this.imgPath;
  }
}
