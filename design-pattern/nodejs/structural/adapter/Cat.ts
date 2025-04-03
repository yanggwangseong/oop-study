import { Animal } from "./Animal";

export class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  override sound(): void {
    console.log(`${this.name}`);
  }
}
