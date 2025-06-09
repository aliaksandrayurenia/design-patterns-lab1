import { IObserver } from '../observer/Iobserver';
import { Shape } from '../entities/Shape';
import { ShapeRepository } from '../repository/ShapeRepository';

type ShapeMetrics = {
  area: number;
  perimeter: number;
  volume: number; // Для фигур без объёма можно ставить 0
};

/**
 * Warehouse — Singleton, который хранит метрики для каждой фигуры.
 * Подписывается на ShapeRepository и при изменении пересчитывает нужные значения.
 */
export class Warehouse implements IObserver<{ type: 'added' | 'removed'; shape: Shape }> {
  private static instance: Warehouse;

  // Внутреннее хранилище: ключ — id фигуры, значение — метрики
  private metricsMap: Map<string, ShapeMetrics> = new Map();

  private constructor() {
    // Приватный конструктор — запрещаем создавать извне
  }

  /**
   * Получить единственный экземпляр Warehouse
   */
  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  /**
   * Когда фигура добавляется/удаляется в репозитории, репозиторий вызывает этот update().
   * В зависимости от event.type, пересчитываем или удаляем метрики.
   */
  update(event: { type: 'added' | 'removed'; shape: Shape }): void {
    if (event.type === 'added') {
      this.recalculateForShape(event.shape);
    } else if (event.type === 'removed') {
      this.metricsMap.delete(event.shape.id);
    }
  }

  /**
   * Пересчитать метрики (area, perimeter, volume) для фигуры и сохранить в Map.
   */
  private recalculateForShape(shape: Shape): void {
    const area = shape.getArea();
    const perimeter = shape.getPerimeter();
    // Если у фигуры есть метод getVolume (например, Pyramid), используем его, иначе 0
    let volume = 0;
    if ('getVolume' in shape && typeof (shape as any).getVolume === 'function') {
      volume = (shape as any).getVolume();
    }
    this.metricsMap.set(shape.id, { area, perimeter, volume });
  }

  /**
   * Получить метрики (area, perimeter, volume) для фигуры по её id
   */
  public getMetrics(id: string): ShapeMetrics | undefined {
    return this.metricsMap.get(id);
  }

  /**
   * Получить все метрики как массив [ {id, area, perimeter, volume}, ... ]
   */
  public getAllMetrics(): Array<{ id: string; area: number; perimeter: number; volume: number }> {
    const result: Array<{ id: string; area: number; perimeter: number; volume: number }> = [];
    for (const [id, metrics] of this.metricsMap.entries()) {
      result.push({ id, area: metrics.area, perimeter: metrics.perimeter, volume: metrics.volume });
    }
    return result;
  }

  /**
   * При необходимости: вызвать этот метод, если нужно пересчитать сразу для всех фигур
   * (например, после инициализации, когда Warehouse только подписался). 
   */
  public recalculateAll(repository: ShapeRepository): void {
    this.metricsMap.clear();
    for (const shape of repository.getAll()) {
      this.recalculateForShape(shape);
    }
  }
}