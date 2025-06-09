import { IObserver } from "./Iobserver";
export interface IObservable<T> {
  subscribe(observer: IObserver<T>): void;
  unsubscribe(observer: IObserver<T>): void;
  notify(event: T): void;
}