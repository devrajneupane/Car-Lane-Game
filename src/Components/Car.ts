import Point from "./Point";

export interface ICar {
  center: Point;
  width: number;
}

export default class Car implements ICar {
  center: Point;
  width: number;

  constructor(center: Point, radius: number) {
    this.center = center;
    this.width = radius;
  }
}
