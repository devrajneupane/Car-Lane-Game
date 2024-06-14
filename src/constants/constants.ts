/**
 * Intial speed
 */
export const SPEED = 3;

/**
 * Step at which the player car can be maneuvered horizontally.
 */
export const STEP = 30;

/**
 * Canvas properties
 */
export const CANVAS = {
  width: 400,
  height: 900,
};

/**
 * Car properties
 */
export const CAR = {
  sx: 79,
  sy: 17,
  sw: 90,
  sh: 218,
  dw: 60,
  dh: 120,
};

/**
 * Lane properties
 */
export const LANE = {
  firstLaneCenterX: CANVAS.width / 6 - CAR.dw / 2,
  secondLaneCenterX: (CANVAS.width * 3) / 6 - CAR.dw / 2,
  thirdLaneCenterX: (CANVAS.width * 5) / 6 - CAR.dw / 2,
};
