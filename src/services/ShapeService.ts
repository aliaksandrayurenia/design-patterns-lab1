import { RectangleFactory } from '../factories/RectangleFactory';
import { ConeFactory } from '../factories/ConeFactory';
import fs from 'fs';
import path from 'path';
import { logger } from '../setup/logger';

export class ShapeService {
  static loadShapesFromFile(fileName: string) {
    const filePath = path.resolve('data', fileName);
    const data = fs.readFileSync(filePath, 'utf-8').split('\n');
    
    const rectangleFactory = new RectangleFactory();
    const coneFactory = new ConeFactory();

    data.forEach(line => {
      if (line.includes('rectangle')) {
        const shape = rectangleFactory.createShape(line);
        if (shape) {
          logger.info(`Created rectangle: ${shape.id}`);
        } else {
          logger.error(`Invalid rectangle data: ${line}`);
        }
      }
      if (line.includes('cone')) {
        const shape = coneFactory.createShape(line);
        if (shape) {
          logger.info(`Created cone: ${shape.id}`);
        } else {
          logger.error(`Invalid cone data: ${line}`);
        }
      }
    });
  }
}
