import { Shape } from '../entities/Shape';
import { Point } from '../entities/Point';

// 1) Поиск по области координат (например, все фигуры, у которых все точки первой вершины внутри прямоугольника [xMin,xMax]×[yMin,yMax])
export function specByFirstPointInRegion(
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number
): (item: Shape) => boolean {
  return (item: Shape) => {
    // Предполагаем, что у всех Shape есть какое-то поле с вершинами (Rectangle → points[0], Pyramid → basePoints[0], Apex может игнорироваться)
    // Нам понадобится у каждого конкретного Shape узнать первую точку; для этого можно расширить Shape-интерфейс
    const firstPoint: Point | undefined = getFirstPoint(item);
    if (!firstPoint) return false;
    return (
      firstPoint.x >= xMin &&
      firstPoint.x <= xMax &&
      firstPoint.y >= yMin &&
      firstPoint.y <= yMax
    );
  };
}

// 2) Поиск по диапазону площади
export function specByAreaRange(
  areaMin: number,
  areaMax: number
): (item: Shape) => boolean {
  return (item: Shape) => {
    const area = item.getArea();
    return area >= areaMin && area <= areaMax;
  };
}

// 3) Поиск по диапазону периметра
export function specByPerimeterRange(
  perimMin: number,
  perimMax: number
): (item: Shape) => boolean {
  return (item: Shape) => {
    const perim = item.getPerimeter();
    return perim >= perimMin && perim <= perimMax;
  };
}

// 4) Поиск по названию (id или любому другому string-полю shape)
export function specById(idToFind: string): (item: Shape) => boolean {
  return (item: Shape) => item.id === idToFind;
}

// Вспомогательная функция: для абстрактного Shape «достать» первую точку
function getFirstPoint(shape: Shape): Point | undefined {
  // Если shape instanceof Rectangle → точки берём из поля points
  // Если shape instanceof Pyramid → берём basePoints[0]
  // Можно сделать через type-guard или через свойство в базовом классе (например, абстрактный геттер).
  if ('points' in shape) {
    // @ts-ignore — приведение для примера
    return (shape as any).points[0];
  } else if ('basePoints' in shape) {
    // @ts-ignore
    return (shape as any).basePoints[0];
  }
  return undefined;
}