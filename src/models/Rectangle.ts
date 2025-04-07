import { Shape } from '../entities/Shape';
import { Point } from '../entities/Point';
import { InvalidShapeError } from '../errors/InvalidShapeError';

export class Rectangle extends Shape {
  private points: Point[];

  constructor(id: string, points: Point[]) {
    super(id);
    if (points.length !== 4) {
      throw new InvalidShapeError('Rectangle must have exactly 4 points');
    }
    this.points = points;
  }

  public getArea(): number {
    const [a, b, c] = this.points;
    const width = a.distanceTo(b);
    const height = b.distanceTo(c);
    return width * height;
  }

  public getPerimeter(): number {
    const [a, b, c, d] = this.points;
    return a.distanceTo(b) + b.distanceTo(c) + c.distanceTo(d) + d.distanceTo(a);
  }

  public isRectangle(): boolean {
    const [a, b, c, d] = this.points;
    const ab = a.distanceTo(b);
    const bc = b.distanceTo(c);
    const cd = c.distanceTo(d);
    const da = d.distanceTo(a);

    const angleABC = Point.angleBetween(a, b, c);
    const angleBCD = Point.angleBetween(b, c, d);
    const angleCDA = Point.angleBetween(c, d, a);
    const angleDAB = Point.angleBetween(d, a, b);

    return (
      Math.abs(angleABC - 90) < 0.001 &&
      Math.abs(angleBCD - 90) < 0.001 &&
      Math.abs(angleCDA - 90) < 0.001 &&
      Math.abs(angleDAB - 90) < 0.001 &&
      ab === cd && bc === da
    );
  }

  public isSquare(): boolean {
    return this.isRectangle() && this.getSideLengths().every((l, _, arr) => l === arr[0]);
  }

  public isRhombus(): boolean {
    const lengths = this.getSideLengths();
    return lengths.every((l, _, arr) => l === arr[0]) && !this.isSquare();
  }

  public isTrapezoid(): boolean {
    const [a, b, c, d] = this.points;
    return (
      Point.areParallel(a, b, c, d) || Point.areParallel(b, c, d, a)
    ) && !this.isRectangle();
  }

  public isConvex(): boolean {
    const [a, b, c, d] = this.points;
    const cross1 = Point.crossProductSign(a, b, c);
    const cross2 = Point.crossProductSign(b, c, d);
    const cross3 = Point.crossProductSign(c, d, a);
    const cross4 = Point.crossProductSign(d, a, b);
    return cross1 === cross2 && cross2 === cross3 && cross3 === cross4;
  }

  private getSideLengths(): number[] {
    const [a, b, c, d] = this.points;
    return [
      a.distanceTo(b),
      b.distanceTo(c),
      c.distanceTo(d),
      d.distanceTo(a),
    ];
  }
}
