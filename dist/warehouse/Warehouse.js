"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warehouse = void 0;
/**
 * Warehouse — Singleton, который хранит метрики для каждой фигуры.
 * Подписывается на ShapeRepository и при изменении пересчитывает нужные значения.
 */
class Warehouse {
    constructor() {
        // Внутреннее хранилище: ключ — id фигуры, значение — метрики
        this.metricsMap = new Map();
        // Приватный конструктор — запрещаем создавать извне
    }
    /**
     * Получить единственный экземпляр Warehouse
     */
    static getInstance() {
        if (!Warehouse.instance) {
            Warehouse.instance = new Warehouse();
        }
        return Warehouse.instance;
    }
    /**
     * Когда фигура добавляется/удаляется в репозитории, репозиторий вызывает этот update().
     * В зависимости от event.type, пересчитываем или удаляем метрики.
     */
    update(event) {
        if (event.type === 'added') {
            this.recalculateForShape(event.shape);
        }
        else if (event.type === 'removed') {
            this.metricsMap.delete(event.shape.id);
        }
    }
    /**
     * Пересчитать метрики (area, perimeter, volume) для фигуры и сохранить в Map.
     */
    recalculateForShape(shape) {
        const area = shape.getArea();
        const perimeter = shape.getPerimeter();
        // Если у фигуры есть метод getVolume (например, Pyramid), используем его, иначе 0
        let volume = 0;
        if ('getVolume' in shape && typeof shape.getVolume === 'function') {
            volume = shape.getVolume();
        }
        this.metricsMap.set(shape.id, { area, perimeter, volume });
    }
    /**
     * Получить метрики (area, perimeter, volume) для фигуры по её id
     */
    getMetrics(id) {
        return this.metricsMap.get(id);
    }
    /**
     * Получить все метрики как массив [ {id, area, perimeter, volume}, ... ]
     */
    getAllMetrics() {
        const result = [];
        for (const [id, metrics] of this.metricsMap.entries()) {
            result.push({ id, area: metrics.area, perimeter: metrics.perimeter, volume: metrics.volume });
        }
        return result;
    }
    /**
     * При необходимости: вызвать этот метод, если нужно пересчитать сразу для всех фигур
     * (например, после инициализации, когда Warehouse только подписался).
     */
    recalculateAll(repository) {
        this.metricsMap.clear();
        for (const shape of repository.getAll()) {
            this.recalculateForShape(shape);
        }
    }
}
exports.Warehouse = Warehouse;
