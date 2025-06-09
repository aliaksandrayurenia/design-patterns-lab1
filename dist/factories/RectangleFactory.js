"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectangleFactory = void 0;
const ShapeFactory_1 = require("./ShapeFactory");
const RectangleValidator_1 = require("../validators/RectangleValidator");
class RectangleFactory extends ShapeFactory_1.ShapeFactory {
    createShape(data) {
        if (!RectangleValidator_1.RectangleValidator.isValid(data))
            return null;
        return RectangleValidator_1.RectangleValidator.parse(data);
    }
}
exports.RectangleFactory = RectangleFactory;
