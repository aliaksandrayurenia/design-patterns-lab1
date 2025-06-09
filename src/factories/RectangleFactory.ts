import { ShapeFactory } from './ShapeFactory';
import { RectangleValidator } from '../validators/RectangleValidator';
import { Rectangle } from '../entities/Rectangle';

export class RectangleFactory extends ShapeFactory {
  createShape(data: string): Rectangle | null {
    if (!RectangleValidator.isValid(data)) return null;
    return RectangleValidator.parse(data);
  }
}
