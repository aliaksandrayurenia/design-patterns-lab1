import { Shape } from '../entities/Shape';
import { Point } from '../entities/Point';
import { Rectangle } from './Rectangle';
import { InvalidShapeError } from '../errors/InvalidShapeError';

export class Pyramid extends Shape {
  constructor(
    id: string,
    public basePoints: Point[], 
    public apex: Point         
  ) {
    super(id);
    if (basePoints.length !== 4) {
      throw new InvalidShapeError('Pyramid base must have exactly 4 points');   
    }
  }

  public getArea(): number {
    const baseArea = new Rectangle('tmp', this.basePoints).getArea();
    return baseArea + this.getLateralArea(); 
  }
 
  private getLateralArea(): number {
    const baseCenter = this.getBaseCenter();
    return this.basePoints.reduce((sum, point) => {
      const baseEdge = point.distanceTo(baseCenter);
      const slantHeight = this.apex.distanceTo(baseCenter);
      return sum + 0.5 * baseEdge * slantHeight;
    }, 0);
  }

  public getVolume(): number {
    const baseArea = new Rectangle('tmp', this.basePoints).getArea();
    const height = this.apex.z - this.basePoints[0].z;
    return (1 / 3) * baseArea * height;
  }

  public isBaseOnCoordinatePlane(): boolean {
    return this.basePoints.every(p => p.z === 0);
  }

  public isPyramidShape(): boolean {
    return this.basePoints.length === 4 && this.apex != null;
  }

  private getBaseCenter(): Point {
    const sumX = this.basePoints.reduce((acc, p) => acc + p.x, 0);
    const sumY = this.basePoints.reduce((acc, p) => acc + p.y, 0);
    const sumZ = this.basePoints.reduce((acc, p) => acc + p.z, 0);
    const n = this.basePoints.length;
    return new Point(sumX / n, sumY / n, sumZ / n);
  }

  public getPerimeter(): number {
  const basePerimeter = this.basePoints.reduce((sum, point, i, arr) => {
    const next = arr[(i + 1) % arr.length];
    return sum + point.distanceTo(next);
  }, 0);

  const lateralEdges = this.basePoints.reduce((sum, point) => {
    return sum + point.distanceTo(this.apex);
  }, 0);

  return basePerimeter + lateralEdges;
}

}
