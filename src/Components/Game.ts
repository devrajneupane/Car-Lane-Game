import Car from "./Car";
import LaneMark from "./LaneMark";
import { CANVAS, LANE, SCORE_KEY, SPEED } from "../constants/constants";
import {
  clamp,
  getRandomInt,
  getLocalStorage,
  setLocalStorage,
} from "../utils/common";
import { keys } from "../utils/input";

export interface IGame {
  score: number;
  highScore: number;
  gameSpeed: number;
  states: Array<string>;
  currentState: string;
  imgPaths: Array<string>;
  ctx: CanvasRenderingContext2D;
  player: Car;
  opponents: Array<Car>;
  laneMarker: LaneMark;
}

export default class Game implements IGame {
  score: number;
  highScore: number;
  gameSpeed: number;
  states: Array<string>;
  currentState: string;
  imgPaths: Array<string>;
  ctx: CanvasRenderingContext2D;
  player: Car;
  opponents: Array<Car>;
  laneMarker: LaneMark;

  constructor(imgPaths: Array<string>, ctx: CanvasRenderingContext2D) {
    this.imgPaths = imgPaths;
    this.ctx = ctx;

    this.score = 0;

    this.highScore = getLocalStorage(SCORE_KEY) ?? 0;

    this.gameSpeed = 1.01;
    this.opponents = [];
    this.states = ["start", "play", "end"];
    this.currentState = this.states[0];
    this.laneMarker = new LaneMark(this.ctx);

    this.player = new Car(this.imgPaths[3], 300, CANVAS.height, true, this.ctx);
    Object.values(LANE).forEach((x) => {
      this.opponents.push(
        new Car(
          imgPaths[getRandomInt(0, imgPaths.length)],
          x,
          getRandomInt(-400, 0),
          false,
          ctx,
        ),
      );
    });
  }

  /**
   * Start screen
   */
  start() {
    this.currentState = this.states[0];

    this.ctx.font = "45px Arial";
    this.ctx.fillStyle = "#b10000";
    this.ctx.fillText("Car Lane Game", 50, 255);

    this.ctx.font = "30px Arial";
    this.ctx.fillText("Press Enter to Start", 50, 350);

    keys.enter ? this.play() : null;
  }

  /**
   * Game Over screen
   */
  end() {
    this.currentState = this.states[2];
    this.ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);

    this.ctx.font = "bold 50px Arial";
    this.ctx.fillStyle = "#b10000";
    this.ctx.fillText("Game Over!", 50, 150);

    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "#f0f0f0";
    this.ctx.fillText(`Your Score: ${this.score}`, 50, 200);
    this.ctx.fillText(`Your High Score: ${this.highScore}`, 50, 230);

    this.ctx.font = "18px Arial";
    this.ctx.fillText("Press Enter to Play again", 50, 280);
    this.ctx.fillText("Press Space to go to Home Screen", 50, 310);

    if (keys.enter) {
      this.score = -1;
      this.play();
    } else if (keys.space) {
      this.score = 0;
      this.start();
    }
  }

  /**
   * Restart game
   */
  play() {
    this.currentState = this.states[1];
    this.laneMarker.makeLaneMarker();
    this.opponents.forEach((opponnet) => {
      // Increase speed gradually
      opponnet.y += clamp(SPEED * this.gameSpeed, 0, 20);

      // Check for collision
      if (this.isColliding(opponnet, this.player)) {
        if (this.highScore < this.score) {
          setLocalStorage(SCORE_KEY, this.score);
          this.highScore = this.score;
        }

        this.end();
      }

      // Randomize car image and update score
      if (opponnet.y >= CANVAS.height) {
        opponnet.y = getRandomInt(-800, 0);
        opponnet.img.src = this.imgPaths[getRandomInt(0, this.imgPaths.length)];
        this.score += 1;
      }
      opponnet.draw();
    });

    keys.right
      ? this.player.moveRight()
      : keys.left
        ? this.player.moveLeft()
        : null;

    this.player.draw();
    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "#00ff00";
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`High Score: ${getLocalStorage(SCORE_KEY)}`, 10, 40);
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
