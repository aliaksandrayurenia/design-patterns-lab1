"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeRepository = void 0;
class ShapeRepository {
    constructor() {
        this.items = new Map();
        // Для Observable
        this.observers = new Set();
    }
    add(item) {
        this.items.set(item.id, item);
        // Оповестим подписчиков, что фигура добавлена
        this.notify({ type: 'added', shape: item });
    }
    remove(id) {
        const shape = this.items.get(id);
        if (!shape) {
            return false;
        }
        this.items.delete(id);
        // Оповестим подписчиков, что фигура удалена
        this.notify({ type: 'removed', shape });
        return true;
    }
    getById(id) {
        return this.items.get(id);
    }
    getAll() {
        return Array.from(this.items.values());
    }
    query(spec) {
        return this.getAll().filter(spec);
    }
    // Реализация IObservable
    subscribe(observer) {
        this.observers.add(observer);
    }
    unsubscribe(observer) {
        this.observers.delete(observer);
    }
    notify(event) {
        for (const obs of this.observers) {
            obs.update(event);
        }
    }
}
exports.ShapeRepository = ShapeRepository;
