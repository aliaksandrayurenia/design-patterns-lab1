import { ShapeFactory } from './ShapeFactory';
import { PyramidValidator } from '../validators/PyramidValidator';
import { Pyramid } from '../entities/Pyramid';

export class PyramidFactory extends ShapeFactory {
  createShape(data: string): Pyramid | null {
    if (!PyramidValidator.isValid(data)) return null;
    return PyramidValidator.parse(data);
  }
}
