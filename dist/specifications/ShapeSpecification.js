"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specByFirstPointInRegion = specByFirstPointInRegion;
exports.specByAreaRange = specByAreaRange;
exports.specByPerimeterRange = specByPerimeterRange;
exports.specById = specById;
// 1) Поиск по области координат (например, все фигуры, у которых все точки первой вершины внутри прямоугольника [xMin,xMax]×[yMin,yMax])
function specByFirstPointInRegion(xMin, xMax, yMin, yMax) {
    return (item) => {
        // Предполагаем, что у всех Shape есть какое-то поле с вершинами (Rectangle → points[0], Pyramid → basePoints[0], Apex может игнорироваться)
        // Нам понадобится у каждого конкретного Shape узнать первую точку; для этого можно расширить Shape-интерфейс
        const firstPoint = getFirstPoint(item);
        if (!firstPoint)
            return false;
        return (firstPoint.x >= xMin &&
            firstPoint.x <= xMax &&
            firstPoint.y >= yMin &&
            firstPoint.y <= yMax);
    };
}
// 2) Поиск по диапазону площади
function specByAreaRange(areaMin, areaMax) {
    return (item) => {
        const area = item.getArea();
        return area >= areaMin && area <= areaMax;
    };
}
// 3) Поиск по диапазону периметра
function specByPerimeterRange(perimMin, perimMax) {
    return (item) => {
        const perim = item.getPerimeter();
        return perim >= perimMin && perim <= perimMax;
    };
}
// 4) Поиск по названию (id или любому другому string-полю shape)
function specById(idToFind) {
    return (item) => item.id === idToFind;
}
// Вспомогательная функция: для абстрактного Shape «достать» первую точку
function getFirstPoint(shape) {
    // Если shape instanceof Rectangle → точки берём из поля points
    // Если shape instanceof Pyramid → берём basePoints[0]
    // Можно сделать через type-guard или через свойство в базовом классе (например, абстрактный геттер).
    if ('points' in shape) {
        // @ts-ignore — приведение для примера
        return shape.points[0];
    }
    else if ('basePoints' in shape) {
        // @ts-ignore
        return shape.basePoints[0];
    }
    return undefined;
}
