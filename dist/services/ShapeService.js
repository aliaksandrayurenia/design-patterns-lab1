"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const RectangleFactory_1 = require("../factories/RectangleFactory");
const PyramidFactory_1 = require("../factories/PyramidFactory");
const logger_1 = require("../setup/logger");
class ShapeService {
    // Метод для передачи в ShapeService готового репозитория
    static setRepository(repo) {
        this.repository = repo;
    }
    static loadShapesFromFile(fileName) {
        if (!this.repository) {
            throw new Error('Repository not set in ShapeService');
        }
        const filePath = path_1.default.resolve('data', fileName);
        let raw;
        try {
            raw = fs_1.default.readFileSync(filePath, 'utf-8');
        }
        catch (readErr) {
            if (readErr instanceof Error) {
                logger_1.logger.error(`Cannot read file "${fileName}": ${readErr.message}`);
            }
            else {
                logger_1.logger.error(`Cannot read file "${fileName}": ${String(readErr)}`);
            }
            return;
        }
        const lines = raw.split('\n').map(l => l.trim()).filter(l => l);
        const rectangleFactory = new RectangleFactory_1.RectangleFactory();
        const pyramidFactory = new PyramidFactory_1.PyramidFactory();
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
                            logger_1.logger.info(`Line ${idx + 1}: Added rectangle, id=${shape.id}`);
                        }
                        else {
                            logger_1.logger.error(`Line ${idx + 1}: Invalid rectangle data: "${origLine}"`);
                        }
                    }
                    catch (err) {
                        logger_1.logger.error(`Line ${idx + 1}: Error creating rectangle: ${err.message}`);
                    }
                    break;
                case 'pyramid':
                    try {
                        const shape = pyramidFactory.createShape(dataPart);
                        if (shape) {
                            this.repository.add(shape);
                            logger_1.logger.info(`Line ${idx + 1}: Added pyramid, id=${shape.id}`);
                        }
                        else {
                            logger_1.logger.error(`Line ${idx + 1}: Invalid pyramid data: "${origLine}"`);
                        }
                    }
                    catch (err) {
                        logger_1.logger.error(`Line ${idx + 1}: Error creating pyramid: ${err.message}`);
                    }
                    break;
                default:
                    logger_1.logger.warn(`Line ${idx + 1}: Unknown shape type "${shapeType}", skipping.`);
            }
        });
    }
}
exports.ShapeService = ShapeService;
