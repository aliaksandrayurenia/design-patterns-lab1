"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pyramid = void 0;
const Shape_1 = require("./Shape");
const InvalidShapeError_1 = require("../errors/InvalidShapeError");
const PyramidService_1 = require("../services/PyramidService");
/**
 * Pyramid наследует Shape и реализует getArea/ getPerimeter
 * через делегирование в PyramidService
 */
class Pyramid extends Shape_1.Shape {
    constructor(id, basePoints, apex) {
        super(id);
        this.id = id;
        this.basePoints = basePoints;
        this.apex = apex;
        if (basePoints.length !== 4) {
            throw new InvalidShapeError_1.InvalidShapeError('Pyramid base must have exactly 4 points');
        }
    }
    getArea() {
        return PyramidService_1.PyramidService.calculateTotalArea(this);
    }
    getPerimeter() {
        return PyramidService_1.PyramidService.calculatePerimeter(this);
    }
}
exports.Pyramid = Pyramid;
