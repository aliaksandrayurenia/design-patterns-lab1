import { Shape } from '../entities/Shape';

export abstract class ShapeFactory {
    abstract createShape(data: string): Shape | null;
  }
  