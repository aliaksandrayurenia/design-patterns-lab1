"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PyramidValidator = void 0;
const Point_1 = require("../entities/Point");
const Pyramid_1 = require("../entities/Pyramid");
const Rectangle_1 = require("../entities/Rectangle");
const RectangleService_1 = require("../services/RectangleService");
const InvalidShapeError_1 = require("../errors/InvalidShapeError");
/**
 * Регулярное выражение:
 *  - 15 чисел (может быть отрицательными), разделённых пробелами
 *  - (-?\d+(\.\d+)?\s){14} — 14 чисел + пробел
 *  - -?\d+(\.\d+)?        — пятое число (апекс)
 */
const PYRAMID_REGEX = /^(-?\d+(\.\d+)?\s){14}-?\d+(\.\d+)?$/;
class PyramidValidator {
    /**
     * 1) Проверяем, что строка содержит ровно 15 чисел (положительных или отрицательных).
     * 2) Делаем «глубокую» валидацию:
     *    a) Создаём массив basePoints из четырёх точек (x,y,z)
     *    b) Создаём точку apex (x,y,z)
     *    c) Проверяем, что все basePoints лежат в одной плоскости z = const
     *    d) Проверяем, что эти четыре точки образуют прямоугольник (через RectangleService.isRectangle)
     *    e) Проверяем, что apex.z > baseZ (апекс над базой)
     * 3) Если какая-либо проверка не прошла — возвращаем false.
     */
    static isValid(line) {
        // 1) Очищаем строку аналогично
        const cleaned = line.trim().replace(/\s+/g, ' ');
        // 2) Базовая проверка по Regex
        if (!PYRAMID_REGEX.test(cleaned)) {
            return false;
        }
        // 3) Парсим 15 чисел
        const nums = cleaned.split(' ').map(Number);
        const base = [
            new Point_1.Point(nums[0], nums[1], nums[2]),
            new Point_1.Point(nums[3], nums[4], nums[5]),
            new Point_1.Point(nums[6], nums[7], nums[8]),
            new Point_1.Point(nums[9], nums[10], nums[11]),
        ];
        const apex = new Point_1.Point(nums[12], nums[13], nums[14]);
        try {
            // 4a) Проверяем, что четыре точки базы лежат в одной плоскости Z = const
            const baseZ = base[0].z;
            for (const p of base) {
                if (p.z !== baseZ) {
                    return false;
                }
            }
            // 4b) Проверяем, что base образует прямоугольник
            const tempRect = new Rectangle_1.Rectangle('tmp', base);
            if (!RectangleService_1.RectangleService.isRectangle(tempRect)) {
                return false;
            }
            // 4c) Проверяем, что апекс выше базы (по Z)
            if (apex.z <= baseZ) {
                return false;
            }
            // 4d) При желании можно ещё валидацию боковых граней добавить:
            //      например, что расстояния от apex до каждой вершины > 0 и т.д.
            //      Но базового требования «апекс над базой» достаточно.
        }
        catch (err) {
            if (err instanceof InvalidShapeError_1.InvalidShapeError) {
                return false;
            }
            // Если упало что-то неожиданное — пробрасываем дальше
            throw err;
        }
        return true;
    }
    /**
     * parse() вызывается только после isValid()===true,
     * поэтому можно спокойно создавать Pyramid без доп. ошибок.
     * @param line — строка из 15 чисел
     */
    static parse(line) {
        const cleaned = line.trim().replace(/\s+/g, ' ');
        const nums = cleaned.split(' ').map(Number);
        const base = [
            new Point_1.Point(nums[0], nums[1], nums[2]),
            new Point_1.Point(nums[3], nums[4], nums[5]),
            new Point_1.Point(nums[6], nums[7], nums[8]),
            new Point_1.Point(nums[9], nums[10], nums[11]),
        ];
        const apex = new Point_1.Point(nums[12], nums[13], nums[14]);
        return new Pyramid_1.Pyramid('pyr-' + Date.now(), base, apex);
    }
}
exports.PyramidValidator = PyramidValidator;
