import "./styles/style.css";

import Game from "./Components/Game";
import { CANVAS } from "./constants/constants";

// Import all PNG images from the assets folder
const images = import.meta.glob("./assets/*.png", { eager: true });
const imagePaths = Object.values(images).map(
  (image) => (image as { default: string }).default,
);

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

const game = new Game(imagePaths, ctx);

function animate() {
  ctx.fillStyle = "#000";
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

  switch (game.currentState) {
    case game.states[0]:
      game.start();
      break;
    case game.states[1]:
      game.play();
      break;
    case game.states[2]:
      game.end();
      break;
    default:
      break;
  }
  requestAnimationFrame(animate);
}

animate();
