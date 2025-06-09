import fs from 'fs';
import path from 'path';
import { RectangleFactory } from '../factories/RectangleFactory';
import { PyramidFactory } from '../factories/PyramidFactory';
import { logger } from '../setup/logger';
import { ShapeRepository } from '../repository/ShapeRepository';

export class ShapeService {
  private static repository: ShapeRepository;

  // Метод для передачи в ShapeService готового репозитория
  public static setRepository(repo: ShapeRepository) {
    this.repository = repo;
  }

  static loadShapesFromFile(fileName: string) {
    if (!this.repository) {
      throw new Error('Repository not set in ShapeService');
    }

    const filePath = path.resolve('data', fileName);

    let raw: string;
    try {
      raw = fs.readFileSync(filePath, 'utf-8');
    } catch (readErr) {
      if (readErr instanceof Error) {
        logger.error(`Cannot read file "${fileName}": ${readErr.message}`);
      } else {
        logger.error(`Cannot read file "${fileName}": ${String(readErr)}`);
      }
      return;
    }

    const lines = raw.split('\n').map(l => l.trim()).filter(l => l);

    const rectangleFactory = new RectangleFactory();
    const pyramidFactory = new PyramidFactory();

    lines.forEach((origLine, idx) => {
      const tokens = origLine.split(/\s+/);
      const shapeType = tokens[0].toLowerCase();
      const dataPart = tokens.slice(1).join(' ');

      switch (shapeType) {
        case 'rectangle':
          try {
            const shape = rectangleFactory.createShape(dataPart);
            if (shape) {
              // Добавляем в репозиторий (Warehouse получит событие и пересчитает метрики)
              this.repository.add(shape);
              logger.info(`Line ${idx + 1}: Added rectangle, id=${shape.id}`);
            } else {
              logger.error(`Line ${idx + 1}: Invalid rectangle data: "${origLine}"`);
            }
          } catch (err: any) {
            logger.error(`Line ${idx + 1}: Error creating rectangle: ${err.message}`);
          }
          break;

        case 'pyramid':
          try {
            const shape = pyramidFactory.createShape(dataPart);
            if (shape) {
              this.repository.add(shape);
              logger.info(`Line ${idx + 1}: Added pyramid, id=${shape.id}`);
            } else {
              logger.error(`Line ${idx + 1}: Invalid pyramid data: "${origLine}"`);
            }
          } catch (err: any) {
            logger.error(`Line ${idx + 1}: Error creating pyramid: ${err.message}`);
          }
          break;

        default:
          logger.warn(`Line ${idx + 1}: Unknown shape type "${shapeType}", skipping.`);
      }
    });
  }
}