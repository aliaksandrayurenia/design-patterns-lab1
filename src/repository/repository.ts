export interface Repository<T> {
  add(item: T): void;
  remove(id: string): boolean;
  getById(id: string): T | undefined;
  getAll(): T[];
  // Метод поиска по спецификации (Specification Pattern)
  query(spec: (item: T) => boolean): T[];
}