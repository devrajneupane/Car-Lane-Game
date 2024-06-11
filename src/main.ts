import "./style.css";
import { DIMENSIONS, SPEED } from "./constants";
import Point from "./Components/Point";
import Car from "./Components/Car";
import { getRandomInt, clamp } from "./utils/common";

// Import all PNG images from the assets folder
const images = import.meta.glob("./assets/*.png", { eager: true });
const imagePaths = Object.values(images).map(
  (image) => (image as { default: string }).default,
);

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const car1 = new Car(new Point(150, getRandomInt(-200, 0)), 20);
const car2 = new Car(new Point(300, getRandomInt(-300, -100)), 20);
const car3 = new Car(new Point(450, getRandomInt(-400, 0)), 20);

const player = new Car(new Point(300, DIMENSIONS.CANVAS_HEIGHT - 40), 20);

const cars = [car1, car2, car3];

let gameSpeed = 1.01;

const userCar = new Image();
userCar.src = imagePaths[3];

const opponentCar = new Image();
opponentCar.src = imagePaths[0];

let randomIndex = 3;
const totalImage = imagePaths.length;

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.fillRect(10, 10, 200, 200);
  ctx.stroke();

  cars.forEach((car) => {
    ctx.beginPath();
    ctx.drawImage(
      opponentCar,
      80,
      17,
      96,
      218,
      car.center.x - 20,
      car.center.y - 100,
      60,
      100,
    );

    car.center.y += clamp(SPEED * gameSpeed, 0, 20);

    if (car.center.y > DIMENSIONS.CANVAS_HEIGHT) {
      car.center.y = 0;
      do {
        randomIndex = getRandomInt(0, totalImage);
      } while (randomIndex === 3);
      opponentCar.src = imagePaths[randomIndex];
    }
  });

  ctx.beginPath();
  ctx.drawImage(
    userCar,
    80,
    17,
    96,
    218,
    player.center.x - 20,
    player.center.y - 100,
    60,
    100,
  );

  requestAnimationFrame(draw);
  gameSpeed *= 1.001;
}

requestAnimationFrame(draw);

window.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "a": {
      player.center.x -= 10;
      if (player.center.x < 0) {
        player.center.x = 0 + player.width;
      }
      break;
    }

    case "d": {
      player.center.x += 10;
      if (player.center.x > DIMENSIONS.CANVAS_WIDTH) {
        player.center.x = DIMENSIONS.CANVAS_WIDTH - player.width;
      }
      break;
    }
  }
});
