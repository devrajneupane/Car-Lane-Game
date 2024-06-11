import Point from "./Point";

export interface IRect {
  start: Point;
  end: Point;
}

export default class Rect implements IRect {
  start: Point = new Point(0, 0);
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
}
