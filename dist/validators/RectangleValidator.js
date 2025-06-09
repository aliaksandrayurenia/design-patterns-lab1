"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectangleValidator = void 0;
const Point_1 = require("../entities/Point");
const Rectangle_1 = require("../entities/Rectangle");
const RectangleService_1 = require("../services/RectangleService");
const InvalidShapeError_1 = require("../errors/InvalidShapeError");
/**
 * Регулярное выражение:
 *  - «-?\d+(\.\d+)?»  — одно число (целое или с плавающей точкой), может быть отрицательным
 *  - (\s«вписать ещё одно число») повторяется ровно 7 раз, итого 8 чисел, разделённых пробелами
 */
const RECTANGLE_REGEX = /^(-?\d+(\.\d+)?\s){7}-?\d+(\.\d+)?$/;
class RectangleValidator {
    /**
     * 1) Проверяем, что строка состоит ровно из 8 чисел (положительных или отрицательных).
     * 2) Делаем «глубокую» проверку:
     *    a) Преобразуем в массив точек
     *    b) Сразу конструируем new Rectangle('tmp', points) (проверка: length === 4)
     *    c) Вызываем RectangleService.isRectangle, чтобы убедиться, что углы ≈ 90° и противоположные стороны равны
     * 3) Если что-то не так (Regex не подходит, или create бросил ошибку, или isRectangle вернул false) — возвращаем false.
     */
    static isValid(line) {
        // 1) Очищаем лишние пробелы, чтобы «1  2  3» и «1 2 3» эквивалентно обрабатывались
        const cleaned = line.trim().replace(/\s+/g, ' ');
        // 2) Проверяем базовую регулярку
        if (!RECTANGLE_REGEX.test(cleaned)) {
            return false;
        }
        // 3) Парсим числа
        const nums = cleaned.split(' ').map(Number);
        const pts = [
            new Point_1.Point(nums[0], nums[1]),
            new Point_1.Point(nums[2], nums[3]),
            new Point_1.Point(nums[4], nums[5]),
            new Point_1.Point(nums[6], nums[7]),
        ];
        // 4) Конструируем временный Rectangle и проверяем его геометрию
        try {
            // 4a) Сначала проверяем базовую валидацию конструктора (длина массива === 4)
            const tempRect = new Rectangle_1.Rectangle('tmp', pts);
            // 4b) Проверяем, действительно ли это прямоугольник (углы ≈ 90°, противоп. стороны)
            if (!RectangleService_1.RectangleService.isRectangle(tempRect)) {
                return false;
            }
        }
        catch (err) {
            // Если что-то упало при создании Rectangle или внутри isRectangle – значит невалидно.
            if (err instanceof InvalidShapeError_1.InvalidShapeError) {
                return false;
            }
            // Если неожиданная ошибка, пробрасываем дальше
            throw err;
        }
        return true;
    }
    /**
     * parse() вызывается только после isValid()===true, поэтому мы можем спокойно создавать новый объект.
     * @param line — строка с 8 числами через пробел
     */
    static parse(line) {
        const cleaned = line.trim().replace(/\s+/g, ' ');
        const nums = cleaned.split(' ').map(Number);
        const points = [
            new Point_1.Point(nums[0], nums[1]),
            new Point_1.Point(nums[2], nums[3]),
            new Point_1.Point(nums[4], nums[5]),
            new Point_1.Point(nums[6], nums[7]),
        ];
        // id генерируем по времени, чтобы был уникальный
        return new Rectangle_1.Rectangle('rect-' + Date.now(), points);
    }
}
exports.RectangleValidator = RectangleValidator;
