import { Shape } from '../entities/Shape';
import { Rectangle } from '../entities/Rectangle';
import { Pyramid } from '../entities/Pyramid';
import { Point } from '../entities/Point';

export type Comparator<T> = (a: T, b: T) => number;

/**
 * Сравнение по ID (лексикографически)
 */
export const compareById: Comparator<Shape> = (a, b) =>
  a.id.localeCompare(b.id);

/**
 * Сравнение по площади (убывание или возрастание)
 */
export const compareByAreaAsc: Comparator<Shape> = (a, b) =>
  a.getArea() - b.getArea();

export const compareByAreaDesc: Comparator<Shape> = (a, b) =>
  b.getArea() - a.getArea();

/**
 * Сравнение по периметру
 */
export const compareByPerimeterAsc: Comparator<Shape> = (a, b) =>
  a.getPerimeter() - b.getPerimeter();

export const compareByPerimeterDesc: Comparator<Shape> = (a, b) =>
  b.getPerimeter() - a.getPerimeter();

/**
 * Сравнение по объёму: для тех фигур, у которых есть метод getVolume.
 * Предполагаем, что для остальных (круг, прямоугольник) getVolume либо бросает ошибку,
 * либо возвращает 0. Можно дополнительно проверять instanceof Pyramid.
 */
export const compareByVolumeAsc: Comparator<Shape> = (a, b) => {
  const volA = 'getVolume' in a ? (a as any).getVolume() : 0;
  const volB = 'getVolume' in b ? (b as any).getVolume() : 0;
  return volA - volB;
};

export const compareByVolumeDesc: Comparator<Shape> = (a, b) => {
  const volA = 'getVolume' in a ? (a as any).getVolume() : 0;
  const volB = 'getVolume' in b ? (b as any).getVolume() : 0;
  return volB - volA;
};

/**
 * Сравнение по координате X первой точки:
 * Берём для каждого shape «первую точку» (как в спецификациях)
 */
function getFirstPoint(shape: Shape): Point | undefined {
  if ('points' in shape) {
    // @ts-ignore
    return (shape as Rectangle).points[0];
  } else if ('basePoints' in shape) {
    // @ts-ignore
    return (shape as Pyramid).basePoints[0];
  }
  return undefined;
}

export const compareByFirstPointXAsc: Comparator<Shape> = (a, b) => {
  const pa = getFirstPoint(a);
  const pb = getFirstPoint(b);
  if (!pa || !pb) return 0;
  return pa.x - pb.x;
};

export const compareByFirstPointYAsc: Comparator<Shape> = (a, b) => {
  const pa = getFirstPoint(a);
  const pb = getFirstPoint(b);
  if (!pa || !pb) return 0;
  return pa.y - pb.y;
};