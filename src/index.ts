import { ShapeRepository } from './repository/ShapeRepository';
import { Warehouse } from './warehouse/Warehouse';
import { ShapeService } from './services/ShapeService'; // из первой части
import { logger } from './setup/logger';

// 1) Создаём репозиторий
const repo = new ShapeRepository();

// 2) Берём единственный экземпляр Warehouse и подписываем его на репозиторий
const warehouse = Warehouse.getInstance();
repo.subscribe(warehouse);

// 3) (Опционально) Если репозиторий уже заполнен (например, вы сразу добавляете фигуры вручную),
//    то стоит вызвать warehouse.recalculateAll(repo);

// 4) Загружаем фигуры через ShapeService (которая внутри вызывает фабрики и валидаторы).
//    ShapeService, кстати, можно чуть адаптировать, чтобы при удачном создании он
//    добавлял фигуру не только логировал, но и сразу repo.add(shape).
ShapeService.setRepository(repo); // см. ниже, как это реализовать
ShapeService.loadShapesFromFile('figures.txt');

// 5) После загрузки можно посмотреть, что есть в Warehouse:
console.log('=== All metrics from Warehouse ===');
console.table(warehouse.getAllMetrics());