import { Animal } from "./Animal";
import { Dog } from "./Dog";
import { TigerAdapter } from "./TigerAdapter";

const list = Array<Animal>();

list.push(new Dog("댕이"));
list.push(new Dog("솜털이"));
list.push(new Dog("츄츄"));

list.push(new TigerAdapter("타이거"));

list.forEach((animal) => {
  animal.sound();
});
