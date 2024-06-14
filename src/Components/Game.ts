import Car from "./Car";
import { getRandomInt } from "../utils/common";
import { CANVAS, LANE } from "../constants/constants";

export interface IGame {
  totalScore: number;
  gameSpeed: number;
  imgPaths: Array<string>;
  player: Car;
  opponents: Array<Car>;
}

export default class Game implements IGame {
  totalScore: number;
  gameSpeed: number;
  imgPaths: Array<string>;
  player: Car;
  opponents: Array<Car>;

  constructor(imgPaths: Array<string>, ctx: CanvasRenderingContext2D) {
    this.imgPaths = imgPaths;

    this.totalScore = 0;
    this.gameSpeed = 1.01;
    this.opponents = [];

    this.player = new Car(this.imgPaths[3], 300, CANVAS.height, true, ctx);
    Object.values(LANE).forEach((x) => {
      this.opponents.push(
        new Car(
          imgPaths[getRandomInt(0, imgPaths.length)],
          x,
          getRandomInt(-200, 0),
          false,
          ctx,
        ),
      );
    });
  }

  /**
   * Detect collision between two rectangular objects
   * uisng Axis-Aligned Bounding Box (AABB) method
   */
  isColliding(player: Car, opponnet: Car): boolean {
    return (
      player.x < opponnet.x + opponnet.width &&
      player.x + player.width > opponnet.x &&
      player.y < opponnet.y + opponnet.height &&
      player.y + player.height > opponnet.y
    );
  }
}
