import { Repository } from './repository';
import { Shape } from '../entities/Shape';
import { IObservable} from '../observer/Iobservable';
import { IObserver } from '../observer/Iobserver';

type ShapeEvent = {
  type: 'added' | 'removed';
  shape: Shape;
};

export class ShapeRepository
  implements Repository<Shape>, IObservable<ShapeEvent> {
  private items: Map<string, Shape> = new Map();

  // Для Observable
  private observers: Set<IObserver<ShapeEvent>> = new Set();

  add(item: Shape): void {
    this.items.set(item.id, item);
    // Оповестим подписчиков, что фигура добавлена
    this.notify({ type: 'added', shape: item });
  }

  remove(id: string): boolean {
    const shape = this.items.get(id);
    if (!shape) {
      return false;
    }
    this.items.delete(id);
    // Оповестим подписчиков, что фигура удалена
    this.notify({ type: 'removed', shape });
    return true;
  }

  getById(id: string): Shape | undefined {
    return this.items.get(id);
  }

  getAll(): Shape[] {
    return Array.from(this.items.values());
  }

  query(spec: (item: Shape) => boolean): Shape[] {
    return this.getAll().filter(spec);
  }

  // Реализация IObservable
  subscribe(observer: IObserver<ShapeEvent>): void {
    this.observers.add(observer);
  }

  unsubscribe(observer: IObserver<ShapeEvent>): void {
    this.observers.delete(observer);
  }

  notify(event: ShapeEvent): void {
    for (const obs of this.observers) {
      obs.update(event);
    }
  }
}
