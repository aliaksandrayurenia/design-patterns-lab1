"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidShapeError = void 0;
class InvalidShapeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidShapeError';
    }
}
exports.InvalidShapeError = InvalidShapeError;
