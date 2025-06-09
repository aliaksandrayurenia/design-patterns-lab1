"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PyramidService = void 0;
const Rectangle_1 = require("../entities/Rectangle");
const RectangleService_1 = require("./RectangleService");
const Point_1 = require("../entities/Point");
const InvalidShapeError_1 = require("../errors/InvalidShapeError");
class PyramidService {
    /**
     * Проверяет, что basePoints образуют корректный прямоугольник:
     *   - Notes: Для “правильной” пирамиды обязательно, чтобы 4 точки базы лежали в одной плоскости Z = const
     *   - и чтобы они при том ещё образовывали прямоугольник в плоскости XY
     */
    static validateBase(basePoints) {
        // Шаг 1: проверка, что все точки лежат в одной плоскости (одинаковое z)
        const baseZ = basePoints[0].z;
        for (const p of basePoints) {
            if (p.z !== baseZ) {
                throw new InvalidShapeError_1.InvalidShapeError('All base points must lie in the same Z plane');
            }
        }
        // Шаг 2: создать временный Rectangle-entity и проверить, что он — прямоугольник
        const tempRect = new Rectangle_1.Rectangle('tmp', basePoints);
        if (!RectangleService_1.RectangleService.isRectangle(tempRect)) {
            throw new InvalidShapeError_1.InvalidShapeError('Base points do not form a valid rectangle');
        }
    }
    /**
     * Вычисляет площадь основания (просто делегируем в RectangleService)
     */
    static calculateBaseArea(pyr) {
        const baseRect = new Rectangle_1.Rectangle('tmp', pyr.basePoints);
        return RectangleService_1.RectangleService.calculateArea(baseRect);
    }
    /**
     * Вычисляет площадь боковых граней.
     *   Алгоритм:
     *     - Найдём центр основания (C)
     *     - Вычислим вертикальную высоту H = apex.z - baseZ (здесь baseZ = база[0].z, т.к. валидация гарантирует baseZ одинаковое)
     *     - Найдём половину диагонали прямоугольника (т.е. расстояние от центра C до середины любого ребра).
     *     - Тогда наклонная высота (slantHeight) = sqrt(H^2 + r^2), где r — это “радиус описанной окружности основания” / либо расстояние от C до середины ребра.
     *     - Площадь боковых граней правильной 4-х гранной пирамиды = (perimeter_base / 2) * slantHeight
     */
    static calculateLateralArea(pyr) {
        const basePoints = pyr.basePoints;
        const baseZ = basePoints[0].z;
        // 1) Найдём центр основания
        const center = this.getBaseCenter(basePoints);
        // 2) Высота пирамиды:
        const H = pyr.apex.z - baseZ;
        if (H <= 0) {
            throw new InvalidShapeError_1.InvalidShapeError('Apex must be above the base plane (z coordinate higher)');
        }
        // 3) Построим прямоугольник-entity, чтобы получить его габариты
        const baseRect = new Rectangle_1.Rectangle('tmp', basePoints);
        // 4) Вычислим полу-диагональ прямоугольника (расстояние от центра C до любой вершины / середины ребра):
        //    Если прямоугольник со сторонами a, b, то полу-диагональ r = sqrt((a/2)^2 + (b/2)^2).
        const a = basePoints[0].distanceTo(basePoints[1]); // ширина AB
        const b = basePoints[1].distanceTo(basePoints[2]); // высота BC
        const r = Math.sqrt((a / 2) ** 2 + (b / 2) ** 2);
        // 5) slantHeight
        const slantHeight = Math.sqrt(H ** 2 + r ** 2);
        // 6) периметр основания:
        const perimBase = RectangleService_1.RectangleService.calculatePerimeter(baseRect);
        // 7) Площадь боковых граней
        return (perimBase / 2) * slantHeight;
    }
    /**
     * Суммарная площадь: основание + боковые грани
     */
    static calculateTotalArea(pyr) {
        return this.calculateBaseArea(pyr) + this.calculateLateralArea(pyr);
    }
    /**
     * Объём пирамиды: (1/3) * area_base * H
     */
    static calculateVolume(pyr) {
        const baseArea = this.calculateBaseArea(pyr);
        const baseZ = pyr.basePoints[0].z;
        const H = pyr.apex.z - baseZ;
        if (H <= 0) {
            throw new InvalidShapeError_1.InvalidShapeError('Pyramid height must be positive');
        }
        return (baseArea * H) / 3;
    }
    /**
     * Сумма всех рёбер (4 ребра основания + 4 ребра к апексу)
     */
    static calculatePerimeter(pyr) {
        const basePoints = pyr.basePoints;
        // Периметр основания
        let perimBase = 0;
        for (let i = 0; i < basePoints.length; i++) {
            perimBase += basePoints[i].distanceTo(basePoints[(i + 1) % basePoints.length]);
        }
        // 4 боковых ребра = точки базы → апекс
        const perimLateral = basePoints.reduce((sum, p) => sum + p.distanceTo(pyr.apex), 0);
        return perimBase + perimLateral;
    }
    /**
     * Проверяет, лежит ли база пирамиды в плоскости XY (z === 0)
     */
    static isBaseOnXYPlane(pyr) {
        return pyr.basePoints.every((p) => p.z === 0);
    }
    /**
     * Приватный метод для нахождения центра основания (среднее X, среднее Y, среднее Z)
     */
    static getBaseCenter(points) {
        const sumX = points.reduce((s, p) => s + p.x, 0);
        const sumY = points.reduce((s, p) => s + p.y, 0);
        const sumZ = points.reduce((s, p) => s + p.z, 0);
        const n = points.length;
        return new Point_1.Point(sumX / n, sumY / n, sumZ / n);
    }
}
exports.PyramidService = PyramidService;
