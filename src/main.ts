import "./styles/style.css";

import Car from "./Components/Car";
import { getRandomInt, clamp } from "./utils/common";
import { DIMENSIONS, SPEED } from "./constants/constants";

// Import all PNG images from the assets folder
const images = import.meta.glob("./assets/*.png", { eager: true });
const imagePaths = Object.values(images).map(
  (image) => (image as { default: string }).default,
);

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

let totalScore = 0;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;
const totalImage = imagePaths.length;

const player = new Car(
  imagePaths[3],
  300,
  DIMENSIONS.CANVAS_HEIGHT - 40,
  20,
  true,
);
const cars = [
  new Car(
    imagePaths[getRandomInt(0, totalImage)],
    150,
    getRandomInt(-200, 0),
    20,
    false,
  ),
  new Car(
    imagePaths[getRandomInt(0, totalImage)],
    300,
    getRandomInt(-300, -100),
    20,
    false,
  ),
  new Car(
    imagePaths[getRandomInt(0, totalImage)],
    450,
    getRandomInt(-400, 0),
    20,
    false,
  ),
];

let gameSpeed = 1.01;

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.strokeStyle = "#fff";

  cars.forEach((car) => {
    ctx.drawImage(
      car.img,
      80,
      17,
      90,
      218,
      car.x - car.width,
      car.y - 100,
      60,
      100,
    );

    car.y += clamp(SPEED * gameSpeed, 0, 20);

    if (car.y > DIMENSIONS.CANVAS_HEIGHT + car.img.height) {
      if (car.x === 150) {
        car.y = getRandomInt(-200, 0);
      } else if (car.x === 300) {
        car.y = getRandomInt(-300, -100);
      } else if (car.x === 450) {
        car.y = getRandomInt(-400, 0);
      }
      car.img.src = imagePaths[getRandomInt(0, totalImage)];

      totalScore += 1;
    }
    if (isColliding(car, player)) {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      document.addEventListener("keypress", (event) => {
        if (event.key === " ") {
          location.reload();
        }
      });
    }
  });

  ctx.drawImage(
    player.img,
    80,
    17,
    90,
    215,
    player.x - player.width,
    player.y - 100,
    60,
    100,
  );
  // ctx.strokeRect(player.x - 20, player.y - 100, 60, 100);

  gameSpeed *= 1.001;
  // const animationId = requestAnimationFrame(draw);
  requestAnimationFrame(draw);
}

// requestAnimationFrame(draw);
const animationId = requestAnimationFrame(draw);

window.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "a": {
      player.x -= 10;
      if (player.x < 0) {
        player.x = 0 + player.width;
      }
      break;
    }

    case "d": {
      player.x += 10;
      if (player.x > DIMENSIONS.CANVAS_WIDTH) {
        player.x = DIMENSIONS.CANVAS_WIDTH - player.width;
      }
      break;
    }
  }
});

/**
 * Detect collision between two rectangular objects
 * uisng Axis-Aligned Bounding Box (AABB)
 */
// @ts-ignore
function isColliding(car1: Car, car2: Car): boolean {
  return (
    car1.x < car2.x + car2.width &&
    car1.x + car1.width > car2.x &&
    car1.y < car2.y + car2.img.height &&
    car1.y + car1.img.height > car2.y
  );
}

/*
 * Checks if player car passes opponnent car
 */
// @ts-ignore
function increaseScore(car: Car) {
  if (!car.player) {
    totalScore += 1;
  }
}

/*
 * Show score and stop game when game is over
 */
// @ts-ignore
function gameOver(car: Car) {
  if (!car.player) {
    totalScore += 1;
  }
}
