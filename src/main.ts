import "./styles/style.css";

import Car from "./Components/Car";
import Game from "./Components/Game";
import { getRandomInt, clamp } from "./utils/common";
import { CANVAS, SPEED, STEP } from "./constants/constants";
import Rect from "./Components/Rect";

// Import all PNG images from the assets folder
const images = import.meta.glob("./assets/*.png", { eager: true });
const imagePaths = Object.values(images).map(
  (image) => (image as { default: string }).default,
);
const imageLength = imagePaths.length;

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

const game = new Game(imagePaths, ctx);
const laneMarker = new Rect(canvas, ctx);

function draw() {
  ctx.fillStyle = "#000";
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

  game.opponents.forEach((opponnet) => {
    laneMarker.makeLaneMarker();
    game.player.draw();
    opponnet.draw();

    // Increase speed gradually
    opponnet.y += clamp(SPEED * game.gameSpeed, 0, 20);

    // Check for collision
    if (game.isColliding(opponnet, game.player)) {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.totalScore = 0;
    }

    // Randomize car image and update score
    if (opponnet.y > CANVAS.height + opponnet.img.height) {
      opponnet.y = getRandomInt(-800, 0);
      opponnet.img.src = imagePaths[getRandomInt(0, imageLength)];
      game.totalScore += 1;
    }
  });

  game.gameSpeed *= 1.001;
  requestAnimationFrame(draw);
}

const animationId = requestAnimationFrame(draw);

window.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a": {
      game.player.x -= STEP;
      if (game.player.x < 0) {
        game.player.x = 0;
      }
      break;
    }

    case "ArrowRight":
    case "d": {
      game.player.x += STEP;
      if (game.player.x + game.player.width > CANVAS.width) {
        game.player.x = CANVAS.width - game.player.width;
      }
      break;
    }
  }
});

/**
 * Show score and stop game when game is over
 */
// @ts-ignore
function gameOver(car: Car) {}
