export interface Iterator<T> {
  next(): boolean;
  current(): T;
}
