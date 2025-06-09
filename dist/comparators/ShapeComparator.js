"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareByFirstPointYAsc = exports.compareByFirstPointXAsc = exports.compareByVolumeDesc = exports.compareByVolumeAsc = exports.compareByPerimeterDesc = exports.compareByPerimeterAsc = exports.compareByAreaDesc = exports.compareByAreaAsc = exports.compareById = void 0;
/**
 * Сравнение по ID (лексикографически)
 */
const compareById = (a, b) => a.id.localeCompare(b.id);
exports.compareById = compareById;
/**
 * Сравнение по площади (убывание или возрастание)
 */
const compareByAreaAsc = (a, b) => a.getArea() - b.getArea();
exports.compareByAreaAsc = compareByAreaAsc;
const compareByAreaDesc = (a, b) => b.getArea() - a.getArea();
exports.compareByAreaDesc = compareByAreaDesc;
/**
 * Сравнение по периметру
 */
const compareByPerimeterAsc = (a, b) => a.getPerimeter() - b.getPerimeter();
exports.compareByPerimeterAsc = compareByPerimeterAsc;
const compareByPerimeterDesc = (a, b) => b.getPerimeter() - a.getPerimeter();
exports.compareByPerimeterDesc = compareByPerimeterDesc;
/**
 * Сравнение по объёму: для тех фигур, у которых есть метод getVolume.
 * Предполагаем, что для остальных (круг, прямоугольник) getVolume либо бросает ошибку,
 * либо возвращает 0. Можно дополнительно проверять instanceof Pyramid.
 */
const compareByVolumeAsc = (a, b) => {
    const volA = 'getVolume' in a ? a.getVolume() : 0;
    const volB = 'getVolume' in b ? b.getVolume() : 0;
    return volA - volB;
};
exports.compareByVolumeAsc = compareByVolumeAsc;
const compareByVolumeDesc = (a, b) => {
    const volA = 'getVolume' in a ? a.getVolume() : 0;
    const volB = 'getVolume' in b ? b.getVolume() : 0;
    return volB - volA;
};
exports.compareByVolumeDesc = compareByVolumeDesc;
/**
 * Сравнение по координате X первой точки:
 * Берём для каждого shape «первую точку» (как в спецификациях)
 */
function getFirstPoint(shape) {
    if ('points' in shape) {
        // @ts-ignore
        return shape.points[0];
    }
    else if ('basePoints' in shape) {
        // @ts-ignore
        return shape.basePoints[0];
    }
    return undefined;
}
const compareByFirstPointXAsc = (a, b) => {
    const pa = getFirstPoint(a);
    const pb = getFirstPoint(b);
    if (!pa || !pb)
        return 0;
    return pa.x - pb.x;
};
exports.compareByFirstPointXAsc = compareByFirstPointXAsc;
const compareByFirstPointYAsc = (a, b) => {
    const pa = getFirstPoint(a);
    const pb = getFirstPoint(b);
    if (!pa || !pb)
        return 0;
    return pa.y - pb.y;
};
exports.compareByFirstPointYAsc = compareByFirstPointYAsc;
