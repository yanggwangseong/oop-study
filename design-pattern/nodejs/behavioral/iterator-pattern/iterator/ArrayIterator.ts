import { Iterator } from "./iterator";
import { Array } from "./Array";
import { Item } from "./item";

export class ArrayIterator implements Iterator<Item> {
  private array: Array;
  private index: number;

  constructor(array: Array) {
    this.array = array;
    this.index = -1;
  }

  next(): boolean {
    this.index++;
    return this.index < this.array.count;
  }

  current(): Item {
    return this.array.getItem(this.index);
  }
}
