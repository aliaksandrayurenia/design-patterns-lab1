import { Shape } from '../entities/Shape';
import { Point } from '../entities/Point';
import { InvalidShapeError } from '../errors/InvalidShapeError';

export class Cone extends Shape {
  constructor(
    id: string,
    public baseCenter: Point,
    public radius: number,
    public height: number
  ) {
    super(id);
    if (radius <= 0 || height <= 0) {
      throw new InvalidShapeError('Radius and height must be positive values.');
    }
  }

  // Требуется по абстрактному классу Shape
  public getArea(): number {
    return this.getSurfaceArea();
  }

  // Требуется по абстрактному классу Shape
  public getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  public getSurfaceArea(): number {
    return Math.PI * this.radius * (this.radius + Math.sqrt(this.height ** 2 + this.radius ** 2));
  }

  public getVolume(): number {
    return (1 / 3) * Math.PI * this.radius ** 2 * this.height;
  }

  public getSectionVolumeRatio(): number {
    // Упрощённо: половина объёма, если сечение пополам по высоте
    return this.getVolume() / 2;
  }

  public isBaseOnCoordinatePlane(): boolean {
    return this.baseCenter.z === 0;
  }

  public isConeShape(): boolean {
    return this.radius > 0 && this.height > 0;
  }
}
