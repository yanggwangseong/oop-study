import { Iterator } from "./iterator";
export interface Aggregator<T> {
  iterator(): Iterator<T>;
}
