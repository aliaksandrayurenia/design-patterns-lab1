import { ShapeFactory } from './ShapeFactory';
import { Cone } from '../models/Cone';
import { ConeValidator } from '../validators/ConeValidator';

export class ConeFactory extends ShapeFactory {
  createShape(data: string): Cone | null {
    if (!ConeValidator.isValid(data)) return null;
    return ConeValidator.parse(data);
  }
}
