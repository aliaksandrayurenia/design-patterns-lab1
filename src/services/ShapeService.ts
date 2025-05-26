import { RectangleFactory } from '../factories/RectangleFactory';
import { PyramidFactory } from '../factories/PyramidFactory';
import fs from 'fs';
import path from 'path';
import { logger } from '../setup/logger';

export class ShapeService {
  static loadShapesFromFile(fileName: string) {
    const filePath = path.resolve('data', fileName);
    const data = fs.readFileSync(filePath, 'utf-8').split('\n');
    
    const rectangleFactory = new RectangleFactory();
    const pyramidFactory = new PyramidFactory();

    data.forEach(line => {
      if (line.includes('rectangle')) {
        const dataOnly = line.replace('rectangle', '').trim().replace(/\s+/g, ' ');
        const shape = rectangleFactory.createShape(dataOnly);
        if (shape) {
          logger.info(`Created rectangle: ${shape.id}`);
        } else {
          logger.error(`Invalid rectangle data: ${line}`);
        }
      }
      if (line.includes('pyramid')) {
        const dataOnly = line.replace('pyramid', '').trim().replace(/\s+/g, ' ');
        const shape = pyramidFactory.createShape(dataOnly);
        if (shape) {
          logger.info(`Created pyramid: ${shape.id}`);
        } else {
          logger.error(`Invalid pyramid data: ${line}`);
        }
      }
    });
  }
}
