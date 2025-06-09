"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rectangle_1 = require("../entities/Rectangle");
const Point_1 = require("../entities/Point");
describe('Rectangle', () => {
    it('calculates area correctly', () => {
        // given
        const rect = new Rectangle_1.Rectangle('r1', [
            new Point_1.Point(0, 0),
            new Point_1.Point(0, 2),
            new Point_1.Point(3, 2),
            new Point_1.Point(3, 0)
        ]);
        // when
        const area = rect.getArea();
        // then
        expect(area).toBe(6);
    });
    it('calculates perimeter correctly', () => {
        // given
        const rect = new Rectangle_1.Rectangle('r1', [
            new Point_1.Point(0, 0),
            new Point_1.Point(0, 2),
            new Point_1.Point(3, 2),
            new Point_1.Point(3, 0)
        ]);
        // when
        const perimeter = rect.getPerimeter();
        // then
        expect(perimeter).toBe(10);
    });
});
