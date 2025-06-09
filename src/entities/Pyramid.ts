import { Shape } from './Shape';
import { Point } from './Point';
import { InvalidShapeError } from '../errors/InvalidShapeError';
import { PyramidService } from '../services/PyramidService';

/**
 * Pyramid наследует Shape и реализует getArea/ getPerimeter
 * через делегирование в PyramidService
 */
export class Pyramid extends Shape {
  constructor(
    public id: string,
    public basePoints: Point[],
    public apex: Point
  ) {
    super(id);

    if (basePoints.length !== 4) {
      throw new InvalidShapeError('Pyramid base must have exactly 4 points');
    }
  }

  public getArea(): number {
    return PyramidService.calculateTotalArea(this);
  }

  public getPerimeter(): number {
    return PyramidService.calculatePerimeter(this);
  }
}

