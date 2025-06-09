"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const Shape_1 = require("./Shape");
const InvalidShapeError_1 = require("../errors/InvalidShapeError");
const RectangleService_1 = require("../services/RectangleService");
/**
 * Rectangle теперь наследует Shape и реализует getArea/ getPerimeter
 * через делегирование в RectangleService
 */
class Rectangle extends Shape_1.Shape {
    constructor(id, points) {
        super(id);
        this.id = id;
        this.points = points;
        if (points.length !== 4) {
            throw new InvalidShapeError_1.InvalidShapeError('Rectangle must have exactly 4 points');
        }
    }
    getArea() {
        return RectangleService_1.RectangleService.calculateArea(this);
    }
    getPerimeter() {
        return RectangleService_1.RectangleService.calculatePerimeter(this);
    }
}
exports.Rectangle = Rectangle;
