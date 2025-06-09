"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PyramidFactory = void 0;
const ShapeFactory_1 = require("./ShapeFactory");
const PyramidValidator_1 = require("../validators/PyramidValidator");
class PyramidFactory extends ShapeFactory_1.ShapeFactory {
    createShape(data) {
        if (!PyramidValidator_1.PyramidValidator.isValid(data))
            return null;
        return PyramidValidator_1.PyramidValidator.parse(data);
    }
}
exports.PyramidFactory = PyramidFactory;
