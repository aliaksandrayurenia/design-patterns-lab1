"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShapeRepository_1 = require("./repository/ShapeRepository");
const Warehouse_1 = require("./warehouse/Warehouse");
const ShapeService_1 = require("./services/ShapeService"); // из первой части
// 1) Создаём репозиторий
const repo = new ShapeRepository_1.ShapeRepository();
// 2) Берём единственный экземпляр Warehouse и подписываем его на репозиторий
const warehouse = Warehouse_1.Warehouse.getInstance();
repo.subscribe(warehouse);
// 3) (Опционально) Если репозиторий уже заполнен (например, вы сразу добавляете фигуры вручную),
//    то стоит вызвать warehouse.recalculateAll(repo);
// 4) Загружаем фигуры через ShapeService (которая внутри вызывает фабрики и валидаторы).
//    ShapeService, кстати, можно чуть адаптировать, чтобы при удачном создании он
//    добавлял фигуру не только логировал, но и сразу repo.add(shape).
ShapeService_1.ShapeService.setRepository(repo); // см. ниже, как это реализовать
ShapeService_1.ShapeService.loadShapesFromFile('figures.txt');
// 5) После загрузки можно посмотреть, что есть в Warehouse:
console.log('=== All metrics from Warehouse ===');
console.table(warehouse.getAllMetrics());
