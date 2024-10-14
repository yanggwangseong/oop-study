import { Aggregator } from "./Aggregator";
import { ArrayIterator } from "./ArrayIterator";
import { Item } from "./item";
import { Iterator } from "./iterator";
export class Array implements Aggregator<Item> {
  private _items: Item[];

  constructor(items: Item[]) {
    this._items = items;
  }

  public getItem(index: number) {
    const result = this._items[index];

    if (!result) {
      throw new Error("Item not found");
    }

    return result;
  }

  public get count(): number {
    return this._items.length;
  }

  iterator(): Iterator<Item> {
    return new ArrayIterator(this);
  }
}
