import { Item } from "./item";
import { Array } from "./Array";

const items = [
  new Item("커피", 1000),
  new Item("녹차", 1500),
  new Item("비디오", 2000),
  new Item("오렌지", 1000),
  new Item("콜라", 1500),
  new Item("사이다", 1500),
  new Item("환타", 1500),
  new Item("커피", 1000),
  new Item("녹차", 1500),
];

const array = new Array(items);
const iter = array.iterator();

while (iter.next()) {
  const item = iter.current();
  console.log(item.name, item.cost);
}
