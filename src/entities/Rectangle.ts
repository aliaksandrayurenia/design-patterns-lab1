import { Shape } from './Shape';
import { Point } from './Point';
import { InvalidShapeError } from '../errors/InvalidShapeError';
import { RectangleService } from '../services/RectangleService';

/** 
 * Rectangle теперь наследует Shape и реализует getArea/ getPerimeter
 * через делегирование в RectangleService 
 */
export class Rectangle extends Shape {
  constructor(public id: string, public points: Point[]) {
    super(id);
    if (points.length !== 4) {
      throw new InvalidShapeError('Rectangle must have exactly 4 points');
    }
  }

  public getArea(): number {
    return RectangleService.calculateArea(this);
  }

  public getPerimeter(): number {
    return RectangleService.calculatePerimeter(this);
  }
}
