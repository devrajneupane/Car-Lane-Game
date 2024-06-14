type Point = {
  x: number;
  y: number;
};

export interface IRect {
  start: Point;
  end: Point;
}

export default class Rect implements IRect {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
}
