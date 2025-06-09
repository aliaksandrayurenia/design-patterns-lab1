import { Point } from '../entities/Point';
import { Rectangle } from '../entities/Rectangle';

export class RectangleService {
  /**
   * Вычисляет площадь прямоугольника (принимаем, что points идут в порядке обхода: A→B→C→D).
   */
  static calculateArea(rect: Rectangle): number {
    const [a, b, c] = rect.points;
    const width = a.distanceTo(b);
    const height = b.distanceTo(c);
    return width * height;
  }

  /**
   * Вычисляет периметр прямоугольника (сложение длины всех 4-х сторон).
   */
  static calculatePerimeter(rect: Rectangle): number {
    const pts = rect.points;
    let perim = 0;
    for (let i = 0; i < pts.length; i++) {
      const next = pts[(i + 1) % pts.length];
      perim += pts[i].distanceTo(next);
    }
    return perim;
  }

  /**
   * Проверяет, что 4 точки действительно образуют прямоугольник:
   *  - все углы ≈ 90° (с точностью до EPS)
   *  - противоположные стороны равны
   */
  static isRectangle(rect: Rectangle, eps = 1e-3): boolean {
    const [a, b, c, d] = rect.points;
    const ab = a.distanceTo(b);
    const bc = b.distanceTo(c);
    const cd = c.distanceTo(d);
    const da = d.distanceTo(a);

    const angleABC = Point.angleBetween(a, b, c);
    const angleBCD = Point.angleBetween(b, c, d);
    const angleCDA = Point.angleBetween(c, d, a);
    const angleDAB = Point.angleBetween(d, a, b);

    const rightAngleCheck =
      Math.abs(angleABC - 90) < eps &&
      Math.abs(angleBCD - 90) < eps &&
      Math.abs(angleCDA - 90) < eps &&
      Math.abs(angleDAB - 90) < eps;

    const oppositeSidesEqual = Math.abs(ab - cd) < eps && Math.abs(bc - da) < eps;

    return rightAngleCheck && oppositeSidesEqual;
  }

  /**
   * Проверяет, является ли прямоугольник квадратом: 
   *  - сначала убеждаемся, что это прямоугольник,
   *  - затем все четыре стороны равны (с точностью eps).
   */
  static isSquare(rect: Rectangle, eps = 1e-3): boolean {
    if (!this.isRectangle(rect, eps)) {
      return false;
    }
    const sideLens = this.getSideLengths(rect);
    return sideLens.every((l) => Math.abs(l - sideLens[0]) < eps);
  }

  /**
   * Проверяет, является ли ромбом:
   *  - все 4 стороны равны, но не прямоугольник
   */
  static isRhombus(rect: Rectangle, eps = 1e-3): boolean {
    const sideLens = this.getSideLengths(rect);
    const allSidesEqual = sideLens.every((l) => Math.abs(l - sideLens[0]) < eps);
    return allSidesEqual && !this.isSquare(rect, eps);
  }

  /**
   * Проверяет, является ли трапецией (ровно одна пара противоположных сторон параллельна) 
   *  или (две пары параллельных, но не прямоугольник).
   */
  static isTrapezoid(rect: Rectangle): boolean {
    const [a, b, c, d] = rect.points;
    const ab_cd = Point.areParallel(a, b, c, d);
    const bc_da = Point.areParallel(b, c, d, a);
    // Если параллельна хотя бы одна, но не прямоугольник (=> не обе), то это трапеция
    return (ab_cd || bc_da) && !this.isRectangle(rect);
  }

  /**
   * Проверяет, что четырёхугольник выпуклый: 
   *  - все crossProductSign между смежными тройками точек дают одинаковый знак
   */
  static isConvex(rect: Rectangle): boolean {
    const [a, b, c, d] = rect.points;
    const s1 = Point.crossProductSign(a, b, c);
    const s2 = Point.crossProductSign(b, c, d);
    const s3 = Point.crossProductSign(c, d, a);
    const s4 = Point.crossProductSign(d, a, b);
    return s1 === s2 && s2 === s3 && s3 === s4;
  }

  /**
   * Возвращает массив длин сторон [AB, BC, CD, DA]
   */
  static getSideLengths(rect: Rectangle): number[] {
    const [a, b, c, d] = rect.points;
    return [
      a.distanceTo(b),
      b.distanceTo(c),
      c.distanceTo(d),
      d.distanceTo(a),
    ];
  }
}