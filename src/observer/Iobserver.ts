export interface IObserver<T> {
  update(event: T): void;
}